import { baseApi } from "@/redux/api/baseApi";
import { TEffectiveTemplateResponse } from "@/types/specTemplate";

const specTemplateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEffectiveTemplate: builder.query<
      { success: boolean; data: TEffectiveTemplateResponse },
      { subcategorySlug: string; vendorId?: string }
    >({
      query: ({ subcategorySlug, vendorId }) => ({
        url: `/spec-template/effective/${subcategorySlug}${vendorId ? `?vendorId=${vendorId}` : ""}`,
        method: "GET",


      }),
      providesTags: ["category"],
    }),
  }),
});
export const {
  useGetEffectiveTemplateQuery

} = specTemplateApi;
