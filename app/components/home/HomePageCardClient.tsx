"use client";
import React, { useEffect } from "react";
import ArticleCard from "@/app/components/Cards/ArticleCard";
import NewsCard from "@/app/components/Cards/NewsCard";
import BigArticlesCard from "@/app/components/Cards/BigArticlesCard";

const HomePageCardClient = ({
  articles,
  topArticles,
  lastArticles,
}: {
  articles: [];
  topArticles: [];
  lastArticles: [];
}) => {
  return (
    <section className={"container"}>
      <div className={"flex justify-between w-full mt-5 gap-5"}>
        <div className=" flex-col flex gap-5 ">
          <div className={"flex  gap-5"}>
            {topArticles?.map((article: any, index: number) => (
              <div key={index} className={"w-full"}>
                <BigArticlesCard
                  title={article.title}
                  date={article.createdAt}
                  category={article.category.name}
                  description={article.description}
                  author={article.author.full_name}
                  imageUrl={article.image.file_path}
                />
              </div>
            ))}
          </div>
          <div className={"grid grid-cols-2 gap-2 w-full"}>
            {articles?.map((article: any, index: number) => (
              <div key={index}>
                <ArticleCard
                  title={article.title}
                  date={article.createdAt}
                  category={article.category.name}
                  description={article.description}
                  author={article.author.full_name}
                  imageUrl={article.image.file_path}
                />
              </div>
            ))}
          </div>
        </div>

        <div className=" flex flex-col gap-3">
          {lastArticles?.map((article: any, index: number) => (
            <div key={index}>
              <NewsCard
                title={article.title}
                date={article.createdAt}
                category={article.category.name}
                description={article.description}
                author={article.author.full_name}
                imageUrl={article.image.file_path}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePageCardClient;
