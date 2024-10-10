import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// //  https://api.agteach.site
// //  http://localhost:3001

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: " http://localhost:3001",
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

    // getAllProducts: builder.query({
    //   providesTags: ["Product"],
    //   // query: () => ({
    //   //   // url: "/api/product/getAllProduct",
    //   //   url: "/api/product/getInstructorProduct",
    //   //   method: "GET",
    //   // }),
    //   query: ({ name, order }) => {
    //     let url = "/api/product/getInstructorProduct?name=&order=";

    //     if (name && order) url = `/api/product/getInstructorProduct?name=${name}&order=${order}`;
    //     // if (order) {
    //     //   const dataOrder = order === 10 ? "desc" : "asc";
    //     //   url += `&order=${dataOrder}`;
    //     // }

    //     return {
    //       url,
    //       method: "GET",
    //     };
    //   },
    //   providesTags: ["Product"],
    // }),

    // // /api/product/getInstructorProduct?name=&order=

    // searchProducts: builder.query({
    //   query: ({ name, order }) => {
    //     let url = "/api/product/getInstructorProduct?name&order=";

    //     if (name) url += name;
    //     if (order) {
    //       const dataOrder = order === 10 ? "desc" : "asc";
    //       url += `&order=${dataOrder}`;
    //     }

    //     return {
    //       url,
    //       method: "GET",
    //     };
    //   },
    //   providesTags: ["Product"],
    // }),


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
    
    searchProducts: builder.query({
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
      providesTags: ["Product"],
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
