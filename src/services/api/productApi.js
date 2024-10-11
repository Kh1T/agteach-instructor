import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// //  https://api.agteach.site
// //  http://localhost:3001

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.agteach.site",
    // baseUrl: " http://localhost:3001",
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
} = productApi;
