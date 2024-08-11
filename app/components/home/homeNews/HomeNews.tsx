import React from "react";
import { AppDispatch, makeStore } from "@/lib/store/Store";
import { newsApi } from "@/lib/query/news.query";
import HomeNewsClient from "@/app/components/home/homeNews/HomeNewsClient";

const HomeNews = async () => {
  const store = makeStore();
  const dispatch = store.dispatch as AppDispatch;
  // @ts-ignore
  await dispatch(newsApi.endpoints.getPostsNews.initiate());
  // @ts-ignore
  const { data } = store.getState().news.queries["getPostsNews(undefined)"];
  // @ts-ignore

  return (
    <div>
      <HomeNewsClient news={data.data} />
    </div>
  );
};

export default HomeNews;
