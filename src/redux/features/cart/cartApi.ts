import { baseApi } from "@/redux/api/baseApi";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyCart: builder.query({
      query: () => ({
        url: "/cart",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["cart"],
    }),
    // POST Add/create cart
    addToCart: builder.mutation({
      query: (body) => ({
        url: "/cart/add",
        method: "POST",
        body: {
          productId: body.productId,
          quantity: body.quantity ?? 1,
          variantId: body.variantId || null,
        },
        credentials: "include",
      }),
      invalidatesTags: ["cart"],
    }),
    updateCartItem: builder.mutation({
      query: (body) => ({
        url: "/cart/update-item",
        method: "PATCH",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["cart"],
    }),
    removeCartItem: builder.mutation({
      query: (body) => ({
        url: "/cart/remove-item",
        method: "DELETE",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["cart"],
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: "/cart/clear",
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["cart"],
    }),
    mergeGuestCart: builder.mutation({
      query: (body) => ({
        url: "/cart/merge",
        method: "POST",
        body: body ?? {},
        credentials: "include",
      }),
      invalidatesTags: ["cart", "Me"],
    }),
  }),
});
export const {
  useGetMyCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
  useMergeGuestCartMutation,
} = cartApi;
