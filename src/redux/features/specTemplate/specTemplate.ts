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
      }
    })
  }),

});
export const {
  useGetEffectiveTemplateQuery,
  useCreateSpecTemplateMutation

} = specTemplateApi;
