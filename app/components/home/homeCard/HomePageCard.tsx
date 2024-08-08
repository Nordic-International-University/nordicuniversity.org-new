import React from "react";
import HomePageCardClient from "@/app/components/home/homeCard/HomePageCardClient";
import { AppDispatch, makeStore } from "@/lib/store/Store";
import { articleApi } from "@/lib/query/article.query";

const HomePageCard = async () => {
  const store = makeStore();
  const dispatch = store.dispatch as AppDispatch;
  // @ts-ignore
  await dispatch(articleApi.endpoints.getPosts.initiate());

  // @ts-ignore
  const { data } = store.getState().api.queries["getPosts(undefined)"];

  return (
    <div>
      <HomePageCardClient
        articles={data.articles}
        topArticles={data.topArticles}
        lastArticles={data.lastArticles}
      />
    </div>
  );
};

export default HomePageCard;
