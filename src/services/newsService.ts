import type { NewsItem, NewsCategoryId } from '../types';

// Google News search RSS helper
function gNewsSearch(query: string): string {
  return `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=ko&gl=KR&ceid=KR:ko`;
}

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
    gNewsSearch('SNS 디저트 유행'),
    gNewsSearch('편의점 신상 과자 음료'),
    gNewsSearch('오픈런 맛집 웨이팅'),
    gNewsSearch('요즘 핫한 음식 트렌드'),
    gNewsSearch('카페 신메뉴 디저트'),
    gNewsSearch('디저트 트렌드 인기'),
  ],
  lifestyle: [
    'https://news.google.com/rss/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNR1JtY0RjU0FtdHZHZ0pMVWlnQVAB?hl=ko&gl=KR&ceid=KR:ko',
  ],
  health: [
    'https://news.google.com/rss/topics/CAAqIQgKIhtDQkFTRGdvSUwyMHZNR3QwTlRFU0FtdHZLQUFQAQ?hl=ko&gl=KR&ceid=KR:ko',
  ],
};

// ── Naver Blog search RSS ──
const NAVER_BLOG_FEEDS = [
  'https://rss.blog.naver.com/SearchBlogArticle.nhn?searchText=%EB%94%94%EC%A0%80%ED%8A%B8+%ED%9B%84%EA%B8%B0',
  'https://rss.blog.naver.com/SearchBlogArticle.nhn?searchText=%EC%8B%A0%EC%83%81+%EB%A7%9B%EC%A7%91+%EC%B6%94%EC%B2%9C',
  'https://rss.blog.naver.com/SearchBlogArticle.nhn?searchText=%EC%B9%B4%ED%8E%98+%EC%B6%94%EC%B2%9C+%EC%8B%A0%EB%A9%94%EB%89%B4',
  'https://rss.blog.naver.com/SearchBlogArticle.nhn?searchText=%ED%8E%B8%EC%9D%98%EC%A0%90+%EC%8B%A0%EC%83%81',
  'https://rss.blog.naver.com/SearchBlogArticle.nhn?searchText=SNS+%EB%94%94%EC%A0%80%ED%8A%B8+%ED%95%AB',
];

// ── Google Trends daily trending RSS ──
const GOOGLE_TRENDS_RSS =
  'https://trends.google.co.kr/trending/rss?geo=KR';

// ── YouTube food channel RSS ──
// Popular Korean food/mukbang/review channels
const YOUTUBE_CHANNEL_FEEDS = [
  // 먹방 & 리뷰 채널들 (channel RSS format)
  'https://www.youtube.com/feeds/videos.xml?channel_id=UCZvHtm1Vik4wR7IVxPn4MHg', // 쯔양
  'https://www.youtube.com/feeds/videos.xml?channel_id=UC-i2ywiuvjvpTy2IIJL1o_A', // 하얀트리
  'https://www.youtube.com/feeds/videos.xml?channel_id=UCyn-K7rZLXjGl7VXGweIlcA', // 편스토랑
  'https://www.youtube.com/feeds/videos.xml?channel_id=UCBqkQTx1R0JamES7qpJMLOQ', // 성시경
  'https://www.youtube.com/feeds/videos.xml?channel_id=UCawpMsdhT6E4f_2R8QpMwLA', // 딩가딩가스튜디오
];

const PROXY_URL = 'https://api.rss2json.com/v1/api.json?rss_url=';

interface Rss2JsonItem {
  title: string;
  link: string;
  pubDate: string;
  author: string;
  description?: string;
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

async function fetchFeed(
  rssUrl: string,
  category: NewsCategoryId,
  count: number,
  sourceLabel?: string
): Promise<NewsItem[]> {
  try {
    const url = `${PROXY_URL}${encodeURIComponent(rssUrl)}`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const data: Rss2JsonResponse = await res.json();
    if (data.status !== 'ok') return [];

    return data.items.slice(0, count).map((item) => ({
      title: cleanTitle(item.title),
      link: item.link,
      pubDate: item.pubDate,
      source: sourceLabel || extractSource(item.title) || item.author || '',
      category,
    }));
  } catch {
    return [];
  }
}

// ── Naver Blog fetch ──
export async function fetchNaverBlogs(count: number = 10): Promise<NewsItem[]> {
  const results = await Promise.allSettled(
    NAVER_BLOG_FEEDS.map((url) => fetchFeed(url, 'food', 5, '네이버 블로그'))
  );

  const all: NewsItem[] = [];
  for (const r of results) {
    if (r.status === 'fulfilled') all.push(...r.value);
  }
  return deduplicateNews(all).slice(0, count);
}

// ── Google Trends fetch ──
export async function fetchTrending(): Promise<NewsItem[]> {
  try {
    const url = `${PROXY_URL}${encodeURIComponent(GOOGLE_TRENDS_RSS)}`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const data: Rss2JsonResponse = await res.json();
    if (data.status !== 'ok') return [];

    return data.items.slice(0, 20).map((item) => ({
      title: cleanTitle(item.title),
      link: item.link,
      pubDate: item.pubDate,
      source: '🔥 급상승 검색어',
      category: 'general' as NewsCategoryId,
    }));
  } catch {
    return [];
  }
}

// ── YouTube food channels fetch ──
export async function fetchYouTubeFood(count: number = 10): Promise<NewsItem[]> {
  const results = await Promise.allSettled(
    YOUTUBE_CHANNEL_FEEDS.map((url) => fetchFeed(url, 'food', 3, 'YouTube'))
  );

  const all: NewsItem[] = [];
  for (const r of results) {
    if (r.status === 'fulfilled') all.push(...r.value);
  }
  return deduplicateNews(all).slice(0, count);
}

// ── Main API ──
export async function fetchNews(
  category: string = 'general',
  count: number = 20
): Promise<NewsItem[]> {
  const feeds = RSS_FEEDS[category] || RSS_FEEDS.general;
  const results = await Promise.allSettled(
    feeds.map((url) => fetchFeed(url, category as NewsCategoryId, count))
  );

  const all: NewsItem[] = [];
  for (const r of results) {
    if (r.status === 'fulfilled') all.push(...r.value);
  }

  // food 카테고리: 네이버 블로그 + YouTube도 합치기
  if (category === 'food') {
    const [blogs, yt] = await Promise.allSettled([
      fetchNaverBlogs(8),
      fetchYouTubeFood(5),
    ]);
    if (blogs.status === 'fulfilled') all.push(...blogs.value);
    if (yt.status === 'fulfilled') all.push(...yt.value);
  }

  return deduplicateNews(all).slice(0, count);
}

export async function fetchAllNews(): Promise<NewsItem[]> {
  const categories = Object.keys(RSS_FEEDS);
  const perCategory = 8;

  // 기본 카테고리 + 네이버 블로그 + Google Trends + YouTube 동시 fetch
  const [categoryResults, blogs, trending, youtube] = await Promise.all([
    Promise.allSettled(
      categories.map((cat) => fetchNews(cat, perCategory))
    ),
    fetchNaverBlogs(8),
    fetchTrending(),
    fetchYouTubeFood(6),
  ]);

  const allNews: NewsItem[] = [];

  for (const result of categoryResults) {
    if (result.status === 'fulfilled') {
      allNews.push(...result.value);
    }
  }

  // 블로그, 트렌딩, 유튜브 합치기
  allNews.push(...blogs);
  allNews.push(...trending);
  allNews.push(...youtube);

  const deduped = deduplicateNews(allNews);

  // Interleave by category for diversity
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
