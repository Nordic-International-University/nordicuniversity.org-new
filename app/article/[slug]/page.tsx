"use client";
import { useParams } from "next/navigation";
import { useGetBySlugQuery, useGetPostsQuery } from "@/lib/query/article.query";
import moment from "moment";
import Image from "next/image";
import { useEffect } from "react";
import { log } from "node:util";

const ArticleDetail = () => {
  const { slug } = useParams();

  const { data, error, isLoading } = useGetBySlugQuery(slug as string);
  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>An error occurred: {error.toString()}</p>;
  //
  // // const article = data.find((article: any) => article.slug === id);

  useEffect(() => {
    console.log(slug);
    console.log(error);
  }, []);
  return (
    <div>
      {/*{article && (*/}
      {/*  <div className="p-4 max-w-3xl mx-auto">*/}
      {/*    <h1 className="text-2xl font-bold mb-4">{article.title}</h1>*/}
      {/*    <p className="text-gray-500 text-sm mb-4">*/}
      {/*      {moment(article.date).format("YYYY-MM-DD")} - {article.author}*/}
      {/*    </p>*/}
      {/*    <Image*/}
      {/*      src={`https://journal2.nordicun.uz${article.imageUrl}`}*/}
      {/*      alt={article.title}*/}
      {/*      width={600}*/}
      {/*      height={400}*/}
      {/*      className="object-cover mb-4 rounded"*/}
      {/*    />*/}
      {/*    <p className="text-lg">{article.description}</p>*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  );
};

export default ArticleDetail;
