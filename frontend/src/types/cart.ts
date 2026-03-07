export type CartItemPayload = {
  product_id: number;
  variant_id?: number | null;
  quantity: number;
};

export type CartResponse = {
  id: number;
  user_id: number;
  items?: {
    id: number;
    product_id: number;
    variant_id?: number | null;
    quantity: number;
  }[];
};
