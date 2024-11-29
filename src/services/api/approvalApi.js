import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../constants/apiConstant";

export const approvalApi = createApi({
  reducerPath: "approvalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include", // Move this line here
  }),
  endpoints: (builder) => ({

    formApproval: builder.mutation({
      query: (data) => ({
        url: "/api/instructor/addVerificationData",
        method: "PATCH",
        body: data,
      }),
    }),
    
  }),
});

export const {
  useFormApprovalMutation
} = approvalApi;
