import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// //  https://api.agteach.site
// //  http://localhost:3001

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.agteach.site",
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
      query: ({ name = "", order }) => {
        let url = `/api/product/getInstructorProduct?name=${name}`;
        
        // Include order only if it's defined
        if (order) {
          const dataOrder = order === "Newest" ? "desc" : "asc";
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
  }),
});

export const {
  useAddProductMutation,
  useGetAllProductsQuery,
  useConfirmDeleteMutation,
} = productApi;
