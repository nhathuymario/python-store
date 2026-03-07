import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/home/Header";
import MegaMenu from "../components/home/MegaMenu";
import Hero from "../components/home/Hero";
import FeatureBar from "../components/home/FeatureBar";
import ProductGrid from "../components/home/ProductGrid";
import TechnologySection from "../components/home/TechnologySection";
import Footer from "../components/home/Footer";
import { getCategoriesApi } from "../api/categoryApi";
import { getProductsApi } from "../api/productApi";
import { addToCartApi } from "../api/cartApi";
import { getApiErrorDetail } from "../utils/error";
import type { Category } from "../types/category";
import type { Product } from "../types/product";

const heroCards = [
  {
    title: "Bền, mềm, không lỗi mốt",
    subtitle: "Dòng sản phẩm thiết yếu cho mỗi ngày",
  },
  {
    title: "Công nghệ thời trang",
    subtitle: "Thoáng mát, nhanh khô, chống nhăn",
  },
  { title: "New arrival", subtitle: "Bộ sưu tập mới mở bán tuần này" },
];

const technologies = [
  "CloudTouch™",
  "IceVibes™",
  "DurableTex™",
  "AirDry™",
  "FlexFit™",
  "EasyCare™",
  "RainShield™",
  "StayFresh™",
];

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
          getProductsApi({ page: 1, page_size: 8 }),
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
        detail?.toLowerCase().includes("credentials")
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
      </main>

      <Footer />
    </div>
  );
}
