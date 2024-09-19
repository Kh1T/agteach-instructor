import { configureStore as createStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import userReducer from "./slice/userSlice";
import productReducer from "./productStore";

export const store = createStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    user: userReducer,
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
