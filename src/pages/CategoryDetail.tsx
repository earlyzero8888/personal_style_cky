import { useParams, Link } from 'react-router-dom';
import TalkCard from '../components/TalkCard';
import { categories } from '../data/categories';
import { talks } from '../data/talks';
import { useBookmarks } from '../hooks/useBookmarks';

export default function CategoryDetail() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { isBookmarked, toggle } = useBookmarks();

  const category = categories.find((c) => c.id === categoryId);
  const categoryTalks = talks.filter((t) => t.categoryId === categoryId);

  if (!category) {
    return (
      <div className="text-center py-20">
        <p className="text-text-secondary">카테고리를 찾을 수 없어요.</p>
        <Link to="/categories" className="text-primary text-sm mt-2 inline-block">
          카테고리 목록으로 →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/categories"
          className="text-text-secondary no-underline text-lg"
        >
          ←
        </Link>
        <div>
          <h2 className="text-xl font-bold text-text">
            {category.emoji} {category.name}
          </h2>
          <p className="text-sm text-text-secondary">{category.description}</p>
        </div>
      </div>

      {/* Topic List */}
      <div className="space-y-3">
        {categoryTalks.map((topic) => (
          <TalkCard
            key={topic.id}
            topic={topic}
            isBookmarked={isBookmarked(topic.id)}
            onToggleBookmark={toggle}
          />
        ))}
      </div>

      {categoryTalks.length === 0 && (
        <div className="text-center py-10 text-text-secondary text-sm">
          아직 주제가 없어요. 곧 추가될 예정이에요!
        </div>
      )}
    </div>
  );
}
