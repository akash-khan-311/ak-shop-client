import { baseApi } from "@/redux/api/baseApi";
import {
  AddressType,
  ApiResponse,
  IUser,
  IUserAddress,
  UpdateUserPayload,
} from "@/types/user";
import { setUser, logout } from "@/redux/features/auth/authSlice";
import { API_BASE } from "@/data";

const authApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    //---------------- Local Auth----------------

    signup: builder.mutation({
      query: (userInfo) => ({
        url: "/users/register",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["Me"],
    }),

    login: builder.mutation({
      query: (loginInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: loginInfo,
      }),
      invalidatesTags: ["Me"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Me"],
    }),

    getMe: builder.query<ApiResponse<IUser>, string | void>({
      query: (token) => ({
        url: "/users/me",
        method: "GET",
        credentials: "include",
        headers: token ? { Authorization: `${token}` } : undefined,
      }),
      providesTags: ["Me"],
    }),

    //---------------- Users---------------
    getAllUsers: builder.query<ApiResponse<IUser[]>, void>({
      query: (token) => ({
        url: "/users",
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: ["User"],
    }),

    getUserById: builder.query<ApiResponse<IUser>, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: (_res, _err, id) => [{ type: "User", id }],
    }),

    getUserByEmail: builder.query<ApiResponse<IUser>, string>({
      query: (email) => ({
        url: `/users/email/${encodeURIComponent(email)}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    getUserByPhone: builder.query<ApiResponse<IUser>, string>({
      query: (phone) => ({
        url: `/users/phone/${encodeURIComponent(phone)}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    updateUser: builder.mutation<
      ApiResponse<IUser>,
      { id: number; body: UpdateUserPayload }
    >({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_res, _err, { id }) => [{ type: "User", id }, "Me"],
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/users/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    //---------------- Address----------------
    addAddress: builder.mutation<
      ApiResponse<IUser>,
      { id: number; body: IUserAddress }
    >({
      query: ({ id, body }) => ({
        url: `/users/${id}/addresses`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_res, _err, { id }) => [{ type: "User", id }, "Me"],
    }),

    removeAddress: builder.mutation<
      ApiResponse<IUser>,
      { id: number; addressId: string }
    >({
      query: ({ id, addressId }) => ({
        url: `/users/${id}/addresses/${addressId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_res, _err, { id }) => [{ type: "User", id }, "Me"],
    }),

    setDefaultAddress: builder.mutation<
      ApiResponse<IUser>,
      { id: number; addressId: string; type: AddressType }
    >({
      query: ({ id, addressId, type }) => ({
        url: `/users/${id}/addresses/${addressId}/default/${type}`,
        method: "PATCH",
      }),
      invalidatesTags: (_res, _err, { id }) => [{ type: "User", id }, "Me"],
    }),

    //---------------- Avatar----------------
    updateAvatar: builder.mutation<
      ApiResponse<IUser>,
      { token?: string; id: number; file: File }
    >({
      query: ({ token, id, file }) => {
        const formData = new FormData();
        formData.append("avatar", file);

        return {
          url: `/users/${id}/avatar`,
          method: "PATCH",
          body: formData,
          headers: token ? { Authorization: `${token}` } : undefined,
        };
      },
      invalidatesTags: (_res, _err, { id }) => [{ type: "User", id }, "Me"],
    }),

    //---------------- OAuth ----------------
    getGoogleAuthUrl: builder.query<string, void>({
      queryFn: () => ({ data: `${API_BASE}/auth/google` }),
    }),

    getGithubAuthUrl: builder.query<string, void>({
      queryFn: () => ({ data: `${API_BASE}/auth/github` }),
    }),

    getFacebookAuthUrl: builder.query<string, void>({
      queryFn: () => ({ data: `${API_BASE}/auth/facebook` }),
    }),
    toggleStatusChange: builder.mutation({
      query: (data) => ({
        url: `/users/status/${data.id}`,
        method: "PATCH",
        headers: {
          Authorization: `${data.token}`,
        },
      }),
      invalidatesTags: ["User"],
    }),

    oauthFinalize: builder.mutation<ApiResponse<{ accessToken: string }>, void>(
      {
        query: () => ({
          url: "/auth/refresh-token",
          method: "POST",
        }),
        async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
          try {
            const refreshRes = await queryFulfilled;

            // adjust this line if your response shape differs
            const accessToken = refreshRes.data?.data?.accessToken;

            if (!accessToken) {
              dispatch(logout());
              return;
            }

            // fetch profile (cookie+token both supported)
            const meRes = await fetch(`${API_BASE}/users/me`, {
              method: "GET",
              credentials: "include",
              headers: { Authorization: `${accessToken}` },
            }).then((r) => r.json());

            if (meRes?.success) {
              dispatch(setUser({ user: meRes?.data, token: accessToken }));
              // optional: trigger refetch for Me tagged queries
              dispatch(baseApi.util.invalidateTags(["Me"]));
            } else {
              dispatch(logout());
            }
          } catch {
            dispatch(logout());
          }
        },
      },
    ),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useGetUserByEmailQuery,
  useGetUserByPhoneQuery,
  useUpdateUserMutation,
  useToggleStatusChangeMutation,
  useAddAddressMutation,
  useRemoveAddressMutation,
  useSetDefaultAddressMutation,
  useUpdateAvatarMutation,
  useDeleteUserMutation,

  // ✅ OAuth
  useGetGoogleAuthUrlQuery,
  useGetGithubAuthUrlQuery,
  useGetFacebookAuthUrlQuery,
  useOauthFinalizeMutation,
} = authApi;

export default authApi;
