import { Link } from "react-router-dom";

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-black uppercase">Admin Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <Link
          to="/admin/products/create"
          className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm hover:border-red-500"
        >
          <h2 className="text-xl font-bold">Tạo sản phẩm</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Thêm sản phẩm mới vào hệ thống
          </p>
        </Link>

        <Link
          to="/admin/categories/create"
          className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm hover:border-red-500"
        >
          <h2 className="text-xl font-bold">Tạo danh mục</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Thêm category mới cho shop
          </p>
        </Link>

        <Link
          to="/products"
          className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm hover:border-red-500"
        >
          <h2 className="text-xl font-bold">Xem sản phẩm</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Kiểm tra sản phẩm ngoài storefront
          </p>
        </Link>
      </div>
    </div>
  );
}
