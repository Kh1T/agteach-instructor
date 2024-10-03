import { configureStore as createStore } from "@reduxjs/toolkit";
import { authApi } from "../services/api/authApi";
import { locationApi } from "../services/api/locationApi";
import { productApi } from "../services/api/productApi";
import userReducer from "../features/user/userSlice";
import { courseApi } from "../services/api/courseApi";
import authSlice from "../features/user/authSlice";

export const store = createStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [locationApi.reducerPath]: locationApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    user: userReducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      locationApi.middleware,
      courseApi.middleware,
      productApi.middleware
    ),
});
