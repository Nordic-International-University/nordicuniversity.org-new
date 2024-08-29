import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL2 }), // Asosiy API URL ni kiriting
    endpoints: (builder) => ({
        fetchCategories: builder.query({
            query: () => '/category_search',
            keepUnusedDataFor: 0, // fetchCategories() funksiyasi uchun muqobil
        }),
        fetchVolumes: builder.query({
            query: () => '/volume_search',
            keepUnusedDataFor: 0, // fetchVolumes() funksiyasi uchun muqobil
        }),
        getAuthor: builder.query({
            query: () => '/author',
            transformResponse: (response) => (response as any)?.data?.data,
            keepUnusedDataFor: 0, // getAuthor() funksiyasi uchun muqobil
        }),
        getSubCategoriesByCategoryId: builder.query({
            query: (category) => ({
                url: `/subcategory/${category}`,
            }),
            keepUnusedDataFor: 0, // getSubCategoriesByCategoryId() funksiyasi uchun muqobil
        }),
        getAllFilteredArticles: builder.mutation({
            query: ({ data, page, limit }) => ({
                url: `/article/multi-search?page=${page}&limit=${limit}`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    useFetchCategoriesQuery,
    useFetchVolumesQuery,
    useGetAuthorQuery,
    useGetSubCategoriesByCategoryIdQuery,
    useGetAllFilteredArticlesMutation,
} = apiSlice;
