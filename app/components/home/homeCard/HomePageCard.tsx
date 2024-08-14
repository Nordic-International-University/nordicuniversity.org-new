import React from "react";
import { AppDispatch, makeStore } from "@/lib/store/Store";
import { articleApi } from "@/lib/query/article.query";
import HomePageCardClient from "@/app/components/home/homeCard/HomePageCardClient";
import HomeNews from "@/app/components/home/homeNews/HomeNews";

const HomePageCard = async () => {
  const store = makeStore();
  const dispatch = store.dispatch as AppDispatch;
  // @ts-ignore
  await dispatch(articleApi.endpoints.getPosts.initiate());

  // @ts-ignore
  const { data } = store.getState().api.queries["getPosts(undefined)"] as cater;
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
