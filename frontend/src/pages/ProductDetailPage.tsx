import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetailApi } from "../api/productApi";
import { addToCartApi } from "../api/cartApi";
import { getApiErrorDetail } from "../utils/error";
import type { Product } from "../types/product";

export default function ProductDetailPage() {
  const { slug = "" } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [variantId, setVariantId] = useState<number | "">("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getProductDetailApi(slug).then(setProduct).catch(console.error);
  }, [slug]);

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      await addToCartApi({
        product_id: product.id,
        variant_id: variantId === "" ? null : Number(variantId),
        quantity,
      });
      setMessage("Đã thêm vào giỏ hàng");
    } catch (err: unknown) {
      setMessage(getApiErrorDetail(err) ?? "Thêm giỏ hàng thất bại");
    }
  };

  if (!product) return <p className="page-container">Đang tải...</p>;

  return (
    <div className="page-container">
      <div className="product-detail">
        <div className="card product-detail-gallery">
          <img
            className="product-detail-image"
            src={product.thumbnail_url || "https://via.placeholder.com/400x300"}
            alt={product.name}
          />
        </div>

        <div className="card product-detail-info">
          <h1 className="product-detail-title">{product.name}</h1>
          <p className="product-detail-price">
            {product.price.toLocaleString()} đ
          </p>
          <p className="product-detail-desc">{product.description}</p>
          <p>SKU: {product.sku}</p>

          <div className="product-detail-actions">
            {!!product.variants?.length && (
              <div className="form-group">
                <label className="label">Biến thể</label>
                <select
                  className="select"
                  value={variantId}
                  onChange={(e) =>
                    setVariantId(e.target.value ? Number(e.target.value) : "")
                  }
                >
                  <option value="">Chọn biến thể</option>
                  {product.variants.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.color} - {v.size} - stock {v.stock}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="form-group">
              <label className="label">Số lượng</label>
              <input
                className="input"
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>

            <button className="btn btn-primary" onClick={handleAddToCart}>
              Thêm vào giỏ
            </button>

            {message && (
              <div
                className={`message ${
                  message.includes("thất bại")
                    ? "message-error"
                    : "message-success"
                }`}
              >
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
