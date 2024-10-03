import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// https://api.agteach.site
// http://localhost:3001
export const authApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.agteach.site",
    credentials: "include", 
  }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (signupData) => ({
        url: "/api/users/signup",
        method: "POST",
        body: signupData,
      }),
    }),

    login: builder.mutation({
      query: (loginData) => ({
        url: "/api/users/login",
        method: "POST",
        body: loginData,
        headers: { "X-Frontend-URL": window.location },
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
  useLogoutMutation,
  useVerifyEmailMutation,
  useResendVerifyCodeMutation,
  useAdditionalInfoMutation,
  useGetInstructorInfoQuery,
  useIsLoginQuery,
  useUpdateInstructorPasswordMutation,
} = authApi;
