import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.agteach.site",
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
      invalidatesTags: ["Course"],
    }),

    getCourse: builder.query({
      query: (id) => ({
        url: `/api/course/getOneCourse/${id}`,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),

    getAllCourses: builder.query({
      query: () => ({
        url: "/api/course/getAllCourse",
        method: "GET",
      }),
      providesTags: ["Course"],
    }),

    getInstructoreProduct: builder.query({
      query: ({ name }) => {
        let url = `/api/product/getInstructorProduct?name=${name}`;

        return {
          url,
          method: "GET",
        }
      },
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
      invalidatesTags: ["Course"],
    }),
  }),
});

export const {
  useAddCourseMutation,
  useGetCourseQuery,
  useGetAllCoursesQuery,
  useGetInstructoreProductQuery,
  useSearchCoursesQuery,
  useConfirmDeleteMutation,
} = courseApi;
