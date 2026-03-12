import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";

import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminCreateProductPage from "./pages/admin/AdminCreateProductPage";
import AdminCreateCategoryPage from "./pages/admin/AdminCreateCategoryPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* USER ROUTES */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:slug" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboardPage />} />

          <Route path="products/create" element={<AdminCreateProductPage />} />

          <Route
            path="categories/create"
            element={<AdminCreateCategoryPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
