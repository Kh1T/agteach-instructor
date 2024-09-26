import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    credentials: "include",
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (productData) => ({
        url: "/api/products",
        method: "POST",
        body: productData,
      }),
    }),

    getAllProducts: builder.query({
      providesTags: ["Product"],
      query: () => ({
        url: "/api/product/getAllProduct",
        method: "GET",
      }),
    }),

    searchProducts: builder.query({
      query: ({ name, order }) => {
        let url = "/api/product/searchData?name=";

        if (name) url += name;
        if (order) url += `&order=${order}`;
        console.log(order);
        return {
          url,
          method: "GET",
        };
      },
    }),

    confirmDelete: builder.mutation({
      invalidatesTags: ["Product"],
      query: (id) => ({
        url: `/api/product/deleteOneProduct/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetAllProductsQuery,
  useSearchProductsQuery,
  useConfirmDeleteMutation,
} = productApi;
