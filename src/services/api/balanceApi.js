import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../constants/apiConstant";

export const balanceApi = createApi({
  reducerPath: "balanceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
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
      query: ({ name = "", order = "" }) => {
        order = order === 10 ? "asc" : "desc";
        return {
          url: `/api/instructor/searchProductBalance?name=${name}&order=${order}`,
          method: "GET",
        };
      },
    }),
    searchCourseBalance: builder.query({
      query: ({ name = "", order = "" }) => {
        order = order === 10 ? "asc" : "desc";
        return {
          url: `/api/instructor/searchCourseBalance?name=${name}&order=${order}`,
          method: "GET",
        };
      },
    }),
    getRecentTransactions: builder.query({
      query: () => {
        return {
          url: "/api/instructor/getRecentTransaction",
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetBalanceQuery,
  useSearchCourseBalanceQuery,
  useSearchProductBalanceQuery,
  useGetRecentTransactionsQuery,
} = balanceApi;
