import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const newsApi = createApi({
    reducerPath: "news",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://journal2.nordicun.uz",
    }),
    endpoints: (builder) => ({
        getPostsNews: builder.query({
            query: () => ({
                url: "/news/list?page=1&limit=10&lang=uz",
                method: "POST",
            }),
        }),
    }),
});

export const {useGetPostsNewsQuery} = newsApi;
