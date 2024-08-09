import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsApi = createApi({
  reducerPath: "news",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://journal2.nordicun.uz",
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-store");
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPostsNews: builder.mutation({
      query: () => ({
        url: "/news/list?page=1&limit=10&lang=uz",
        method: "POST",
      }),
    }),
  }),
});

// Автоматически сгенерированные хуки для использования API запросов
export const { useGetPostsNewsMutation } = newsApi;
