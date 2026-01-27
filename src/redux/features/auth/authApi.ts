import { baseApi } from "@/redux/api/baseApi";
import { AddressType, ApiResponse, IUser, IUserAddress, UpdateUserPayload } from "@/types/user";

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

        },
      }),
      providesTags: ["Me"],
    }),
    getAllUsers: builder.query<ApiResponse<IUser>, number>({
      query: () => {
        return {
          url: '/users',

        }
      },
      providesTags: ['User']
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: (_res, _err, id) => [{ type: "User", id }],
    }),
    getUserByEmail: builder.query<ApiResponse<IUser>, string>({
      query: (email) => {
        return {
          url: `/users/email/${encodeURIComponent(email)}`,
          method: "GET"
        }
      },
      providesTags: ["User"],
    }),
    getUserByPhone: builder.query<ApiResponse<IUser>, string>({
      query: (phone) => {
        return {
          url: `/users/phone/${encodeURIComponent(phone)}`,
          method: "GET"
        }
      },
      providesTags: ["User"],
    }),
    updateUser: builder.mutation<ApiResponse<IUser>, { id: number; body: UpdateUserPayload }>({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_res, _err, { id }) => [{ type: "User", id }, "Me"],
    }),
    addAddress: builder.mutation<ApiResponse<IUser>, { id: number; body: IUserAddress }>({
      query: ({ id, body }) => ({
        url: `/users/${id}/addresses`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_res, _err, { id }) => [{ type: "User", id }, "Me"],
    }),
    removeAddress: builder.mutation<ApiResponse<IUser>, { id: number; addressId: string }>({
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
    updateAvatar: builder.mutation<ApiResponse<IUser>, { token: string, id: number; file: File }>({
      query: ({ token, id, file }) => {
        const formData = new FormData();
        formData.append("avatar", file);

        return {
          url: `/users/${id}/avatar`,
          method: "PATCH",
          body: formData,
          headers: {
            Authorization: `${token}`,
          }
        };
      },
      invalidatesTags: (_res, _err, { id }) => [{ type: "User", id }, "Me"],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useGetMeQuery,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useGetUserByEmailQuery,
  useGetUserByPhoneQuery,
  useUpdateUserMutation,
  useAddAddressMutation,
  useRemoveAddressMutation,
  useSetDefaultAddressMutation,
  useUpdateAvatarMutation

} = authApi;
