import { useBookmarks } from '../hooks/useBookmarks';

export default function SavedPage() {
  const { items, remove } = useBookmarks();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">저장한 토크 ♥</h1>
        <p className="text-sm text-text-sub mt-1">
          나중에 꺼내 쓸 대화 주제들
        </p>
      </div>

      {items.length > 0 ? (
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-surface rounded-xl p-4 flex items-start justify-between gap-3"
            >
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-medium text-text leading-snug">
                  {item.title}
                </p>
                <p className="text-xs text-text-sub mt-1.5 leading-relaxed">
                  💬 {item.starter}
                </p>
              </div>
              <button
                onClick={() => remove(item.id)}
                className="text-xs text-text-sub bg-transparent border-none cursor-pointer shrink-0 hover:text-red-500"
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 space-y-2">
          <p className="text-4xl">📌</p>
          <p className="text-sm text-text-sub">저장한 주제가 없어요.</p>
          <p className="text-xs text-text-sub">
            뉴스나 트렌드에서 마음에 드는 주제를 저장해보세요.
          </p>
        </div>
      )}
    </div>
  );
}
