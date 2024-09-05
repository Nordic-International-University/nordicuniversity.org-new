// src/app/store/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const mySlice = createApi({
    reducerPath: 'myArticle',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL2,
        prepareHeaders: (headers) => {
            const token = Cookies.get('accessToken'); // Get token from cookies
            if (token) {
                headers.set('Authorization', token);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getArticleBySlug: builder.query({
            query: (slug) => `/article/user/slug/${slug}`,
        }),
        getAuthorProfile: builder.query({
            query: ({ token }) => ({
                url: '/author/profile',
                method: 'GET',
                headers: {
                    Authorization: `${token}`,
                },
            }),
        }),
    }),
});

export const { useGetArticleBySlugQuery,useGetAuthorProfileQuery} = mySlice;
