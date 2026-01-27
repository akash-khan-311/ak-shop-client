import { baseApi } from "@/redux/api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategoryForVendorAndAdmin: builder.query({
      query: () => ({
        url: "/category/vendor",
        method: "GET",
        credentials: "include",

      }),
      providesTags: ["category"],
    }),
    getAllCategoriesForUser: builder.query({
      query: () => {
        return {
          url: '/category/all',
          method: 'GET'
        }
      },
      providesTags: ['userCategory']
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
      invalidatesTags: ["category", "userCategory"],
    }),
    toggleCategoryPublished: builder.mutation({
      query: (data) => ({
        url: `/category/change-status/${data.id}`,
        method: "PATCH",

        credentials: "include",
        headers: {
          Authorization: `${data.token}`,

        },
      }),
      invalidatesTags: ["category", "userCategory"],
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
      invalidatesTags: ["category", "userCategory"],
    }),
    createSubCategory: builder.mutation({
      query: ({ id, token, formData }) => ({
        url: `/category/${id}/create-subcategory`,
        method: "POST",
        body: formData,
        credentials: "include",
        headers: {
          Authorization: `${token}`,

        },
      }),
      invalidatesTags: ["subcategory"],
    }),
    deleteCategory: builder.mutation({
      query: ({ ids, token }) => {
        return {
          url: `/category/delete`,
          method: "DELETE",
          credentials: "include",
          body: { ids },
          headers: {
            Authorization: `${token}`,
          },
        };
      },
      invalidatesTags: ["category", "userCategory"],
    }),
    getSubCategory: builder.query({
      query: () => {
        return {
          url: "/category/all/subcategories",
          method: "GET",
          credentials: "include",

        };
      },
      providesTags: ["subcategory"],
    }),
    getSingleSubCategory: builder.query({
      query: (id) => {
        return {
          url: `/category/subcategory/${id}`,
          method: "GET",
        };
      },
    }),

    updateSubCategory: builder.mutation({
      query: ({ id, token, data }) => ({
        url: `/category/subcategory/${id}`,
        method: "PATCH",
        body: data,
        credentials: "include",
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: ["subcategory"],
    }),
    deleteSubCategory: builder.mutation({
      query: ({ ids, token }) => {
        return {
          url: `/category/subcategory/delete`,
          method: 'DELETE',
          body: { ids },
          headers: {
            Authorization: `${token}`
          }
        }

      },
      invalidatesTags: ['subcategory']
    })
  }),
});

export const {
  useGetAllCategoryForVendorAndAdminQuery,
  useGetAllCategoriesForUserQuery,
  useToggleCategoryPublishedMutation,
  useCreateCategoryMutation,
  useCreateSubCategoryMutation,
  useDeleteCategoryMutation,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
  useGetSubCategoryQuery,
  useUpdateSubCategoryMutation,
  useGetSingleSubCategoryQuery,
  useDeleteSubCategoryMutation

} = categoryApi;
