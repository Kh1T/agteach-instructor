import { configureStore as createStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";

export const store = createStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});