export type StoreProductVariant = {
  id: number;
  name: string;
  priceCents: number;
  compareAtCents?: number | null;
  inventory: number;
  signed: boolean;
  attributes?: Record<string, unknown> | null;
};

export type StoreProductImage = {
  id: number;
  url: string;
  sortOrder?: number | null;
};

export type StoreProduct = {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  variants: StoreProductVariant[];
  images: StoreProductImage[];
};
