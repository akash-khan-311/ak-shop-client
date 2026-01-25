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
        getAllProducts: builder.query({
            query: (token) => {
                return {
                    url: '/product',
                    method: 'GET',
                    headers: {
                        Authorization: `${token}`,
                    }
                }
            }
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
            }
        })
    }),
});


export const {
    useCreateProductMutation,
    useGetAllProductsQuery,
    useGetSingleProductQuery
} = productApi
