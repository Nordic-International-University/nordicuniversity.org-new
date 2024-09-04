import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const searchApi = createApi({
    reducerPath: 'search',
    baseQuery: fetchBaseQuery({ baseUrl: "https://journal2.nordicun.uz"}),
    endpoints: (builder) => ({
        getAllAuthor: builder.query({
            query: () => '/author',
            transformResponse(baseQueryReturnValue:any) {
                return baseQueryReturnValue.data
            }
        }),
        getSubCategoriesByCategoryId: builder.query({
            query: (id_list) => ({
                url: id_list?.length > 0 ? '/subcategory/sub' : '/subcategory',
                method: id_list?.length > 0 ? 'POST' : 'GET',
                body: id_list?.length > 0 ? { id_list } : undefined,
            }),
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
    useGetAllAuthorQuery,
    useGetSubCategoriesByCategoryIdQuery,
    useGetAllFilteredArticlesMutation,
} = searchApi;
