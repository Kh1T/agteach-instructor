import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../constants/apiConstant";

export const authApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Instructor"],
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (signupData) => ({
        url: "/api/users/signup",
        method: "POST",
        body: signupData,
      }),
      invalidatesTags: ["Instructor"],
    }),

    login: builder.mutation({
      query: (loginData) => ({
        url: "/api/users/login",
        method: "POST",
        body: loginData,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/api/users/logout",
        method: "POST",
      }),
    }),

    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "api/users/forgotPassword",
        method: "POST",
        body: email,
      }),
    }),

    resetPassword: builder.mutation({
      query: (resetData) => ({
        url: `api/users/resetPassword/${resetData.resetToken}`,
        method: "PATCH",
        body: resetData.body,
      }),
    }),

    verifyEmail: builder.mutation({
      query: (emailVerifyCode) => ({
        url: "/api/users/verifyEmail",
        method: "POST",
        body: { emailVerifyCode },
      }),
    }),

    resendVerifyCode: builder.mutation({
      query: (email) => ({
        url: "/api/users/resendCode",
        method: "POST",
        body: { email },
      }),
    }),

    additionalInfo: builder.mutation({
      query: (additionalInfoData) => ({
        url: "/api/instructor/addAdditionalInfo",
        method: "POST",
        body: additionalInfoData,
      }),
    }),

    getInstructorInfo: builder.query({
      query: () => ({
        url: "/api/instructor/getInstructor/additionalInfo",
        method: "GET",
      }),
    }),

    isLogin: builder.query({
      query: () => ({
        url: "/api/users/isLoginedIn",
        method: "GET",
        // headers: { "X-Frontend-URL": window.location },
      }),
    }),

    updateInstructorInfo: builder.mutation({
      query: (additionalInfoData) => ({
        url: "/api/instructor/updateMe",
        method: "PATCH",
        body: additionalInfoData,
      }),
      invalidatesTags: ["Instructor"],
    }),

    getLocations: builder.query({
      query: () => ({
        url: "/api/users/getLocation",
        method: "GET",
      }),
    }),

    updateInstructorPassword: builder.mutation({
      query: (passwordInfo) => ({
        url: "/api/users/updatePassword",
        method: "PATCH",
        body: passwordInfo,
      }),
    }),
  }),
});

export const {
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useSignupMutation,
  useLoginMutation,
  useGetLocationsQuery,
  useLogoutMutation,
  useVerifyEmailMutation,
  useResendVerifyCodeMutation,
  useAdditionalInfoMutation,
  useGetInstructorInfoQuery,
  useUpdateInstructorInfoMutation,
  useIsLoginQuery,
  useUpdateInstructorPasswordMutation,
} = authApi;
