import { combineReducers } from "@reduxjs/toolkit";
import wishlistReducer from "./features/wishListsSlice";
import authReducer from "./features/auth/authSlice";
import { baseApi } from "./api/baseApi";
const rootReducer = combineReducers({
  wishlist: wishlistReducer,
  auth: authReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export default rootReducer;
