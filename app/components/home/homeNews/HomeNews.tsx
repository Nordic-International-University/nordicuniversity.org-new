import React from "react";
import Store, {AppDispatch} from "@/lib/store/Store";
import {newsApi} from "@/lib/query/news.query";
import HomeNewsClient from "@/app/components/home/homeNews/HomeNewsClient";

export const dynamic = "force-dynamic"
const HomeNews = async () => {
    const dispatch = Store.dispatch as AppDispatch;
    // @ts-ignore
    const result = await dispatch(newsApi.endpoints.getPostsNews.initiate());
    // @ts-ignore
    const data = result.data;
    // @ts-ignore

    return (
        <HomeNewsClient news={data?.data}/>
    );
};

export default HomeNews;
