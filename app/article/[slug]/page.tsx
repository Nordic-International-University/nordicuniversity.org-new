"use client";
import { useParams } from "next/navigation";
import { useGetBySlugQuery } from "@/lib/query/article.query";
import { useEffect } from "react";
import { slugType } from "@/types/slug.types";

const ArticleDetail = () => {
  const { slug } = useParams();

  const { data }: any = useGetBySlugQuery(slug);

  return (
    <div>
      <p>{data?.description}</p>
    </div>
  );
};

export default ArticleDetail;
