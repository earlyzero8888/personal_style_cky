import { useMemo } from 'react';
import { useNews } from '../hooks/useNews';
import { useBookmarks } from '../hooks/useBookmarks';
import { generateTalkSuggestion } from '../data/templates';
import type { NewsItem } from '../types';

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return '방금 전';
  if (hours < 24) return `${hours}시간 전`;
  return `${Math.floor(hours / 24)}일 전`;
}

function NewsCard({
  item,
  saved,
  onSave,
}: {
  item: NewsItem;
  saved: boolean;
  onSave: () => void;
}) {
  const suggestion = useMemo(
    () => generateTalkSuggestion(item.title, item.category),
    [item.title, item.category]
  );

  return (
    <div className="bg-surface rounded-2xl p-5 space-y-4">
      {/* Source & Time */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-text-sub">{item.source}</span>
        <span className="text-xs text-text-sub">{timeAgo(item.pubDate)}</span>
      </div>

      {/* Headline */}
      <h3 className="text-[15px] font-semibold leading-snug text-text">
        {item.title}
      </h3>

      {/* Talk Starter */}
      <div className="bg-primary-light rounded-xl px-4 py-3">
        <p className="text-xs text-accent font-medium mb-1">이렇게 꺼내보세요</p>
        <p className="text-sm text-text leading-relaxed">{suggestion.starter}</p>
      </div>

      {/* Follow-up */}
      <p className="text-xs text-text-sub leading-relaxed">
        💡 {suggestion.tip}
      </p>

      {/* Actions */}
      <div className="flex items-center justify-between pt-1">
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-text-sub no-underline hover:text-accent"
        >
          기사 원문 →
        </a>
        <button
          onClick={onSave}
          className="text-xs bg-transparent border-none cursor-pointer p-0 text-text-sub hover:text-accent"
        >
          {saved ? '♥ 저장됨' : '♡ 저장'}
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const { news, loading, error, refresh } = useNews();
  const { save, remove, isSaved } = useBookmarks();

  // Pick top 6 for home
  const topNews = news.slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">오늘의 토크 💬</h1>
        <p className="text-sm text-text-sub mt-1">
          지금 핫한 뉴스로 대화를 시작해보세요
        </p>
      </div>

      {/* Content */}
      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-surface rounded-2xl p-5 space-y-3 animate-pulse"
            >
              <div className="h-3 bg-border rounded w-20" />
              <div className="h-4 bg-border rounded w-full" />
              <div className="h-4 bg-border rounded w-3/4" />
              <div className="h-12 bg-border rounded-xl" />
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="bg-surface rounded-2xl p-8 text-center space-y-3">
          <p className="text-sm text-text-sub">{error}</p>
          <button
            onClick={refresh}
            className="text-sm text-accent bg-primary-light px-4 py-2 rounded-full border-none cursor-pointer"
          >
            다시 시도
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-3">
          {topNews.map((item, i) => {
            const id = `news-${item.title.slice(0, 20)}`;
            return (
              <NewsCard
                key={i}
                item={item}
                saved={isSaved(id)}
                onSave={() => {
                  if (isSaved(id)) {
                    remove(id);
                  } else {
                    const s = generateTalkSuggestion(item.title, item.category);
                    save({
                      id,
                      type: 'news',
                      title: item.title,
                      starter: s.starter,
                    });
                  }
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
