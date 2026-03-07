import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { logout } from "../../utils/auth";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");
  const isAdmin = localStorage.getItem("is_admin") === "true";

  if (!token) {
    return (
      <button
        type="button"
        onClick={() => navigate("/login")}
        className="rounded-full border border-zinc-200 p-2 hover:bg-zinc-50"
      >
        <User className="h-5 w-5" />
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-full border border-zinc-200 p-2 hover:bg-zinc-50"
      >
        <User className="h-5 w-5" />
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg">
          <Link className="block px-4 py-3 hover:bg-zinc-50" to="/">
            Trang chủ
          </Link>

          <Link className="block px-4 py-3 hover:bg-zinc-50" to="/cart">
            Giỏ hàng
          </Link>

          {isAdmin && (
            <>
              <Link
                className="block px-4 py-3 hover:bg-zinc-50"
                to="/admin/dashboard"
              >
                Dashboard
              </Link>
            </>
          )}

          <button
            type="button"
            className="block w-full px-4 py-3 text-left hover:bg-zinc-50"
            onClick={() => {
              logout();
              localStorage.removeItem("is_admin");
              navigate("/");
            }}
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
}
