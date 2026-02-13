import React from "react";
import ClientPage from "@/app/[lang]/press-service/news/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { getAllNews } from "@/app/[lang]/press-service/news/getAllNews";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Yangiliklar - Xalqaro Nordik Universiteti",
    description:
      "Xalqaro Nordik Universitetining eng so'nggi yangiliklarini o'qing. Universitetimizdagi yirik tadbirlar, yangiliklar va muhim yangiliklardan habardor bo'ling.",
    lang: params.lang,
    path: "/press-service/news",
  });
}

const Page = async () => {
  const data = await getAllNews({
    page: "1",
    limit: "1000",
    lang: await getCurrentLangServer(),
  });

  return <ClientPage props={data} />;
};

export default Page;
