import React from "react";
import ClientPage from "@/app/[lang]/press-service/news/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { getAllNews } from "@/app/[lang]/press-service/news/getAllNews";

export const metadata = {
  title: "Yangiliklar - Xalqaro Nordik Universiteti",
  description:
    "Xalqaro Nordik Universitetining eng so'nggi yangiliklarini o'qing. Universitetimizdagi yirik tadbirlar, yangiliklar va muhim yangiliklardan habardor bo'ling.",
  keywords: [
    "Yangiliklar",
    "Xalqaro Nordik Universiteti yangiliklari",
    "Universitet yangiliklari",
    "Talabalar yangiliklari",
    "Universitet tadbirlari",
    "Xalqaro universitet yangiliklari",
  ],
  openGraph: {
    title: "Yangiliklar - Xalqaro Nordik Universiteti",
    description:
      "Xalqaro Nordik Universitetining eng so'nggi yangiliklarini o'qing. Universitetimizdagi yirik tadbirlar, yangiliklar va muhim yangiliklardan habardor bo'ling.",
    url: "https://nordicuniversity.org/press-service/news",
    type: "website",
  },
};

const Page = async () => {
  const data = await getAllNews({
    page: "1",
    limit: "1000",
    lang: await getCurrentLangServer(),
  });

  return <ClientPage props={data} />;
};

export default Page;
