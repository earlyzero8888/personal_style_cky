import { Link } from 'react-router-dom';
import type { Category } from '../types';

interface CategoryBadgeProps {
  category: Category;
  count?: number;
}

export default function CategoryBadge({ category, count }: CategoryBadgeProps) {
  return (
    <Link
      to={`/categories/${category.id}`}
      className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-border no-underline text-inherit hover:shadow-md transition-shadow"
    >
      <span className="text-3xl">{category.emoji}</span>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold text-text">{category.name}</h3>
        <p className="text-xs text-text-secondary truncate">
          {category.description}
        </p>
      </div>
      {count !== undefined && (
        <span className="text-xs bg-surface-dim text-text-secondary px-2 py-1 rounded-full font-medium">
          {count}개
        </span>
      )}
    </Link>
  );
}
