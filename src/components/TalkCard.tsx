import { Link } from 'react-router-dom';
import type { TalkTopic, Difficulty } from '../types';
import { categories } from '../data/categories';
import { situations as allSituations } from '../data/situations';

const difficultyConfig: Record<Difficulty, { label: string; color: string }> = {
  easy: { label: '쉬움', color: 'bg-green-100 text-green-700' },
  medium: { label: '보통', color: 'bg-yellow-100 text-yellow-700' },
  deep: { label: '깊은 대화', color: 'bg-blue-100 text-blue-700' },
};

interface TalkCardProps {
  topic: TalkTopic;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export default function TalkCard({
  topic,
  isBookmarked,
  onToggleBookmark,
}: TalkCardProps) {
  const category = categories.find((c) => c.id === topic.categoryId);
  const diff = difficultyConfig[topic.difficulty];
  const topicSituations = allSituations.filter((s) =>
    topic.situations.includes(s.id)
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow">
      <Link to={`/talk/${topic.id}`} className="block p-4 no-underline text-inherit">
        {/* Top badges */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            {category && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${category.color}`}
              >
                {category.emoji} {category.name}
              </span>
            )}
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${diff.color}`}
            >
              {diff.label}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-text mb-1 leading-snug">
          {topic.title}
        </h3>
        <p className="text-sm text-text-secondary mb-3">{topic.subtitle}</p>

        {/* Situations */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {topicSituations.map((s) => (
            <span
              key={s.id}
              className="text-xs bg-surface-dim text-text-secondary px-2 py-0.5 rounded-full"
            >
              {s.emoji} {s.name}
            </span>
          ))}
        </div>
      </Link>

      {/* Bookmark button */}
      <div className="px-4 pb-3 flex justify-end">
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleBookmark(topic.id);
          }}
          className="text-xl bg-transparent border-none cursor-pointer p-1 hover:scale-110 transition-transform"
          aria-label={isBookmarked ? '저장 취소' : '저장하기'}
        >
          {isBookmarked ? '🔖' : '📄'}
        </button>
      </div>
    </div>
  );
}
