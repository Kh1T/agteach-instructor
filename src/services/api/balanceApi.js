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
          url: "/api/balance",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetBalanceQuery } = balanceApi;
