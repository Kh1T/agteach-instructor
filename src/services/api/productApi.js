import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (productData) => ({
        url: "/api/products",
        method: "POST",
        body: productData,
      }),
    }),
    getProducts: builder.query({
      query: () => ({
        url: "/api/products",
        method: "GET",
      }),
    }),
  }),
});

export const { useAddProductMutation, useGetProductsQuery } = productApi;
