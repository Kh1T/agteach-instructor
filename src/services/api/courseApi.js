import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    addCourse: builder.mutation({
      query: (productData) => ({
        url: "/api/Course/uploadCourse",
        method: "POST",
        body: productData,
      }),
    }),
    getCourse: builder.query({
      query: () => ({
        url: "/api/products",
        method: "GET",
      }),
    }),
  }),
});

export const { useAddCourseMutation, useGetCourseQuery } = courseApi;
