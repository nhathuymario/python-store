import { useState } from "react";
import { createCategoryApi } from "../../api/categoryApi";
import { getApiErrorDetail } from "../../utils/error";

export default function AdminCreateCategoryPage() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      await createCategoryApi({
        name,
        slug,
        description,
        is_active: isActive,
      });
      setMessage("Tạo category thành công");
    } catch (err: unknown) {
      setMessage(getApiErrorDetail(err) ?? "Tạo category thất bại");
    }
  };

  return (
    <div className="page-container admin-form-wrapper">
      <div className="card admin-form-card">
        <h1 className="admin-form-title">Admin - Tạo category</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Tên category</label>
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="label">Slug</label>
            <input
              className="input"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="label">Mô tả</label>
            <textarea
              className="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            Active
          </label>

          <div className="variant-actions">
            <button className="btn btn-primary" type="submit">
              Tạo category
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
