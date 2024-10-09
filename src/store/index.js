import { configureStore as createStore } from "@reduxjs/toolkit";
import { authApi } from "../services/api/authApi";
import { locationApi } from "../services/api/locationApi";
import { productApi } from "../services/api/productApi";
import { courseApi } from "../services/api/courseApi";
import userReducer from "../features/user/userSlice";
import authSlice from "../features/user/authSlice";
import productReducer from "./productStore";


export const store = createStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [locationApi.reducerPath]: locationApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    user: userReducer,
    auth: authSlice,
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      locationApi.middleware,
      productApi.middleware,
      courseApi.middleware
    ),
});
