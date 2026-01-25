import { baseApi } from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserById: builder.query({
            query: (id: string) => {
                return {
                    url: `/users/${id}`,
                    method: 'GET',

                }
            }
        })
    }),
});


export const { useGetUserByIdQuery } = productApi
