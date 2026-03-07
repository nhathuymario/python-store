export type ProductVariant = {
  id?: number;
  color: string;
  size: string;
  stock: number;
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  sku: string;
  description: string;
  price: number;
  sale_price?: number | null;
  thumbnail_url?: string | null;
  category_id: number;
  is_active: boolean;
  variants?: ProductVariant[];
};

export type ProductCreatePayload = {
  name: string;
  slug: string;
  sku: string;
  description: string;
  price: number;
  sale_price?: number | null;
  thumbnail_url?: string | null;
  category_id: number;
  is_active: boolean;
  variants: ProductVariant[];
};
