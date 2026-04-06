import { useState, useEffect, useCallback } from 'react';
import type { SavedItem } from '../types';

const STORAGE_KEY = 'talkmate-saved';

export function useBookmarks() {
  const [items, setItems] = useState<SavedItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const save = useCallback((item: Omit<SavedItem, 'savedAt'>) => {
    setItems((prev) => {
      if (prev.some((p) => p.id === item.id)) return prev;
      return [{ ...item, savedAt: Date.now() }, ...prev];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const isSaved = useCallback(
    (id: string) => items.some((p) => p.id === id),
    [items]
  );

  return { items, save, remove, isSaved };
}
