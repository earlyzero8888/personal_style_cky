import { Link } from 'react-router-dom';
import TalkCard from '../components/TalkCard';
import { talks } from '../data/talks';
import { useBookmarks } from '../hooks/useBookmarks';

export default function SavedPage() {
  const { bookmarks, isBookmarked, toggle } = useBookmarks();

  const savedTalks = talks.filter((t) => bookmarks.includes(t.id));

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-text">저장한 주제</h2>

      {savedTalks.length > 0 ? (
        <div className="space-y-3">
          {savedTalks.map((topic) => (
            <TalkCard
              key={topic.id}
              topic={topic}
              isBookmarked={isBookmarked(topic.id)}
              onToggleBookmark={toggle}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <span className="text-5xl block mb-4">📌</span>
          <p className="text-text-secondary text-sm mb-1">
            아직 저장한 주제가 없어요.
          </p>
          <p className="text-text-secondary text-sm mb-4">
            마음에 드는 주제를 저장해보세요!
          </p>
          <Link
            to="/"
            className="inline-block text-sm text-white bg-primary px-4 py-2 rounded-full no-underline font-medium"
          >
            주제 둘러보기 →
          </Link>
        </div>
      )}
    </div>
  );
}
