import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const volumeApi = createApi({
  reducerPath: "volumeApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.BASE_URL }),
  endpoints: (build) => ({
    getVolumes: build.query({
      query: () => "/volume",
    }),
  }),
});

export const { useGetVolumesQuery } = volumeApi;
