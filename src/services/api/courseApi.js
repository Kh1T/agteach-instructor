import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
    reducerPath: "courseApi",
    baseQuery: fetchBaseQuery({
      baseUrl: "https://api.agteach.site",
      credentials: "include",
    }),
    tagTypes: ["Course"],
  
    endpoints: (builder) => ({
  
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
  
  
      // searchCourses: builder.query({
      //   query: ({ name, order }) => {
      //     let url = "/api/course/searchData?name=";
  
      //     if (name) url += name;
      //     if (order) {
      //       const dataOrder = order === 10 ? "desc" : "asc";
      //       url += `&order=${dataOrder}`;
      //     }
  
      //     return {
      //       url,
      //       method: "GET",
      //     };
      //   },
      // }),
  
  
      confirmDelete: builder.mutation({
        query: (id) => ({
          url: `/api/course/deleteOneCourse/${id}`,
          method: "DELETE",
        }),
      }),
    }),
  });
  
  export const {
    useGetAllCoursesQuery,
    useConfirmDeleteMutation,
    // useSearchCoursesQuery,
  } = courseApi;
  