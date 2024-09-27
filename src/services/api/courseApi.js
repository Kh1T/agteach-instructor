import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
      baseUrl: "http://localhost:3001",
      credentials: "include",
    }),
    tagTypes: ["Course"],
  
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
  
      getAllCourses: builder.query({
        providesTags: ["Course"],
        query: () => ({
          url: "/api/course/getAllCourse",
          method: "GET",
        }),
      }),
  
      searchCourses: builder.query({
        query: ({ name, order }) => {
          let url = "/api/product/searchData?name=";
  
          if (name) url += name;
          if (order) {
            const dataOrder = order === 10 ? "desc" : "asc";
            url += `&order=${dataOrder}`;
          }
  
          return {
            url,
            method: "GET",
          };
        },
      }),
  
      confirmDelete: builder.mutation({
        query: (id) => ({
          url: `/api/product/deleteOneProduct/${id}`,
          method: "DELETE",
        }),
      }),
    }),
  });
  
  export const {
    useGetAllCoursesQuery,
    useConfirmDeleteMutation,
    useSearchCoursesQuery,
    useAddCourseMutation,
    useGetCourseQuery,
  } = courseApi;
  
