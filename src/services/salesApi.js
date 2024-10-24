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
    
  }),
});

export const {
  useGetSalesOverviewQuery,
  useGetCourseTopSalesQuery,
  useGetProductTopSalesQuery,
} = salesApi;
