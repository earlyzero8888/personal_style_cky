import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useNews } from '../hooks/useNews';
import { useBookmarks } from '../hooks/useBookmarks';
import { generateTalkSuggestion } from '../data/templates';
import type { NewsItem, NewsCategoryId } from '../types';
import { timeAgo } from '../utils/timeAgo';

const categoryLabels: Record<NewsCategoryId, { emoji: string; name: string }> = {
  general: { emoji: '📰', name: '종합' },
  entertainment: { emoji: '🎬', name: '연예' },
  sports: { emoji: '⚽', name: '스포츠' },
  tech: { emoji: '💻', name: 'IT/테크' },
  food: { emoji: '🍰', name: '맛집/디저트' },
  lifestyle: { emoji: '✨', name: '라이프' },
  health: { emoji: '💪', name: '건강' },
};

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
  const cat = categoryLabels[item.category];

  return (
    <div className="bg-surface rounded-2xl p-5 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-text-sub">
          {cat?.emoji} {cat?.name} · {item.source}
        </span>
        <span className="text-[11px] text-text-sub">{timeAgo(item.pubDate)}</span>
      </div>

      <h3 className="text-[15px] font-semibold leading-snug text-text">
        {item.title}
      </h3>

      <div className="bg-primary-light rounded-xl px-4 py-3">
        <p className="text-xs text-accent font-medium mb-1">이렇게 꺼내보세요</p>
        <p className="text-sm text-text leading-relaxed">{suggestion.starter}</p>
      </div>

      <p className="text-xs text-text-sub leading-relaxed">
        💡 {suggestion.tip}
      </p>

      <div className="flex items-center justify-between pt-1">
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-text-sub no-underline hover:text-accent px-2 py-1.5 -ml-2 rounded-lg"
        >
          기사 원문 →
        </a>
        <button
          onClick={onSave}
          className={`text-xs border-none cursor-pointer px-3 py-1.5 rounded-lg transition-colors ${
            saved
              ? 'bg-primary-light text-accent font-semibold'
              : 'bg-transparent text-text-sub hover:text-accent'
          }`}
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

  // Pick 10 diverse items for home
  const topNews = news.slice(0, 10);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">오늘의 토크 💬</h1>
        <p className="text-sm text-text-sub mt-1">
          지금 핫한 소식으로 대화를 시작해보세요
        </p>
      </div>

      {loading && (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-surface rounded-2xl p-5 space-y-3 animate-pulse">
              <div className="h-3 bg-border rounded w-24" />
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
        <>
          <div className="space-y-3">
            {topNews.map((item, i) => {
              const id = `news-${item.title.slice(0, 30)}`;
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
                      save({ id, type: 'news', title: item.title, starter: s.starter });
                    }
                  }}
                />
              );
            })}
          </div>

          <Link
            to="/trends"
            className="block text-center text-sm text-accent no-underline font-medium py-3"
          >
            더 많은 트렌드 보기 →
          </Link>
        </>
      )}
    </div>
  );
}
