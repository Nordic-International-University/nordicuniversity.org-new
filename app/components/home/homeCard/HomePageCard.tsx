import React from "react";
import HomePageCardClient from "@/app/components/home/homeCard/HomePageCardClient";

const getArticles = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/necessary?articles=6&topArticles=2&lastArticles=8`,{
        cache:"no-cache"
    });
    const data = await res.json();
    return data;
};

const HomePageCard = async () => {
    const data = await getArticles();
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
