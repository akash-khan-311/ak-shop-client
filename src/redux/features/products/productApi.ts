import { baseApi } from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: ({ data, token }) => ({
                url: "/product/create",
                method: "POST",
                credentials: "include",
                body: data,
                headers: {
                    Authorization: `${token}`,

                },
            }),
            invalidatesTags: ["products"],
        }),
        getAllProductForAdmin: builder.query({
            query: (token) => {
                return {
                    url: '/product/admin',
                    method: 'GET',
                    headers: {
                        Authorization: `${token}`,
                    }
                }
            },
            providesTags: ["products"],
        }),
        getAllProducts: builder.query({
            query: () => {
                return {
                    url: '/product',
                    method: 'GET',

                }
            },
            providesTags: ["products"],
        }),
        getSingleProduct: builder.query<any, { id: string, token: string }>({
            query: ({ id, token }) => {
                return {
                    url: `/product/${id}`,
                    method: 'GET',
                    headers: {
                        Authorization: `${token}`,
                    }
                }
            },
            providesTags: ["products"],
        }),
        togglePublishProduct: builder.mutation({
            query: ({ id, token }) => ({
                url: `/product/publish/${id}`,
                method: "PATCH",
                credentials: "include",
                headers: {
                    Authorization: `${token}`,
                },
            }),
            invalidatesTags: ["products"],
        }),
        updateProduct: builder.mutation({
            query: ({ id, data, token }) => ({
                url: `/product/${id}`,
                method: "PATCH",
                body: data,
                headers: {
                    Authorization: `${token}`,
                }
            })
        })
    }),
});


export const {
    useCreateProductMutation,
    useGetAllProductsQuery,
    useGetSingleProductQuery,
    useGetAllProductForAdminQuery,
    useTogglePublishProductMutation
} = productApi
