import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const balanceApi = createApi({
  reducerPath: "balanceApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://api.agteach.site",
    baseUrl: " http://localhost:3001",
    credentials: "include",
  }),
  tagTypes: ["Balance"],

  endpoints: (builder) => ({
    getBalance: builder.query({
      providesTags: ["Balance"],

      query: () => {
        return {
          url: "/api/instructor/balance",
          method: "GET",
        };
      },
    }),
    searchProductBalance: builder.query({
      query: () => {
        return {
          url: "/api/instructor/searchProductBalance",
          method: "GET",
        };
      },
    }),
    searchCourseBalance: builder.query({
      query: () => {
        return {
          url: "/api/instructor/searchCourseBalance",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetBalanceQuery, useSearchCourseBalanceQuery, useSearchProductBalanceQuery } = balanceApi;
