export type TCouponScope = "global" | "products" | "categories";
export type TCouponType = "percentage" | "fixed";

export type TCoupon = {
    _id: string;
    adminId: string;
    name: string;
    code: string;

    type: TCouponType;
    value: number;
    maxDiscount?: number | null;
    minPurchase?: number;

    scope: TCouponScope;
    productIds?: string[];
    categoryIds?: string[];

    startDate?: string | null;
    endDate?: string | null;

    usageLimit?: number | null;
    perUserLimit?: number | null;

    usedCount: number;

    isActive: boolean;
    isDeleted: boolean;

    createdAt: string;
    updatedAt: string;
};

export type TPaginationMeta = {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
};

export type TCouponListResponse = {
    items: TCoupon[];
    meta: TPaginationMeta;
};


export type TGetCouponsArgs = {
    page?: number;
    limit?: number;
    sort?: string; // e.g. "-createdAt" | "createdAt" | "name"
    searchTerm?: string;
    scope?: "global" | "products" | "categories" | "all";
    isActive?: "true" | "false" | "all";
};

export type TCreateCouponBody = {
    name: string;
    code: string;
    type: "percentage" | "fixed";
    value: number;
    scope?: "global" | "products" | "categories";
    productIds?: string[];
    categoryIds?: string[];

    startDate?: string;
    endDate?: string;

    usageLimit?: number;
    perUserLimit?: number;

    isActive?: boolean;
};

export type TUpdateCouponBody = Partial<TCreateCouponBody>;

export type TApplyCouponBody = {
    code: string;
    cartTotal: number; // ✅ number
    productIds?: string[];
    categoryIds?: string[];
};

export type TConsumeCouponBody = {
    couponId: string;
    orderId?: string;
};