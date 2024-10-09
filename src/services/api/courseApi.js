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

    getAllCourses: builder.query({
      providesTags: ["Course"],
      query: () => ({
        url: "/api/course/getAllCourse",
        method: "GET",
      }),
    }),

    searchCourses: builder.query({
      query: ({ name, order }) => {
        let url = "/api/course/searchData?name=";

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
        url: `/api/course/deleteOneCourse/${id}`,
        method: "DELETE",
      }),
    }),

  }),
  query: (id) => ({
    url: `/api/product/deleteOneProduct/${id}`,
    method: "DELETE",
    reducerPath: "courseApi",
    baseQuery: fetchBaseQuery({
      baseUrl: "http://localhost:3001",
      credentials: "include",
    }),
    tagTypes: ["Course"],

    endpoints: (builder) => ({
      getAllCourses: builder.query({
        providesTags: ["Course"],
        query: () => ({
          url: "/api/course/getAllCourse",
          method: "GET",
        }),
      }),

      searchCourses: builder.query({
        query: ({ name, order }) => {
          let url = "/api/course/searchData?name=";

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
          url: `/api/course/deleteOneCourse/${id}`,
          method: "DELETE",
        }),
      }),
    }),
  }),
});

export const {
  useAddCourseMutation,
  useGetCourseQuery,
  useGetAllCoursesQuery,
  useSearchCoursesQuery,
  useConfirmDeleteMutation,
} = courseApi;
