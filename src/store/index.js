import { configureStore as createStore } from "@reduxjs/toolkit";
import { authApi } from "../services/api/authApi";
import userReducer from "../features/user/userSlice";
import { locationApi } from "./api/locationApi";

export const store = createStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [locationApi.reducerPath]: locationApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, locationApi.middleware),
});