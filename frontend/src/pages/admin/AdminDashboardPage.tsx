import { Link } from "react-router-dom";
import "../../assets/css/admin-dashboard.css";

export default function AdminDashboardPage() {
  return (
    <div className="admin-dashboard">
      <div className="dashboard-topbar">
        <div className="dashboard-search">
          <input type="text" placeholder="Tìm kiếm nhanh..." />
        </div>

        <div className="dashboard-topbar-right">
          <button className="topbar-icon-btn">🔔</button>
          <button className="topbar-icon-btn">👤</button>
        </div>
      </div>

      <div className="dashboard-header">
        <div>
          <p className="dashboard-subtitle">Quản trị hệ thống</p>
          <h1 className="dashboard-title">Admin Dashboard</h1>
          <p className="dashboard-desc">
            Theo dõi tổng quan sản phẩm, đơn hàng và hoạt động hệ thống.
          </p>
        </div>

        <div className="dashboard-actions">
          <Link to="/products" className="outline-btn">
            Xem storefront
          </Link>
          <Link to="/admin/products/create" className="primary-btn">
            + Thêm sản phẩm
          </Link>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card purple">
          <div className="stat-card-top">
            <div>
              <p className="stat-label">Tổng sản phẩm</p>
              <h3 className="stat-value">128</h3>
            </div>
            <div className="stat-icon">📦</div>
          </div>
          <div className="stat-footer">
            <span className="stat-change up">↑ 12%</span>
            <p className="stat-note">Đang hiển thị trong hệ thống</p>
          </div>
        </div>

        <div className="stat-card green">
          <div className="stat-card-top">
            <div>
              <p className="stat-label">Danh mục</p>
              <h3 className="stat-value">12</h3>
            </div>
            <div className="stat-icon">🗂️</div>
          </div>
          <div className="stat-footer">
            <span className="stat-change up">↑ 8%</span>
            <p className="stat-note">Phân loại sản phẩm đang hoạt động</p>
          </div>
        </div>

        <div className="stat-card orange">
          <div className="stat-card-top">
            <div>
              <p className="stat-label">Đơn hàng mới</p>
              <h3 className="stat-value">36</h3>
            </div>
            <div className="stat-icon">🛒</div>
          </div>
          <div className="stat-footer">
            <span className="stat-change down">↓ 4%</span>
            <p className="stat-note">Cần kiểm tra và xử lý</p>
          </div>
        </div>

        <div className="stat-card blue">
          <div className="stat-card-top">
            <div>
              <p className="stat-label">Doanh thu tháng</p>
              <h3 className="stat-value">48.500.000đ</h3>
            </div>
            <div className="stat-icon">💰</div>
          </div>
          <div className="stat-footer">
            <span className="stat-change up">↑ 15%</span>
            <p className="stat-note">Tăng trưởng ổn định so với tháng trước</p>
          </div>
        </div>
      </div>

      <div className="dashboard-main-grid">
        <div className="dashboard-panel large-panel">
          <div className="panel-header">
            <div>
              <h2>Thao tác nhanh</h2>
              <span>Quản lý nhanh các chức năng chính</span>
            </div>
            <span className="panel-badge">Quick Access</span>
          </div>

          <div className="quick-actions-grid">
            <Link to="/admin/products/create" className="quick-card">
              <div className="quick-card-icon purple-bg">📦</div>
              <div>
                <h3>Tạo sản phẩm</h3>
                <p>Thêm sản phẩm mới vào hệ thống</p>
              </div>
            </Link>

            <Link to="/admin/categories/create" className="quick-card">
              <div className="quick-card-icon green-bg">🗂️</div>
              <div>
                <h3>Tạo danh mục</h3>
                <p>Thêm category mới cho shop</p>
              </div>
            </Link>

            <Link to="/admin/orders" className="quick-card">
              <div className="quick-card-icon orange-bg">🛒</div>
              <div>
                <h3>Quản lý đơn hàng</h3>
                <p>Theo dõi trạng thái và xử lý đơn</p>
              </div>
            </Link>

            <Link to="/admin/users" className="quick-card">
              <div className="quick-card-icon blue-bg">👤</div>
              <div>
                <h3>Quản lý người dùng</h3>
                <p>Xem danh sách tài khoản hệ thống</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="dashboard-panel side-panel">
          <div className="panel-header">
            <div>
              <h2>Tổng quan</h2>
              <span>Cập nhật nhanh</span>
            </div>
          </div>

          <div className="mini-list">
            <div className="mini-item">
              <div>
                <strong>5 sản phẩm sắp hết hàng</strong>
                <p>Cần cập nhật kho sớm</p>
              </div>
              <span className="badge warning">Cảnh báo</span>
            </div>

            <div className="mini-item">
              <div>
                <strong>12 đơn đang chờ xác nhận</strong>
                <p>Nên xử lý trong hôm nay</p>
              </div>
              <span className="badge info">Mới</span>
            </div>

            <div className="mini-item">
              <div>
                <strong>3 danh mục chưa có ảnh</strong>
                <p>Nên bổ sung để đẹp giao diện</p>
              </div>
              <span className="badge neutral">Kiểm tra</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-grid">
        <div className="dashboard-panel">
          <div className="panel-header">
            <div>
              <h2>Quản lý sản phẩm</h2>
              <span>Các chức năng liên quan đến sản phẩm</span>
            </div>
          </div>

          <div className="feature-links">
            <Link to="/admin/products" className="feature-link">
              Danh sách sản phẩm
            </Link>
            <Link to="/admin/products/create" className="feature-link">
              Thêm sản phẩm mới
            </Link>
            <Link to="/admin/categories" className="feature-link">
              Danh sách danh mục
            </Link>
            <Link to="/admin/categories/create" className="feature-link">
              Tạo danh mục mới
            </Link>
          </div>
        </div>

        <div className="dashboard-panel">
          <div className="panel-header">
            <div>
              <h2>Quản lý đơn hàng</h2>
              <span>Theo dõi bán hàng</span>
            </div>
          </div>

          <div className="order-status-list">
            <div className="status-row">
              <span>Chờ xác nhận</span>
              <strong>12</strong>
            </div>
            <div className="status-row">
              <span>Đang giao</span>
              <strong>8</strong>
            </div>
            <div className="status-row">
              <span>Hoàn thành</span>
              <strong>102</strong>
            </div>
            <div className="status-row">
              <span>Đã hủy</span>
              <strong>4</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
