import React from "react";
import { AppDispatch, makeStore } from "@/lib/store/Store";
import { articleApi } from "@/lib/query/article.query";
import HomePageCardClient from "@/app/components/home/homeCard/HomePageCardClient";
import HomeNews from "@/app/components/home/homeNews/HomeNews";

const HomePageCard = async () => {
  const store = makeStore();
  const dispatch = store.dispatch as AppDispatch;
  // @ts-ignore
  const result = await dispatch(articleApi.endpoints.getPosts.initiate());
  const data = result.data;
  return (
    <div>
      <HomePageCardClient
        articles={data?.articles || []}
        topArticles={data?.topArticles || []}
        lastArticles={data?.lastArticles || []}
      />
    </div>
  );
};

export default HomePageCard;
