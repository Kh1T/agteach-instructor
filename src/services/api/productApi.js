import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (productData) => ({
        url: "/api/product/createProduct",
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

export const { useCreateProductMutation, useGetProductsQuery } = productApi;
