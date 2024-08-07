import React from 'react';
import {AppDispatch, makeStore} from "@/lib/store/Store";
import {articleApi} from "@/lib/query/article.query";
import HomePageCardClient from "@/app/components/home/HomePageCardClient";

const HomePageCard = async () => {
    const store = makeStore();
    const dispatch = store.dispatch as AppDispatch;
    // @ts-ignore
    await dispatch(articleApi.endpoints.getPosts.initiate());

    // @ts-ignore
    const { data } = store.getState().api.queries["getPosts(undefined)"];
    return (
        <div>

<HomePageCardClient data={data}/>
        </div>
    );
};

export default HomePageCard;