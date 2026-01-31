export type FormValues = {
    name: string;
    code: string;

    type: "percentage" | "fixed";
    value: number;

    maxDiscount?: number;
    minPurchase?: number;

    scope: "global" | "vendor" | "products" | "categories";
    productIds?: string[]; // scope=products হলে

    startDate?: string; // ISO
    endDate?: string; // ISO

    usageLimit?: number;
    perUserLimit?: number;

    isActive: boolean;
};