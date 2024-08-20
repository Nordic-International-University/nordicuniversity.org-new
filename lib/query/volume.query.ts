import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const volumeApi = createApi({
  reducerPath: "volumeApi",
  baseQuery: fetchBaseQuery({ baseUrl: " https://journal2.nordicun.uz" }),
  endpoints: (build) => ({
    getVolumes: build.query<Array<any>, void>({
      query: () => "/volume",
    }),
  }),
});

export const { useGetVolumesQuery } = volumeApi;
