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
    getAllProducts: builder.query({
      query: () => ({
        url: "/api/product/getAllProduct",
        method: "GET",
      }),
    }),

    searchBar: builder.query({
      query: () => ({
        url: "/api/product/searchData",
        method: "GET",
      }),
    }),

    confirmDelete: builder.mutation({
      query: () => ({
        url: "/api/product/deleteOneProduct/",
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetAllProductsQuery,
  useSearchBarQuery,
  useConfirmDeleteMutation,
} = productApi;
