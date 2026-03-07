import axiosClient from "./axiosClient";
import type { CartItemPayload, CartResponse } from "../types/cart";

export const getCartApi = async () => {
  const res = await axiosClient.get<CartResponse>("/cart");
  return res.data;
};

export const addToCartApi = async (payload: CartItemPayload) => {
  const res = await axiosClient.post("/cart/items", payload);
  return res.data;
};
