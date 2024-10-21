import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../constants/apiConstant";

export const salesApi = createApi({
  reducerPath: "salesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Sales"],
  endpoints: (builder) => ({
    getSalesOverview: builder.query({
      providesTags: ["Sales"],
      query: () => ({
        url: "/api/instructor/getInstructorOverviewSales",
        method: "GET",
      }),
    }),

    getCourseTopSales: builder.query({
      providesTags: ["Sales"],
      query: () => ({
        url: "/api/instructor/getInstructorCourseTopSales",
        method: "GET",
      }),
    }),

    getProductTopSales: builder.query({
      providesTags: ["Sales"],
      query: () => ({
        url: "/api/instructor/getInstructorProductTopSales",
        method: "GET",
      }),
    }),

    // getPurchasedProduct: builder.query({
    //     providesTags: ["Product"],
    //     query: ({ name = "", order = "All" }) => {
    //       let url = `/api/purchased/getInstructorPurchased?name=${name}`;
    //       if (order !== "All") {
    //         url += `&order=${order}`;
    //       } 
        
    //       console.log("API Request URL:", url); // Log the final URL
    //       return { url, method: "GET" };
    //     },
    //   }),
    
  }),
});

export const {
  useGetSalesOverviewQuery,
  useGetCourseTopSalesQuery,
  useGetProductTopSalesQuery,
} = salesApi;
