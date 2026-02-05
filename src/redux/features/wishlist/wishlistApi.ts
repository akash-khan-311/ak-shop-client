import { baseApi } from "@/redux/api/baseApi";

export const wishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyWishlist: builder.query({
      query: () => ({
        url: "/wishlist",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["wishlist"],
    }),
    // POST Add/create cart
    addToWishlist: builder.mutation({
      query: (body) => ({
        url: "/wishlist/add",
        method: "POST",
        body: {
          productId: body.productId,
          variantId: body.variantId || null,
        },
        credentials: "include",
      }),
      invalidatesTags: ["wishlist"],
    }),
    removeWishlistItem: builder.mutation({
      query: (body) => ({
        url: "/wishlist/remove-item",
        method: "DELETE",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["wishlist"],
    }),
    clearWishlist: builder.mutation({
      query: () => ({
        url: "/wishlist/clear",
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["wishlist"],
    }),
    mergeGuestWishlist: builder.mutation({
      query: (body) => ({
        url: "/wishlist/merge",
        method: "POST",
        body: body ?? {},
        credentials: "include",
      }),
      invalidatesTags: ["wishlist", "Me"],
    }),
  }),
});

export const {
  useGetMyWishlistQuery,
  useAddToWishlistMutation,
  useRemoveWishlistItemMutation,
  useClearWishlistMutation,
  useMergeGuestWishlistMutation,
} = wishlistApi;
