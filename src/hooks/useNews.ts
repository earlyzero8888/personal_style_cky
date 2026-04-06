import { useState, useEffect, useCallback } from 'react';
import type { NewsItem } from '../types';
import { fetchNews, fetchAllNews } from '../services/newsService';

interface UseNewsResult {
  news: NewsItem[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useNews(category?: string): UseNewsResult {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const items = category
        ? await fetchNews(category, 15)
        : await fetchAllNews();
      setNews(items);
    } catch (e) {
      setError(e instanceof Error ? e.message : '뉴스를 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    load();
  }, [load]);

  return { news, loading, error, refresh: load };
}
