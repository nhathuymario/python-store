import { useEffect, useState } from "react";
import { getCartApi } from "../api/cartApi";
import type { CartResponse } from "../types/cart";

export default function CartPage() {
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCartApi()
      .then(setCart)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-title">Giỏ hàng</h1>

      {loading ? (
        <p>Đang tải giỏ hàng...</p>
      ) : !cart?.items?.length ? (
        <div className="card cart-card">Chưa có sản phẩm nào trong giỏ.</div>
      ) : (
        <div className="card cart-card">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Variant ID</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map((item) => (
                <tr key={item.id}>
                  <td>{item.product_id}</td>
                  <td>{item.variant_id || "-"}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
