import { configureStore as createStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import userReducer from "./slice/userSlice";

export const store = createStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});