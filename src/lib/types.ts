export type CartItem = {
  variantId: number;
  productId: number;
  productSlug: string;
  title: string;
  variantName: string;
  priceCents: number;
  quantity: number;
  imageUrl?: string;
  signed?: boolean;
  attributes?: Record<string, unknown>;
};

export type Cart = {
  items: CartItem[];
  discountCode?: string;
};

export type Paginated<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
};

export type ProductFilter = {
  category?: string;
  size?: string;
  color?: string;
  inStock?: boolean;
  sort?: 'newest' | 'best-selling' | 'price-asc' | 'price-desc';
};
