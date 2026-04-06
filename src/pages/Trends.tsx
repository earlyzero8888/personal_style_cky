import { useState, useMemo } from 'react';
import { useNews } from '../hooks/useNews';
import { useBookmarks } from '../hooks/useBookmarks';
import { generateTalkSuggestion } from '../data/templates';
import type { NewsCategory, NewsCategoryId } from '../types';

const newsCategories: NewsCategory[] = [
  { id: 'general', name: '전체', emoji: '📰' },
  { id: 'entertainment', name: '연예', emoji: '🎬' },
  { id: 'sports', name: '스포츠', emoji: '⚽' },
  { id: 'tech', name: 'IT/테크', emoji: '💻' },
];

export default function Trends() {
  const [activeTab, setActiveTab] = useState<NewsCategoryId | 'all'>('all');
  const { news, loading, error, refresh } = useNews(
    activeTab === 'all' ? undefined : activeTab
  );
  const { save, remove, isSaved } = useBookmarks();

  const [expanded, setExpanded] = useState<string | null>(null);

  const displayNews = useMemo(() => {
    return activeTab === 'all' ? news : news;
  }, [news, activeTab]);

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

      {/* News List */}
      {loading && (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-surface rounded-xl p-4 animate-pulse">
              <div className="h-4 bg-border rounded w-full mb-2" />
              <div className="h-3 bg-border rounded w-1/3" />
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
        <div className="space-y-2">
          {displayNews.map((item, i) => {
            const id = `news-${item.title.slice(0, 20)}`;
            const isExpanded = expanded === id;
            const suggestion = generateTalkSuggestion(item.title, item.category);

            return (
              <div key={i} className="bg-surface rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpanded(isExpanded ? null : id)}
                  className="w-full text-left p-4 bg-transparent border-none cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-medium text-text leading-snug">
                        {item.title}
                      </p>
                      <p className="text-xs text-text-sub mt-1.5">
                        {item.source} · {timeAgo(item.pubDate)}
                      </p>
                    </div>
                    <span className="text-text-sub text-xs shrink-0 mt-1">
                      {isExpanded ? '▲' : '▼'}
                    </span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 space-y-3">
                    <div className="bg-primary-light rounded-lg px-3 py-2.5">
                      <p className="text-xs text-accent font-medium mb-1">
                        이렇게 꺼내보세요
                      </p>
                      <p className="text-sm text-text">{suggestion.starter}</p>
                    </div>
                    <p className="text-xs text-text-sub">
                      → 이어서: {suggestion.followUp}
                    </p>
                    <div className="flex items-center justify-between">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-text-sub no-underline"
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
                        className="text-xs bg-transparent border-none cursor-pointer p-0 text-text-sub"
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

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return '방금 전';
  if (hours < 24) return `${hours}시간 전`;
  return `${Math.floor(hours / 24)}일 전`;
}
