import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// //  https://api.agteach.site
// //  http://localhost:3001

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://api.agteach.site",
    baseUrl: " http://localhost:3001",
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
      invalidatesTags: ["Product"],
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

    getProducts: builder.query({
      providesTags: ["Product"],
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

    getProductsImages: builder.query({
      providesTags: ["Product"],
      query: (productId) => `/api/product/getProductImages/${productId}`,
    }),

    updateProduct: builder.mutation({
      invalidatesTags: ["Product"],
      query: ({ productId, productData }) => ({
        url: `/api/product/updateProduct/${productId}`,
        method: "PATCH",
        body: productData,
      }),
    }),

    getPurchasedProduct: builder.query({
      providesTags: ["Product"],
      query: ({ name = "", order = "All" }) => {
        let url = `/api/purchased/getInstructorPurchased?name=${name}`;
        if (order !== "All") {
          url += `&order=${order}`;
        } 
      
        console.log("API Request URL:", url); // Log the final URL
        return { url, method: "GET" };
      },
    }),

    getPurchasedDetails: builder.query({
      providesTags: ["Product"],
      query: ({ purchasedId, customerId }) => ({
        url: `/api/purchased/purchasedDetail/${purchasedId}?cid=${customerId}`,
        // url: `/api/purchased/purchasedDetail/52?cid=132`,
        method: "GET",
      }),
    }), 

  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useConfirmDeleteMutation,
  useGetProductsQuery,
  useGetInstructorDataQuery,
  useGetProductsImagesQuery,
  useUpdateProductMutation,
  useGetPurchasedProductQuery,
  useGetPurchasedDetailsQuery
} = productApi;
