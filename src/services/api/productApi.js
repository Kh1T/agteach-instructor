import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    credentials: "include",
  }),

  tagTypes: ["Product"],
  endpoints: (builder) => ({
    createProduct: builder.mutation({

      query: (productData) => ({
        url: "/api/product/createProduct",
        method: "POST",
        body: productData,
      }),
      // invalidatesTags: ["Product"],
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
        if (order) {
          const dataOrder = order === 10 ? "desc" : "asc";
          url += `&order=${dataOrder}`;
        }

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

    getProducts: builder.query({
      query: () => ({
        url: "/api/products",
        method: "GET",
      }),
    }),

    getInstructorData: builder.query({
      query: () => ({
        url: "/api/instructor/getInstructor/data",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useSearchProductsQuery,
  useConfirmDeleteMutation,
  useGetProductsQuery,
  useGetInstructorDataQuery,
} = productApi;