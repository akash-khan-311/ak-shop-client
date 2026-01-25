import Cookies from "js-cookie";
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
import toast from "react-hot-toast";
const baseUrl = "http://localhost:5000/v1/api";

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) headers.set("authorization", `${token}`);

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);
  
  if (result?.error?.status === 400) {
    const errorData = result.error.data as { message?: string };

    if (errorData?.message) {
      toast.error(errorData.message);
    }
  }
  if (result.error?.status === 401 || result.error?.status === 500) {
    //* Send Refresh Token

    const res = await fetch(`${baseUrl}/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    });
    const { data } = await res.json();
    
    if (data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(setUser({ user, token: data?.accessToken }));
      Cookies.set("accessToken", data?.accessToken);

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
  tagTypes: ["Me", "category",'subcategory','products','SpecTemplate'],
  endpoints: () => ({}),
});
