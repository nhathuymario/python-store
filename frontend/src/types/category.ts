export type Category = {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  is_active: boolean;
};

export type CategoryCreatePayload = {
  name: string;
  slug: string;
  description?: string;
  is_active: boolean;
};
