import type { NewsItem, NewsCategoryId } from '../types';

const RSS_FEEDS: Record<string, string> = {
  general:
    'https://news.google.com/rss?hl=ko&gl=KR&ceid=KR:ko',
  entertainment:
    'https://news.google.com/rss/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNREpxYW5RU0FtdHZHZ0pMVWlnQVAB?hl=ko&gl=KR&ceid=KR:ko',
  sports:
    'https://news.google.com/rss/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRFp1ZEdvU0FtdHZHZ0pMVWlnQVAB?hl=ko&gl=KR&ceid=KR:ko',
  tech:
    'https://news.google.com/rss/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtdHZHZ0pMVWlnQVAB?hl=ko&gl=KR&ceid=KR:ko',
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
  // Google News titles often have " - Source" at the end
  const dashIndex = title.lastIndexOf(' - ');
  return dashIndex > 0 ? title.substring(0, dashIndex).trim() : title.trim();
}

function extractSource(title: string): string {
  const dashIndex = title.lastIndexOf(' - ');
  return dashIndex > 0 ? title.substring(dashIndex + 3).trim() : '';
}

export async function fetchNews(
  category: string = 'general',
  count: number = 10
): Promise<NewsItem[]> {
  const rssUrl = RSS_FEEDS[category] || RSS_FEEDS.general;
  const url = `${PROXY_URL}${encodeURIComponent(rssUrl)}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('뉴스를 불러올 수 없습니다.');

  const data: Rss2JsonResponse = await res.json();
  if (data.status !== 'ok') throw new Error('RSS 파싱에 실패했습니다.');

  return data.items.slice(0, count).map((item) => ({
    title: cleanTitle(item.title),
    link: item.link,
    pubDate: item.pubDate,
    source: extractSource(item.title) || item.author || '',
    category: category as NewsCategoryId,
  }));
}

export async function fetchAllNews(): Promise<NewsItem[]> {
  const categories = Object.keys(RSS_FEEDS);
  const results = await Promise.allSettled(
    categories.map((cat) => fetchNews(cat, 5))
  );

  const allNews: NewsItem[] = [];
  for (const result of results) {
    if (result.status === 'fulfilled') {
      allNews.push(...result.value);
    }
  }

  // Deduplicate by title
  const seen = new Set<string>();
  return allNews.filter((item) => {
    if (seen.has(item.title)) return false;
    seen.add(item.title);
    return true;
  });
}
