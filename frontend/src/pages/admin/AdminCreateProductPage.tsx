import { useEffect, useState } from "react";
import { createProductApi } from "../../api/productApi";
import { getCategoriesApi } from "../../api/categoryApi";
import { getApiErrorDetail } from "../../utils/error";
import type { Category } from "../../types/category";
import type { ProductCreatePayload, ProductVariant } from "../../types/product";

const defaultVariant = (): ProductVariant => ({
  color: "",
  size: "",
  stock: 0,
});

export default function AdminCreateProductPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState<ProductCreatePayload>({
    name: "",
    slug: "",
    sku: "",
    description: "",
    price: 0,
    sale_price: null,
    thumbnail_url: "",
    category_id: 0,
    is_active: true,
    variants: [defaultVariant()],
  });

  useEffect(() => {
    getCategoriesApi().then(setCategories).catch(console.error);
  }, []);

  const updateVariant = (
    index: number,
    key: keyof ProductVariant,
    value: string | number
  ) => {
    const next = [...form.variants];
    next[index] = { ...next[index], [key]: value } as ProductVariant;
    setForm({ ...form, variants: next });
  };

  const addVariant = () => {
    setForm({ ...form, variants: [...form.variants, defaultVariant()] });
  };

  const removeVariant = (index: number) => {
    const next = form.variants.filter((_, i) => i !== index);
    setForm({ ...form, variants: next });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const payload = {
        ...form,
        price: Number(form.price),
        sale_price: form.sale_price ? Number(form.sale_price) : null,
        category_id: Number(form.category_id),
        variants: form.variants.map((v) => ({
          ...v,
          stock: Number(v.stock),
        })),
      };

      await createProductApi(payload);
      setMessage("Tạo sản phẩm thành công");
    } catch (err: unknown) {
      setMessage(getApiErrorDetail(err) ?? "Tạo sản phẩm thất bại");
    }
  };

  return (
    <div className="page-container admin-form-wrapper">
      <div className="card admin-form-card">
        <h1 className="admin-form-title">Admin - Tạo sản phẩm</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Tên sản phẩm</label>
            <input
              className="input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="label">Slug</label>
            <input
              className="input"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="label">SKU</label>
            <input
              className="input"
              value={form.sku}
              onChange={(e) => setForm({ ...form, sku: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="label">Mô tả</label>
            <textarea
              className="textarea"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label className="label">Giá</label>
            <input
              className="input"
              type="number"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: Number(e.target.value) })
              }
            />
          </div>

          <div className="form-group">
            <label className="label">Giá sale</label>
            <input
              className="input"
              type="number"
              value={form.sale_price ?? ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  sale_price: e.target.value ? Number(e.target.value) : null,
                })
              }
            />
          </div>

          <div className="form-group">
            <label className="label">Thumbnail URL</label>
            <input
              className="input"
              value={form.thumbnail_url ?? ""}
              onChange={(e) =>
                setForm({ ...form, thumbnail_url: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label className="label">Category</label>
            <select
              className="select"
              value={form.category_id}
              onChange={(e) =>
                setForm({ ...form, category_id: Number(e.target.value) })
              }
            >
              <option value={0}>Chọn category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) =>
                setForm({ ...form, is_active: e.target.checked })
              }
            />
            Active
          </label>

          <h3>Variants</h3>

          {form.variants.map((v, index) => (
            <div key={index} className="variant-box">
              <div className="form-group">
                <label className="label">Color</label>
                <input
                  className="input"
                  value={v.color}
                  onChange={(e) =>
                    updateVariant(index, "color", e.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label className="label">Size</label>
                <input
                  className="input"
                  value={v.size}
                  onChange={(e) => updateVariant(index, "size", e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="label">Stock</label>
                <input
                  className="input"
                  type="number"
                  value={v.stock}
                  onChange={(e) =>
                    updateVariant(index, "stock", Number(e.target.value))
                  }
                />
              </div>

              <div className="variant-actions">
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => removeVariant(index)}
                >
                  Xóa variant
                </button>
              </div>
            </div>
          ))}

          <div className="variant-actions">
            <button
              className="btn btn-secondary"
              type="button"
              onClick={addVariant}
            >
              + Thêm variant
            </button>
            <button className="btn btn-primary" type="submit">
              Tạo sản phẩm
            </button>
          </div>

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
        </form>
      </div>
    </div>
  );
}
