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
  useEffect(() => {
    console.log(articles, topArticles, lastArticles);
  }, []);
  return (
    <div>
      <div className="grid grid-cols-3 gap-20">
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
        {topArticles?.map((article: any, index: number) => (
          <div key={index}>
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
    </div>
  );
};

export default HomePageCardClient;
