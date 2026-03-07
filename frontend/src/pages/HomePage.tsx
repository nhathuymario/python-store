import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/home/Header";
import MegaMenu from "../components/home/MegaMenu";
import Hero from "../components/home/Hero";
import FeatureBar from "../components/home/FeatureBar";
import ProductGrid from "../components/home/ProductGrid";
import TechnologySection from "../components/home/TechnologySection";
import Footer from "../components/home/Footer";
import { heroCards, technologies } from "../data/homeData";
import { getCategoriesApi } from "../api/categoryApi";
import { getProductsApi } from "../api/productApi";
import { addToCartApi } from "../api/cartApi";
import { getApiErrorDetail } from "../utils/error";
import type { Category } from "../types/category";
import type { Product } from "../types/product";

export default function HomePage() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [categoryData, productData] = await Promise.all([
          getCategoriesApi(),
          getProductsApi({
            page: 1,
            page_size: 8,
          }),
        ]);

        setCategories(categoryData);
        setProducts(productData);
      } catch (error: unknown) {
        setMessage(
          getApiErrorDetail(error) ?? "Không tải được dữ liệu trang chủ"
        );
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  const handleAddToCart = async (product: Product) => {
    try {
      await addToCartApi({
        product_id: product.id,
        variant_id: product.variants?.[0]?.id ?? null,
        quantity: 1,
      });
      setMessage(`Đã thêm "${product.name}" vào giỏ hàng`);
    } catch (error: unknown) {
      const detail = getApiErrorDetail(error);

      if (
        detail?.toLowerCase().includes("not authenticated") ||
        detail?.includes("401")
      ) {
        navigate("/login");
        return;
      }

      setMessage(detail ?? "Thêm giỏ hàng thất bại");
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Header />
      <MegaMenu categories={categories} />

      <main>
        <Hero heroCards={heroCards} />
        <FeatureBar />

        {message && (
          <div className="mx-auto mt-4 max-w-7xl px-4">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm">
              {message}
            </div>
          </div>
        )}

        {loading ? (
          <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-zinc-500">
            Đang tải dữ liệu trang chủ...
          </div>
        ) : (
          <ProductGrid products={products} onAddToCart={handleAddToCart} />
        )}

        <TechnologySection technologies={technologies} />

        <section className="mx-auto max-w-7xl px-4 pb-14">
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[30px] bg-zinc-100 p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
                Lookbook
              </p>
              <h2 className="mt-2 text-3xl font-black uppercase tracking-tight">
                Mặc đẹp theo lối sống
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600">
                Phần này hiện đang là khối giới thiệu giao diện. Nếu muốn quản
                trị được từ admin, bạn cần thêm API backend cho
                banner/lookbook/home sections.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  "The Minimalist",
                  "The CEO",
                  "The Weekend",
                  "The Beginner",
                  "Denim Daily",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] bg-red-600 p-6 text-white md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-100">
                Newsletter
              </p>
              <h3 className="mt-2 text-3xl font-black uppercase tracking-tight">
                Nhận ưu đãi mới
              </h3>
              <p className="mt-4 text-sm leading-7 text-red-50">
                Khối này hiện là UI. Nếu cần submit thật, backend cần thêm API
                subscribe email.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <input
                  className="h-12 flex-1 rounded-full border border-white/30 bg-white/10 px-5 text-sm text-white outline-none placeholder:text-red-100"
                  placeholder="Nhập email của bạn"
                />
                <button className="h-12 rounded-full bg-white px-6 text-sm font-bold text-red-600 transition hover:opacity-95">
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
