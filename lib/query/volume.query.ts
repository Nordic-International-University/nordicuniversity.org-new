import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const volumeApi = createApi({
  reducerPath: "volumeApi",
  baseQuery: fetchBaseQuery({
    cache: "no-store",
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (build) => ({
    getVolumes: build.query<Array<any>, void>({
      query: () => "/volume",
    }),
  }),
});

export const { useGetVolumesQuery } = volumeApi;
