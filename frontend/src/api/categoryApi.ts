import axiosClient from "./axiosClient";
import type { Category, CategoryCreatePayload } from "../types/category";

export const getCategoriesApi = async () => {
  const res = await axiosClient.get<Category[]>("/categories");
  return res.data;
};

export const getCategoryDetailApi = async (slug: string) => {
  const res = await axiosClient.get<Category>(`/categories/${slug}`);
  return res.data;
};

export const createCategoryApi = async (payload: CategoryCreatePayload) => {
  const res = await axiosClient.post<Category>("/categories/admin", payload);
  return res.data;
};
