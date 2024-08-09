import React, { useEffect } from "react";
import ArticleCard from "@/app/components/Cards/ArticleCard";
import NewsCard from "@/app/components/Cards/NewsCard";
import BigArticlesCard from "@/app/components/Cards/BigArticlesCard";
import RoundedSvg from "@/app/components/helpers/RoundeSvg";
import Image from "next/image";
import arrowImage from "@/public/Arrow 1.svg";
import Link from "next/link";

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
      <div
        className={
          "flex justify-between w-full mt-5 gap-5 items-start  max-lg:block"
        }
      >
        <div className=" flex-col flex gap-5 first:gap-3 max-lg:block ">
          <div className="">
            {" "}
            <RoundedSvg title="Maqolalar" />
          </div>
          <div className={"flex  gap-5 max-md:flex-col max-lg:mb-4"}>
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
          <div
            className={
              "grid grid-cols-2 gap-3 w-full max-md:grid-cols-1 max-sm:gap-3"
            }
          >
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
          <Link href={"/"}>
            <div className=" w-full flex justify-between bg-[#BEC2CF40] rounded-r-3xl rounded-s-lg-3xl h-[50px] items-center mt-3">
              <h1 className="ml-3">Ko'proq Maqolalar</h1>
              <Image src={arrowImage} alt="" className="mr-5" />
            </div>
          </Link>
        </div>
        <div>
          <div className=" flex flex-col gap-3">
            <RoundedSvg title="Yangiliklar" />
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
            <Link href={"/"}>
              <div className=" w-full flex justify-between bg-[#BEC2CF40] rounded-r-3xl rounded-s-lg-3xl h-[50px] items-center mt-3">
                <h1 className="ml-3">Ko'proq Yangiliklar</h1>
                <Image src={arrowImage} alt="" className="mr-5" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePageCardClient;
