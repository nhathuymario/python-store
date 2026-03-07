import axiosClient from "./axiosClient";
import type { Product, ProductCreatePayload } from "../types/product";

export type ProductQuery = {
  category_id?: number;
  search?: string;
  min_price?: number;
  max_price?: number;
  page?: number;
  page_size?: number;
};

export const getProductsApi = async (params?: ProductQuery) => {
  const res = await axiosClient.get<Product[]>("/products", { params });
  return res.data;
};

export const getProductDetailApi = async (slug: string) => {
  const res = await axiosClient.get<Product>(`/products/${slug}`);
  return res.data;
};

export const createProductApi = async (payload: ProductCreatePayload) => {
  const res = await axiosClient.post<Product>("/admin/products", payload);
  return res.data;
};
