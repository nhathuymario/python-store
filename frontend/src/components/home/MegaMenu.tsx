import { Link } from "react-router-dom";
import type { Category } from "../../types/category";

type Props = {
  categories: Category[];
};

export default function MegaMenu({ categories }: Props) {
  return (
    <div className="hidden border-b border-zinc-100 lg:block">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="grid grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category.id}>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-zinc-900">
                {category.name}
              </h3>

              <ul className="space-y-2 text-sm text-zinc-600">
                <li>
                  <Link
                    className="transition hover:text-red-600"
                    to={`/products?category_id=${category.id}`}
                  >
                    Xem tất cả
                  </Link>
                </li>

                {category.description && (
                  <li className="line-clamp-3 text-xs text-zinc-500">
                    {category.description}
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
