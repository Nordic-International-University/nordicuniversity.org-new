import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const volumeApi = createApi({
  reducerPath: "volumeApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.BASE_URL }),
  endpoints: (build) => ({
    getVolumes: build.query({
      query: () => "/volume",
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGetVolumesQuery } = volumeApi;
