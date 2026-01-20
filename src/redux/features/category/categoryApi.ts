import { baseApi } from "@/redux/api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: (token) => ({
        url: "/category",
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["category"],
    }),
    getSingleCategory: builder.query({
      query: (id) => {
        return {
          url: `/category/${id}`,
          method: "GET",
        };
      },
    }),
    updateCategory: builder.mutation({
      query: ({ token, data, id }) => ({
        url: `/category/${id}`,
        method: "PATCH",
        body: data,
        credentials: "include",
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: ["category"],
    }),
    toggleCategoryPublished: builder.mutation({
      query: (data) => ({
        url: `/category/change-status/${data.id}`,
        method: "PATCH",

        credentials: "include",
        headers: {
          Authorization: `${data.token}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["category"],
    }),
    createCategory: builder.mutation({
      query: ({ token, formData }) => ({
        url: "/category/create",
        method: "POST",
        body: formData,
        credentials: "include",
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: ["category"],
    }),
    createSubCategory: builder.mutation({
      query: ({ id, token, payload }) => ({
        url: `/category/${id}/create-subcategory`,
        method: "POST",
        body: payload,
        credentials: "include",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["category"],
    }),
    deleteCategory: builder.mutation({
      query: ({ id, token }) => {
        return {
          url: `/category/delete/${id}`,
          method: "DELETE",
          credentials: "include",
          headers: {
            Authorization: `${token}`,
          },
        };
      },
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetAllCategoryQuery,
  useToggleCategoryPublishedMutation,
  useCreateCategoryMutation,
  useCreateSubCategoryMutation,
  useDeleteCategoryMutation,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
} = categoryApi;
