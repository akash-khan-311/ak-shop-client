import { baseApi } from "@/redux/api/baseApi";
import { TTemplate } from "@/types/specTemplate";

const specTemplateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEffectiveTemplate: builder.query<
      { success: boolean; data: TTemplate },
      { subcategorySlug: string; adminId?: string }
    >({
      query: ({ subcategorySlug, adminId }) => ({
        url: `/spec-template/effective/${subcategorySlug}${adminId ? `?adminId=${adminId}` : ""}`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    getTemplates: builder.query({
      query: ({ token, adminId }) => {
        return {
          url: "/spec-template",
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
          params: adminId ? { adminId } : undefined,
        };
      },
      providesTags: ["SpecTemplate"],
    }),
    getTemplateForAdmin: builder.query({
      query: () => {
        return {
          url: "/spec-template/admin",
          method: "GET",
        };
      },
      providesTags: ["SpecTemplate"],
    }),

    getTemplateById: builder.query({
      query: ({ token, id }) => {
        return {
          url: `/spec-template/${id}`,
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        };
      },
      providesTags: ["SpecTemplate"],
    }),
    updateTemplate: builder.mutation({
      query: ({ token, id, body }) => {
        return {
          url: `/spec-template/${id}`,
          method: "PATCH",
          body,
          headers: {
            Authorization: `${token}`,
          },
        };
      },
      invalidatesTags: ["SpecTemplate"],
    }),
    createSpecTemplate: builder.mutation<any, { token: string; body: any }>({
      query: ({ token, body }) => {
        return {
          url: "/spec-template/create",
          method: "POST",
          body,
          headers: {
            Authorization: `${token}`,
          },
        };
      },
      invalidatesTags: ["SpecTemplate"],
    }),
    deleteSpecTemplate: builder.mutation({
      query: ({ ids, token }) => {
        return {
          url: `/spec-template/delete`,
          method: "DELETE",
          body: { ids },
          headers: {
            Authorization: `${token}`,
          },
        };
      },
      invalidatesTags: ["SpecTemplate"],
    }),
    toggleTemplatePublished: builder.mutation({
      query: (data) => ({
        url: `/spec-template/change-status/${data.id}`,
        method: "PATCH",

        credentials: "include",
        headers: {
          Authorization: `${data.token}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["SpecTemplate"],
    }),
  }),
});
export const {
  useGetTemplatesQuery,
  useGetTemplateForAdminQuery,
  useGetTemplateByIdQuery,
  useUpdateTemplateMutation,
  useGetEffectiveTemplateQuery,
  useCreateSpecTemplateMutation,
  useToggleTemplatePublishedMutation,
  useDeleteSpecTemplateMutation,
} = specTemplateApi;
