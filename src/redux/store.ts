import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./api/baseApi";
import rootReducer from "./rootReducer";
import type { Reducer } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["wishlist", "auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer) as Reducer;

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
