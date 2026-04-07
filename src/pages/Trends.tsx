import { useState } from 'react';
import { useNews } from '../hooks/useNews';
import { useBookmarks } from '../hooks/useBookmarks';
import { generateTalkSuggestion } from '../data/templates';
import type { NewsCategory, NewsCategoryId } from '../types';
import { timeAgo } from '../utils/timeAgo';

const newsCategories: NewsCategory[] = [
  { id: 'general', name: '종합', emoji: '📰' },
  { id: 'entertainment', name: '연예', emoji: '🎬' },
  { id: 'sports', name: '스포츠', emoji: '⚽' },
  { id: 'tech', name: 'IT/테크', emoji: '💻' },
  { id: 'food', name: '맛집/디저트', emoji: '🍰' },
  { id: 'lifestyle', name: '라이프', emoji: '✨' },
  { id: 'health', name: '건강', emoji: '💪' },
];

export default function Trends() {
  const [activeTab, setActiveTab] = useState<NewsCategoryId | 'all'>('all');
  const { news, loading, error, refresh } = useNews(
    activeTab === 'all' ? undefined : activeTab
  );
  const { save, remove, isSaved } = useBookmarks();
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">트렌드 🔥</h1>
        <p className="text-sm text-text-sub mt-1">
          카테고리별 최신 소식을 확인하세요
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('all')}
          className={`shrink-0 text-sm px-4 py-2 rounded-full border-none cursor-pointer transition-colors ${
            activeTab === 'all'
              ? 'bg-accent text-white'
              : 'bg-surface text-text-sub'
          }`}
        >
          전체
        </button>
        {newsCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`shrink-0 text-sm px-4 py-2 rounded-full border-none cursor-pointer transition-colors ${
              activeTab === cat.id
                ? 'bg-accent text-white'
                : 'bg-surface text-text-sub'
            }`}
          >
            {cat.emoji} {cat.name}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-surface rounded-2xl p-5 space-y-3 animate-pulse">
              <div className="h-3 bg-border rounded w-20" />
              <div className="h-4 bg-border rounded w-full" />
              <div className="h-3 bg-border rounded w-1/3" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
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

      {/* Count */}
      {!loading && !error && news.length > 0 && (
        <p className="text-xs text-text-sub">{news.length}개 소식</p>
      )}

      {/* Empty state */}
      {!loading && !error && news.length === 0 && (
        <div className="bg-surface rounded-2xl p-8 text-center space-y-3">
          <p className="text-3xl">📭</p>
          <p className="text-[15px] font-semibold text-text">소식이 없어요</p>
          <p className="text-sm text-text-sub">
            잠시 후 다시 확인해보세요
          </p>
          <button
            onClick={refresh}
            className="text-sm text-accent bg-primary-light px-4 py-2 rounded-full border-none cursor-pointer"
          >
            새로고침
          </button>
        </div>
      )}

      {/* News List */}
      {!loading && !error && news.length > 0 && (
        <div className="space-y-2">
          {news.map((item, i) => {
            const id = `news-${item.title.slice(0, 30)}`;
            const isExpanded = expanded === id;
            const suggestion = generateTalkSuggestion(item.title, item.category);
            const catInfo = newsCategories.find((c) => c.id === item.category);

            return (
              <div key={i} className="bg-surface rounded-2xl overflow-hidden">
                <button
                  onClick={() => setExpanded(isExpanded ? null : id)}
                  className="w-full text-left p-5 bg-transparent border-none cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      {catInfo && activeTab === 'all' && (
                        <span className="text-[11px] text-text-sub mb-1 block">
                          {catInfo.emoji} {catInfo.name}
                        </span>
                      )}
                      <p className="text-[15px] font-semibold text-text leading-snug">
                        {item.title}
                      </p>
                      <p className="text-xs text-text-sub mt-1.5">
                        {item.source} · {timeAgo(item.pubDate)}
                      </p>
                    </div>
                    <span className="text-text-sub text-sm shrink-0 mt-0.5">
                      {isExpanded ? '▲' : '▼'}
                    </span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 space-y-3">
                    <div className="bg-primary-light rounded-xl px-4 py-3">
                      <p className="text-xs text-accent font-medium mb-1">
                        이렇게 꺼내보세요
                      </p>
                      <p className="text-sm text-text">{suggestion.starter}</p>
                    </div>
                    <p className="text-xs text-text-sub">
                      → 이어서: {suggestion.followUp}
                    </p>
                    <p className="text-xs text-text-sub">
                      💡 {suggestion.tip}
                    </p>
                    <div className="flex items-center justify-between">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-text-sub no-underline hover:text-accent px-2 py-1.5 -ml-2 rounded-lg"
                      >
                        원문 보기 →
                      </a>
                      <button
                        onClick={() => {
                          if (isSaved(id)) {
                            remove(id);
                          } else {
                            save({
                              id,
                              type: 'news',
                              title: item.title,
                              starter: suggestion.starter,
                            });
                          }
                        }}
                        className={`text-xs border-none cursor-pointer px-3 py-1.5 rounded-lg transition-colors ${
                          isSaved(id)
                            ? 'bg-primary-light text-accent font-semibold'
                            : 'bg-transparent text-text-sub hover:text-accent'
                        }`}
                      >
                        {isSaved(id) ? '♥ 저장됨' : '♡ 저장'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

