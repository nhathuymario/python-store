import { ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import type { Product } from "../../types/product";

type Props = {
  products: Product[];
  onAddToCart: (product: Product) => void;
};

export default function ProductGrid({ products, onAddToCart }: Props) {
  const navigate = useNavigate();

  return (
    <section className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-600">
            Mới mở bán
          </p>
          <h2 className="mt-2 text-2xl font-black uppercase tracking-tight md:text-4xl">
            Sản phẩm nổi bật
          </h2>
        </div>

        <button
          onClick={() => navigate("/products")}
          className="hidden items-center gap-2 rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold md:flex"
        >
          Xem tất cả <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <article
            key={product.id}
            className="group overflow-hidden rounded-[28px] border border-zinc-200 bg-white"
          >
            <Link to={`/products/${product.slug}`}>
              <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100">
                <img
                  src={
                    product.thumbnail_url ||
                    "https://via.placeholder.com/600x750"
                  }
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
            </Link>

            <div className="p-4">
              <Link to={`/products/${product.slug}`}>
                <h3 className="line-clamp-2 text-sm font-semibold leading-6 text-zinc-900 hover:text-red-600 md:text-base">
                  {product.name}
                </h3>
              </Link>

              <div className="mt-3 flex items-center justify-between gap-3">
                <div>
                  {product.sale_price ? (
                    <div className="flex flex-col">
                      <p className="text-base font-black text-red-600 md:text-lg">
                        {product.sale_price.toLocaleString()}đ
                      </p>
                      <p className="text-sm text-zinc-400 line-through">
                        {product.price.toLocaleString()}đ
                      </p>
                    </div>
                  ) : (
                    <p className="text-base font-black text-red-600 md:text-lg">
                      {product.price.toLocaleString()}đ
                    </p>
                  )}
                </div>

                <button
                  onClick={() => onAddToCart(product)}
                  className="rounded-full border border-zinc-200 px-3 py-2 text-xs font-bold uppercase tracking-wide transition hover:border-black hover:bg-black hover:text-white"
                >
                  Thêm giỏ
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
