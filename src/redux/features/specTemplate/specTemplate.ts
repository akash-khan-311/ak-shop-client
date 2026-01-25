import { baseApi } from "@/redux/api/baseApi";
import { TEffectiveTemplateResponse } from "@/types/specTemplate";


const specTemplateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
      getEffectiveTemplate: builder.query<
      { success: boolean; data: TEffectiveTemplateResponse },
      { subcategorySlug: string; userId?: string }
    >({
      query: ({ subcategorySlug, userId }) => ({
        url: `/spec-template/effective/${subcategorySlug}${userId ? `?userId=${userId}` : ""}`,
        method: "GET",


      }),
      providesTags: ["category"],
    }),
    getTemplates: builder.query({
      query: ({ token, userId }) => {
        return {
          url: '/spec-template',
          method: 'GET',
          headers: {
            Authorization: `${token}`,
          },
          params: userId ? { userId } : undefined
        }
      },
      providesTags: ['SpecTemplate']
    }),
  
    getTemplateById: builder.query({
      query: ({ token, id }) => {
        return {
          url: `/spec-template/${id}`,
          method: 'GET',
          headers: {
            Authorization: `${token}`,
          }
        }
      },
      providesTags: ['SpecTemplate']
    }),
    updateTemplate: builder.mutation({
      query: ({ token, id, body }) => {
        return {
          url: `/spec-template/${id}`,
          method: 'PATCH',
          body,
          headers: {
            Authorization: `${token}`,
          }
        }
      },
      invalidatesTags: ['SpecTemplate']
    }),
    createSpecTemplate: builder.mutation<any, { token: string, body: any }>({
      query: ({ token, body }) => {
        return {
          url: '/spec-template/create',
          method: 'POST',
          body,
          headers: {
            Authorization: `${token}`,
          }
        }
      },
      invalidatesTags: ['SpecTemplate']
    }),
    deleteTemplates: builder.mutation({
      query: ({ token, ids }) => {
        return {
          url: '/spec-template/delete',
          method: 'DELETE',
          body: ids,
          headers: {
            Authorization: `${token}`,
          }
        }
      }
    })
  }),

});
export const {
  useGetTemplatesQuery,
  useGetTemplateByIdQuery,
  useUpdateTemplateMutation,
  useGetEffectiveTemplateQuery,
  useCreateSpecTemplateMutation

} = specTemplateApi;
