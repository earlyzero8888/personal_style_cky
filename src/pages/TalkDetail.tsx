import { useParams, Link } from 'react-router-dom';
import { talks } from '../data/talks';
import { categories } from '../data/categories';
import { situations as allSituations } from '../data/situations';
import { useBookmarks } from '../hooks/useBookmarks';
import TalkCard from '../components/TalkCard';

export default function TalkDetail() {
  const { topicId } = useParams<{ topicId: string }>();
  const { isBookmarked, toggle } = useBookmarks();

  const topic = talks.find((t) => t.id === topicId);

  if (!topic) {
    return (
      <div className="text-center py-20">
        <p className="text-text-secondary">주제를 찾을 수 없어요.</p>
        <Link to="/" className="text-primary text-sm mt-2 inline-block">
          홈으로 →
        </Link>
      </div>
    );
  }

  const category = categories.find((c) => c.id === topic.categoryId);
  const topicSituations = allSituations.filter((s) =>
    topic.situations.includes(s.id)
  );
  const relatedTopics = talks.filter((t) =>
    topic.relatedTopicIds.includes(t.id)
  );

  return (
    <div className="space-y-5 pb-5">
      {/* Back + Bookmark */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => history.back()}
          className="text-text-secondary bg-transparent border-none cursor-pointer text-lg p-0"
        >
          ← 뒤로
        </button>
        <button
          onClick={() => toggle(topic.id)}
          className="bg-transparent border-none cursor-pointer text-2xl p-0"
        >
          {isBookmarked(topic.id) ? '🔖' : '📄'}
        </button>
      </div>

      {/* Title Section */}
      <div>
        {category && (
          <span
            className={`inline-block text-xs px-2.5 py-1 rounded-full font-medium mb-2 ${category.color}`}
          >
            {category.emoji} {category.name}
          </span>
        )}
        <h2 className="text-xl font-bold text-text mb-1">{topic.title}</h2>
        <p className="text-sm text-text-secondary">{topic.subtitle}</p>
      </div>

      {/* Situations */}
      <div className="flex gap-2 flex-wrap">
        {topicSituations.map((s) => (
          <span
            key={s.id}
            className="text-xs bg-surface-dim text-text-secondary px-2.5 py-1 rounded-full"
          >
            {s.emoji} {s.name}
          </span>
        ))}
      </div>

      {/* Starter Phrases */}
      <section className="bg-white rounded-2xl border border-border p-4">
        <h3 className="text-sm font-bold text-text mb-3 flex items-center gap-1.5">
          💡 이렇게 시작해보세요
        </h3>
        <ul className="space-y-2.5">
          {topic.starterPhrases.map((phrase, i) => (
            <li
              key={i}
              className="text-sm text-text bg-indigo-50 rounded-xl px-3.5 py-2.5 leading-relaxed"
            >
              "{phrase}"
            </li>
          ))}
        </ul>
      </section>

      {/* Conversation Flows */}
      <section className="bg-white rounded-2xl border border-border p-4">
        <h3 className="text-sm font-bold text-text mb-3 flex items-center gap-1.5">
          🗣️ 대화 흐름 가이드
        </h3>
        <div className="space-y-4">
          {topic.conversationFlows.map((flow, i) => (
            <div key={i} className="space-y-2">
              {i > 0 && <hr className="border-border" />}
              {/* My message */}
              <div className="flex justify-end">
                <div className="bg-primary text-white text-sm rounded-2xl rounded-br-sm px-3.5 py-2.5 max-w-[85%] leading-relaxed">
                  {flow.starter}
                </div>
              </div>
              {/* Their response */}
              <div className="flex justify-start">
                <div className="bg-surface-dim text-text text-sm rounded-2xl rounded-bl-sm px-3.5 py-2.5 max-w-[85%] leading-relaxed">
                  {flow.possibleResponse}
                </div>
              </div>
              {/* Follow up */}
              <div className="flex justify-end">
                <div className="bg-primary text-white text-sm rounded-2xl rounded-br-sm px-3.5 py-2.5 max-w-[85%] leading-relaxed">
                  {flow.followUp}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section className="bg-white rounded-2xl border border-border p-4">
        <h3 className="text-sm font-bold text-text mb-3 flex items-center gap-1.5">
          ✅ 대화 팁
        </h3>
        <ul className="space-y-2">
          {topic.tips.map((tip, i) => (
            <li
              key={i}
              className="text-sm text-text flex items-start gap-2 leading-relaxed"
            >
              <span className="text-accent-green shrink-0 mt-0.5">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </section>

      {/* Avoid */}
      {topic.avoidPhrases.length > 0 && (
        <section className="bg-white rounded-2xl border border-border p-4">
          <h3 className="text-sm font-bold text-text mb-3 flex items-center gap-1.5">
            🚫 이런 건 피해주세요
          </h3>
          <ul className="space-y-2">
            {topic.avoidPhrases.map((phrase, i) => (
              <li
                key={i}
                className="text-sm text-text flex items-start gap-2 leading-relaxed"
              >
                <span className="text-accent-red shrink-0 mt-0.5">•</span>
                {phrase}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Related Topics */}
      {relatedTopics.length > 0 && (
        <section>
          <h3 className="text-sm font-bold text-text mb-3 flex items-center gap-1.5">
            🔗 관련 주제
          </h3>
          <div className="space-y-3">
            {relatedTopics.map((rt) => (
              <TalkCard
                key={rt.id}
                topic={rt}
                isBookmarked={isBookmarked(rt.id)}
                onToggleBookmark={toggle}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
