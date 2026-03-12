import { Link, NavLink } from "react-router-dom";
import "../../assets/css/admin-sidebar.css";

const menuItems = [
  { to: "/admin", label: "Tổng quan", icon: "◔" },
  { to: "/admin/products", label: "Sản phẩm", icon: "◫" },
  { to: "/admin/categories", label: "Danh mục", icon: "◎" },
  { to: "/admin/orders", label: "Đơn hàng", icon: "◌" },
  { to: "/admin/users", label: "Người dùng", icon: "◍" },
  { to: "/admin/settings", label: "Cài đặt", icon: "⚙" },
];

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="sidebar-top">
        <Link to="/admin" className="sidebar-brand">
          <div className="brand-logo">⬡</div>
          <div className="brand-text">AdminPanel</div>
        </Link>

        <div className="workspace-card">
          <span className="workspace-label">Workspace</span>
          <div className="workspace-main">
            <strong>Shop Admin</strong>
            <span className="workspace-arrow">⌄</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/admin"}
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <span className="sidebar-link-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">A</div>
          <div className="sidebar-user-info">
            <strong>Admin</strong>
            <span>admin@shop.com</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
