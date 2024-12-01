import React from "react";
import ClientPage from "@/app/[lang]/press-service/podcast/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { getAllPodcast } from "@/app/[lang]/press-service/podcast/getAllPodcast";

export const metadata = {
  title: "Podkastlar - Xalqaro Nordik Universiteti",
  description:
    "Xalqaro Nordik Universitetining eng so'nggi podkastlarini tinglang. Universitetimizdagi so'nggi muhim mavzular, tadbirlar va intervyular haqida bilib oling.",
  keywords: [
    "Podkastlar",
    "Xalqaro Nordik Universiteti podkastlari",
    "Universitet podkastlari",
    "Xalqaro universitet podkastlari",
    "Tinglash",
  ],
  openGraph: {
    title: "Podkastlar - Xalqaro Nordik Universiteti",
    description:
      "Xalqaro Nordik Universitetining eng so'nggi podkastlarini tinglang. Universitetimizdagi so'nggi muhim mavzular, tadbirlar va intervyular haqida bilib oling.",
    url: "https://nordicuniversity.org/press-service/podcast",
    type: "website",
  },
};

const Page = async () => {
  const data = await getAllPodcast({
    page: "1",
    limit: "4",
    lang: await getCurrentLangServer(),
  });

  return <ClientPage props={data} />;
};

export default Page;
