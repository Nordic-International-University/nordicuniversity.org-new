import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const articleApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://journal2.nordicun.uz",
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-store");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/article/necessary?articles=6&topArticles=2&lastArticles=7",
    }),
    getBySlug: builder.query({
      query: (slug) => `/article/user/slug/${slug}`,
    }),
  }),
});

export const { useGetPostsQuery, useGetBySlugQuery } = articleApi;
