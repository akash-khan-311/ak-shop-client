import { baseApi } from "@/redux/api/baseApi";
import { TReview, TSummary, TVendorReviewsResponse } from "@/types/reviews";

const reviewsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProductReviews: builder.query<TReview[], string>({
            query: (productId) => {
                return {
                    url: `/reviews/product/${productId}`,
                    method: 'GET',
                }
            },
            providesTags: (result, _err, productId) =>
                result
                    ? [{ type: "Review", id: `product-${productId}` }]
                    : [{ type: "Review", id: `product-${productId}` }],
        }),
        getVendorReviews: builder.query<TVendorReviewsResponse, { page?: number; limit?: number; status?: string; rating?: string; productId?: string; searchTerm?: string; vendorId?: string }>({
            query: (params) => {
                return {
                    url: `/reviews/vendor`,
                    method: 'GET',
                    params
                }
            },
            providesTags: ["Review"],
        }),
        getVendorReviewSummary: builder.query<TSummary, { vendorId?: string } | void>({
            query: (params) => {
                const queryObj: any = {
                    url: '/reviews/vendor/summary',
                    method: 'GET',
                };
                if (params) {
                    queryObj.params = params;
                }
                return queryObj;
            },
            providesTags: ['ReviewSummary']
        }),
        createReview: builder.mutation<TReview, { token: string, formData: FormData }>({
            query: ({ token, formData }) => {
                return {
                    url: '/reviews',
                    method: 'POST',
                    headers: {
                        Authorization: `${token}`
                    },
                    body: formData

                }
            },
            invalidatesTags: (_res, _err, _arg) => ["Review", "ReviewSummary"],
        }),
        replyToReview: builder.mutation<TReview, { reviewId: string; message: string }>({
            query: ({ reviewId, message }) => ({
                url: `/reviews/${reviewId}/reply`,
                method: "PATCH",
                body: { message },
            }),
            invalidatesTags: ["Review", "ReviewSummary"],
        }),
    }),
});

export const { useGetProductReviewsQuery, useGetVendorReviewsQuery, useGetVendorReviewSummaryQuery, useCreateReviewMutation, useReplyToReviewMutation } = reviewsApi