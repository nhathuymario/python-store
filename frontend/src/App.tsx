import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import AdminCreateProductPage from "./pages/admin/AdminCreateProductPage";
import AdminCreateCategoryPage from "./pages/admin/AdminCreateCategoryPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:slug" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route
          path="/admin/products/create"
          element={<AdminCreateProductPage />}
        />
        <Route
          path="/admin/categories/create"
          element={<AdminCreateCategoryPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}
