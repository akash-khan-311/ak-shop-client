import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/users/register",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    login: builder.mutation({
      query: (loginInfo) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: loginInfo,
        };
      },
    }),
    getMe: builder.query({
      query: (token) => ({
        url: "/users/me",
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["Me"],
    }),
    updateProfile: builder.mutation({
      query: (userInfo) => {
        return {
          url: `/users/${userInfo.id}`,
          method: "PATCH",
          headers: {
            Authorization: `${userInfo.token}`,
            "Content-Type": "application/json",
          },
          body: userInfo.userData,
        };
      },
      invalidatesTags: ["Me"],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useGetMeQuery,
  useUpdateProfileMutation,
} = authApi;
