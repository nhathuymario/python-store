import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMeApi, loginApi } from "../api/authApi";
import { saveIsAdmin, saveToken } from "../utils/auth";
import { getApiErrorDetail } from "../utils/error";
import "../assets/css/auth.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await loginApi({ email, password });
      saveToken(data.access_token);

      const me = await getMeApi();

      const isAdmin =
        me?.role === "admin" ||
        me?.is_admin === true ||
        me?.user?.role === "admin" ||
        me?.user?.is_admin === true;

      saveIsAdmin(Boolean(isAdmin));

      navigate("/");
    } catch (err: unknown) {
      setError(getApiErrorDetail(err) ?? "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="card auth-card">
        <h2 className="auth-title">Đăng nhập</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="email"
              placeholder="Nhập email"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="password">
              Mật khẩu
            </label>
            <input
              id="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
              placeholder="Nhập mật khẩu"
            />
          </div>

          {error && <div className="message message-error">{error}</div>}

          <button
            className="btn btn-primary auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
}
