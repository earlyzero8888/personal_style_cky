import CategoryBadge from '../components/CategoryBadge';
import { categories } from '../data/categories';
import { talks } from '../data/talks';

export default function CategoryList() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-text">카테고리</h2>
      <div className="space-y-2.5">
        {categories.map((cat) => {
          const count = talks.filter((t) => t.categoryId === cat.id).length;
          return <CategoryBadge key={cat.id} category={cat} count={count} />;
        })}
      </div>
    </div>
  );
}
