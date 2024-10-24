import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../constants/apiConstant";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
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
        url: `/api/course/getOneCourseDetail/${id}`,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),

    getAllCourses: builder.query({
      providesTags: ["Course"],
      query: ({ name = "", order }) => {
        let url = `/api/course/getInstructorCourse?name=${name}`;
        
        // Include order only if it's defined
        if (order) {
          const dataOrder = order === "Newest" ? "desc" : "asc";
          url += `&order=${dataOrder}`;
        }
    
        return {
          url,
          method: "GET",
        };
      },
    }),

    getInstructorProduct: builder.query({
      providesTags: ["Course"],
      query: ({ name }) => {
        let url = `/api/product/getInstructorProduct?name=${name}`;

        return {
          url,
          method: "GET",
        };
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

    updateCourse: builder.mutation({
      query: ({courseId, formData}) => ({
        url: `/api/course/updateCourse/${courseId}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Course"],
    }),

    getEnrollmentCourse: builder.query({
      providesTags: ["Course"],
      query: ({ name = "", order = "Newest" }) => {
        let url = `/api/enrollment/getEnrollment?name=${name}`;
        if (order !== "Newest") {
          url += `&order=${order}`;
        } 
      
        console.log("API Request URL:", url); // Log the final URL
        return { url, method: "GET" };
      },
    }),
    
    getEnrollmentDetails: builder.query({
      providesTags: ["Course"],
      query: (courseId) => ({
        url: `/api/enrollment/getEnrollmentDetail/${courseId}`,
        method: "GET",
      }),
    }), 

  }),
});

export const {
  useAddCourseMutation,
  useGetCourseQuery,
  useGetAllCoursesQuery,
  useGetInstructorProductQuery,
  useSearchCoursesQuery,
  useConfirmDeleteMutation,
  useUpdateCourseMutation,
  useGetEnrollmentCourseQuery,
  useGetEnrollmentDetailsQuery,
} = courseApi;
