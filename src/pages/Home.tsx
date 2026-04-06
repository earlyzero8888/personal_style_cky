import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import TalkCard from '../components/TalkCard';
import { talks } from '../data/talks';
import { categories } from '../data/categories';
import { situations } from '../data/situations';
import { useBookmarks } from '../hooks/useBookmarks';

export default function Home() {
  const { isBookmarked, toggle } = useBookmarks();
  const [selectedSituation, setSelectedSituation] = useState<string | null>(null);

  // Pick random daily recommendations (seeded by date)
  const todayPicks = useMemo(() => {
    const today = new Date().toDateString();
    let seed = 0;
    for (let i = 0; i < today.length; i++) seed += today.charCodeAt(i);
    const shuffled = [...talks].sort(() => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280 - 0.5;
    });
    return shuffled.slice(0, 5);
  }, []);

  const filteredPicks = selectedSituation
    ? todayPicks.filter((t) => t.situations.includes(selectedSituation))
    : todayPicks;

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="text-center py-3">
        <h2 className="text-xl font-bold text-text mb-1">
          오늘의 스몰토크 추천 💬
        </h2>
        <p className="text-sm text-text-secondary">
          상황에 맞는 대화 주제를 골라보세요
        </p>
      </div>

      {/* Situation Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        <button
          onClick={() => setSelectedSituation(null)}
          className={`shrink-0 text-sm px-3 py-1.5 rounded-full border cursor-pointer transition-colors ${
            !selectedSituation
              ? 'bg-primary text-white border-primary'
              : 'bg-white text-text-secondary border-border hover:border-primary'
          }`}
        >
          전체
        </button>
        {situations.map((s) => (
          <button
            key={s.id}
            onClick={() =>
              setSelectedSituation(s.id === selectedSituation ? null : s.id)
            }
            className={`shrink-0 text-sm px-3 py-1.5 rounded-full border cursor-pointer transition-colors ${
              selectedSituation === s.id
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-text-secondary border-border hover:border-primary'
            }`}
          >
            {s.emoji} {s.name}
          </button>
        ))}
      </div>

      {/* Today Picks */}
      <div className="space-y-3">
        {filteredPicks.length > 0 ? (
          filteredPicks.map((topic) => (
            <TalkCard
              key={topic.id}
              topic={topic}
              isBookmarked={isBookmarked(topic.id)}
              onToggleBookmark={toggle}
            />
          ))
        ) : (
          <div className="text-center py-10 text-text-secondary text-sm">
            해당 상황에 맞는 주제가 없어요.
            <br />
            다른 상황을 선택해보세요!
          </div>
        )}
      </div>

      {/* Quick Category Access */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-text">카테고리 둘러보기</h3>
          <Link
            to="/categories"
            className="text-sm text-primary no-underline font-medium"
          >
            전체보기 →
          </Link>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {categories.slice(0, 10).map((cat) => (
            <Link
              key={cat.id}
              to={`/categories/${cat.id}`}
              className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white border border-border no-underline hover:shadow-sm transition-shadow"
            >
              <span className="text-2xl">{cat.emoji}</span>
              <span className="text-[11px] text-text-secondary text-center leading-tight">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
