import type { NewsItem, NewsCategoryId } from '../types';

const RSS_FEEDS: Record<string, string[]> = {
  general: [
    'https://news.google.com/rss?hl=ko&gl=KR&ceid=KR:ko',
  ],
  entertainment: [
    'https://news.google.com/rss/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNREpxYW5RU0FtdHZHZ0pMVWlnQVAB?hl=ko&gl=KR&ceid=KR:ko',
  ],
  sports: [
    'https://news.google.com/rss/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRFp1ZEdvU0FtdHZHZ0pMVWlnQVAB?hl=ko&gl=KR&ceid=KR:ko',
  ],
  tech: [
    'https://news.google.com/rss/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtdHZHZ0pMVWlnQVAB?hl=ko&gl=KR&ceid=KR:ko',
  ],
  food: [
    'https://news.google.com/rss/search?q=%EB%A7%9B%EC%A7%91+%EB%94%94%EC%A0%80%ED%8A%B8+%EC%B9%B4%ED%8E%98+%EB%A8%B9%EB%B0%A9&hl=ko&gl=KR&ceid=KR:ko',
    'https://news.google.com/rss/search?q=%EC%9D%8C%EC%8B%9D+%ED%8A%B8%EB%A0%8C%EB%93%9C+%EC%8B%A0%EB%A9%94%EB%89%B4&hl=ko&gl=KR&ceid=KR:ko',
  ],
  lifestyle: [
    'https://news.google.com/rss/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNR1JtY0RjU0FtdHZHZ0pMVWlnQVAB?hl=ko&gl=KR&ceid=KR:ko',
  ],
  health: [
    'https://news.google.com/rss/topics/CAAqIQgKIhtDQkFTRGdvSUwyMHZNR3QwTlRFU0FtdHZLQUFQAQ?hl=ko&gl=KR&ceid=KR:ko',
  ],
};

const PROXY_URL = 'https://api.rss2json.com/v1/api.json?rss_url=';

interface Rss2JsonItem {
  title: string;
  link: string;
  pubDate: string;
  author: string;
}

interface Rss2JsonResponse {
  status: string;
  items: Rss2JsonItem[];
}

function cleanTitle(title: string): string {
  const dashIndex = title.lastIndexOf(' - ');
  return dashIndex > 0 ? title.substring(0, dashIndex).trim() : title.trim();
}

function extractSource(title: string): string {
  const dashIndex = title.lastIndexOf(' - ');
  return dashIndex > 0 ? title.substring(dashIndex + 3).trim() : '';
}

// Similarity check: if two titles share 60%+ of their words, they're similar
function isSimilar(a: string, b: string): boolean {
  const wordsA = new Set(a.replace(/[^가-힣a-zA-Z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 1));
  const wordsB = new Set(b.replace(/[^가-힣a-zA-Z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 1));
  if (wordsA.size === 0 || wordsB.size === 0) return false;
  let overlap = 0;
  for (const w of wordsA) {
    if (wordsB.has(w)) overlap++;
  }
  const smaller = Math.min(wordsA.size, wordsB.size);
  return smaller > 0 && overlap / smaller >= 0.6;
}

function deduplicateNews(items: NewsItem[]): NewsItem[] {
  const result: NewsItem[] = [];
  for (const item of items) {
    const isDup = result.some((existing) => isSimilar(existing.title, item.title));
    if (!isDup) result.push(item);
  }
  return result;
}

async function fetchFeed(rssUrl: string, category: string, count: number): Promise<NewsItem[]> {
  const url = `${PROXY_URL}${encodeURIComponent(rssUrl)}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data: Rss2JsonResponse = await res.json();
  if (data.status !== 'ok') return [];

  return data.items.slice(0, count).map((item) => ({
    title: cleanTitle(item.title),
    link: item.link,
    pubDate: item.pubDate,
    source: extractSource(item.title) || item.author || '',
    category: category as NewsCategoryId,
  }));
}

export async function fetchNews(
  category: string = 'general',
  count: number = 20
): Promise<NewsItem[]> {
  const feeds = RSS_FEEDS[category] || RSS_FEEDS.general;
  const results = await Promise.allSettled(
    feeds.map((url) => fetchFeed(url, category, count))
  );

  const all: NewsItem[] = [];
  for (const r of results) {
    if (r.status === 'fulfilled') all.push(...r.value);
  }

  return deduplicateNews(all).slice(0, count);
}

export async function fetchAllNews(): Promise<NewsItem[]> {
  const categories = Object.keys(RSS_FEEDS);
  const perCategory = 8;

  const results = await Promise.allSettled(
    categories.map((cat) => fetchNews(cat, perCategory))
  );

  const allNews: NewsItem[] = [];
  for (const result of results) {
    if (result.status === 'fulfilled') {
      allNews.push(...result.value);
    }
  }

  // Deduplicate across all categories
  const deduped = deduplicateNews(allNews);

  // Interleave: pick round-robin from each category for diversity
  const byCategory = new Map<string, NewsItem[]>();
  for (const item of deduped) {
    const arr = byCategory.get(item.category) || [];
    arr.push(item);
    byCategory.set(item.category, arr);
  }

  const interleaved: NewsItem[] = [];
  const catArrays = Array.from(byCategory.values());
  const maxLen = Math.max(...catArrays.map((a) => a.length));

  for (let i = 0; i < maxLen; i++) {
    for (const arr of catArrays) {
      if (i < arr.length) interleaved.push(arr[i]);
    }
  }

  return interleaved;
}
