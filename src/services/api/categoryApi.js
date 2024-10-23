import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../constants/apiConstant";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      providesTags: ["Category"],
      query: () => ({
        url: "/api/admin/getAllCategories",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoryApi;
