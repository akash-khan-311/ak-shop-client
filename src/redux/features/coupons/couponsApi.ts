import { baseApi } from "@/redux/api/baseApi";


export const couponApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({

        createCoupon: builder.mutation({
            query: (body) => ({
                url: "/coupons",
                method: "POST",
                body,
            }),
            invalidatesTags: ["CouponList"],
        }),
        getCoupons: builder.query({
            query: (args) => ({
                url: "/coupons",
                method: "GET",
                params: args ? {
                    page: args.page,
                    limit: args.limit,
                    sort: args.sort,
                    searchTerm: args.searchTerm,
                    scope: args.scope,
                    isActive: args.isActive,
                } : {},
            }),
            providesTags: ["CouponList"],
        }),
        updateCoupon: builder.mutation({
            query: ({ couponId, body }) => ({
                url: `/coupons/${couponId}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["CouponList"],
        }),
        deleteCoupon: builder.mutation({
            query: ({ couponId }) => ({
                url: `/coupons/${couponId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["CouponList"],
        }),
        toggleCouponActive: builder.mutation({
            query: ({ couponId }) => ({
                url: `/coupons/${couponId}/toggle`,
                method: "PATCH",
            }),
            invalidatesTags: ["CouponList"],
        }),
        applyCoupon: builder.mutation({
            query: (body) => ({
                url: "/coupons/apply",
                method: "POST",
                body,
            }),
        }),
        consumeCoupon: builder.mutation({
            query: (body) => ({
                url: "/coupons/consume",
                method: "POST",
                body,
            }),
        }),
    })
})


export const {
    useCreateCouponMutation,
    useGetCouponsQuery,
    useUpdateCouponMutation,
    useDeleteCouponMutation,
    useToggleCouponActiveMutation,
    useApplyCouponMutation,
    useConsumeCouponMutation,
} = couponApi;