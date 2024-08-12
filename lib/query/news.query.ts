import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsApi = createApi({
  reducerPath: "news",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://journal2.nordicun.uz",
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "force-cache");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPostsNews: builder.query({
      query: () => ({
        url: "/news/list?page=1&limit=10&lang=uz",
        method: "POST",
        keepUnusedDataFor: 0,
      }),
    }),
  }),
});

// Автоматически сгенерированные хуки для использования API запросов
export const { useGetPostsNewsQuery } = newsApi;
