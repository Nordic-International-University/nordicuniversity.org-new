import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const articleApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://journal2.nordicun.uz",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/article/necessary?articles=6&topArticles=2&lastArticles=7",
      keepUnusedDataFor: 0, // Данные будут сразу удаляться после использования
    }),
    getBySlug: builder.query({
      query: (slug) => `/article/user/slug/${slug}`,
      keepUnusedDataFor: 0,

      transformResponse: (response) => {
        console.log("API response:", response);
        return response;
      },
    }),
  }),
});

export const { useGetPostsQuery, useGetBySlugQuery } = articleApi;
