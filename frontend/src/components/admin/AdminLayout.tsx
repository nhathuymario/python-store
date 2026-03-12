import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import "../../assets/css/admin-layout.css";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-layout-content">
        <Outlet />
      </main>
    </div>
  );
}
