export type CartOwnerType = "user" | "guest";

export type TCartItem = {
  productId: string;
  quantity: number;
  variantId?: string | null;
};

export type TCart = {
  _id: string;
  ownerType: CartOwnerType;
  userId?: string | null;
  guestId?: string | null;
  items: TCartItem[];
  createdAt: string;
  updatedAt: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};
