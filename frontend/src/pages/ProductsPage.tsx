import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getProductsApi } from "../api/productApi";
import { getCategoriesApi } from "../api/categoryApi";
import type { Product } from "../types/product";
import type { Category } from "../types/category";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const categoryId = searchParams.get("category_id") || "";

  useEffect(() => {
    getCategoriesApi().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await getProductsApi({
          search: search || undefined,
          category_id: categoryId ? Number(categoryId) : undefined,
          page: 1,
          page_size: 20,
        });
        setProducts(data);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [search, categoryId]);

  return (
    <div className="page-container">
      <h1 className="page-title">Sản phẩm</h1>

      <div className="products-toolbar">
        <input
          className="input"
          placeholder="Tìm sản phẩm..."
          value={search}
          onChange={(e) => {
            const next = new URLSearchParams(searchParams);
            if (e.target.value) next.set("search", e.target.value);
            else next.delete("search");
            setSearchParams(next);
          }}
        />

        <select
          className="select"
          value={categoryId}
          onChange={(e) => {
            const next = new URLSearchParams(searchParams);
            if (e.target.value) next.set("category_id", e.target.value);
            else next.delete("category_id");
            setSearchParams(next);
          }}
        >
          <option value="">Tất cả danh mục</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <div className="products-grid">
          {products.map((item) => (
            <div key={item.id} className="card product-card">
              <img
                className="product-card-image"
                src={
                  item.thumbnail_url || "https://via.placeholder.com/240x180"
                }
                alt={item.name}
              />
              <div className="product-card-body">
                <h3 className="product-card-title">{item.name}</h3>
                <p className="product-card-price">
                  {item.price.toLocaleString()} đ
                </p>
                <Link
                  className="product-card-link"
                  to={`/products/${item.slug}`}
                >
                  Xem chi tiết
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
