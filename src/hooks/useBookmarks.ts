import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'talkmate-bookmarks';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggle = useCallback((id: string) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  }, []);

  const isBookmarked = useCallback(
    (id: string) => bookmarks.includes(id),
    [bookmarks]
  );

  return { bookmarks, toggle, isBookmarked };
}
