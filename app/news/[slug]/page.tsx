import React from "react";
import { newsProps } from "@/types/news.types";
import Page2 from "@/app/news/[slug]/newsClientPage";

const getNewsBySlug = async (slug: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/news?slug=${slug}&lang=uz`,
    );
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  } catch (error) {
    console.error("Error fetching news:", error);
    return null;
  }
};

const page = async (params: newsProps) => {
  const singleNews = await getNewsBySlug(params?.params?.slug);

  return <Page2 singleNews={singleNews} />;
};

export default page;
