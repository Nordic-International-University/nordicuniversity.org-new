import React from "react";
import { AppDispatch, makeStore } from "@/lib/store/Store";
import { newsApi } from "@/lib/query/news.query";
import HomeNewsClient from "@/app/components/home/homeNews/HomeNewsClient";

const HomeNews = async () => {
  const store = makeStore();
  const dispatch = store.dispatch as AppDispatch;
  // @ts-ignore
  const result = await dispatch(
    newsApi.endpoints.getPostsNews.initiate(undefined),
  );

  // @ts-ignore

  return (
    <div>
      <HomeNewsClient news={result.data} />
    </div>
  );
};

export default HomeNews;
