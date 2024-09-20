import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const locationApi = createApi({
  reducerPath: "LocationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.agteach.site",
    credentials: "include", // Move this line here
  }),
  endpoints: (builder) => ({
    
    getLocations: builder.query({
      query: () => ({
        url: "/api/users/getLocation",
        method: "GET",
      }),
    }),
    
  }),
});

export const {
  useGetLocationsQuery
} = locationApi;
