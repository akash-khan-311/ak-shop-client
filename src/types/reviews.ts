export type TReview = {
    _id: string;
    productId: string;
    vendorId: string;
    userId: string;
    userName?: string;
    userEmail?: string;
    rating: number;
    comment: string;
    images?: { url: string; public_id: string }[];
    status: "pending" | "approved" | "rejected";
    reply?: { message: string; repliedBy: "vendor" | "admin"; repliedAt: string };
    createdAt: string;
};

export type TMeta = { page: number; limit: number; total: number; totalPage: number };

export type TVendorReviewsResponse = { items: TReview[]; meta: TMeta };

export type TSummary = {
    total: number;
    avgRating: number;
    pending: number;
    approved: number;
    rejected: number;
    r1: number; r2: number; r3: number; r4: number; r5: number;
};