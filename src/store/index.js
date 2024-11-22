import { configureStore as createStore } from "@reduxjs/toolkit";
import { authApi } from "../services/api/authApi";
import { locationApi } from "../services/api/locationApi";
import { productApi } from "../services/api/productApi";
import { courseApi } from "../services/api/courseApi";
import userReducer from "../features/user/userSlice";
import { balanceApi } from "../services/api/balanceApi";
import { salesApi } from "../services/api/salesApi";
import authSlice from "../features/user/authSlice";
import courseSlice from "../features/course/courseSlice";
import { categoryApi } from "../services/api/categoryApi";
import { approvalApi } from "../services/api/approvalApi";
// import productReducer from "./productStore";

export const store = createStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [locationApi.reducerPath]: locationApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [salesApi.reducerPath]: salesApi.reducer,
    [balanceApi.reducerPath]: balanceApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [approvalApi.reducerPath]: approvalApi.reducer,
    user: userReducer,
    auth: authSlice,
    course: courseSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      locationApi.middleware,
      productApi.middleware,
      courseApi.middleware,
      salesApi.middleware,
      balanceApi.middleware,
      categoryApi.middleware,
      approvalApi.middleware,
    ),
});
