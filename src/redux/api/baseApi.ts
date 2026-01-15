import config from "@/config";
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";
const baseUrl = "http://localhost:5000/v1/api";

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) headers.set("Authorization", `${token}`);

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  const state = api.getState() as RootState;

  if (!state.auth.token) {
    return await baseQuery(args, api, extraOptions);
  }
  let result = await baseQuery(args, api, extraOptions);
  console.log("this is from redux error", result.error);

  // 🔴 only if token expired / unauthorized
  if (result?.error?.status === 401 || result?.error?.status === 500) {
    // 🛑 আবার check — logout হয়ে গেছে কিনা
    const latestState = api.getState() as RootState;
    if (!latestState.auth.token) {
      api.dispatch(logout());
      return result;
    }

    // 🔁 refresh token call
    const res = await fetch(`${baseUrl}/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    });

    const refreshResult = await res.json();

    if (refreshResult?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: refreshResult.data.accessToken,
        })
      );

      // retry original query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["Me"],
  endpoints: () => ({}),
});
