import React from "react";
import ClientPage from "@/app/[lang]/press-service/nordic-trend/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import {
  getALlTrends,
  VideoResponse,
} from "@/app/[lang]/press-service/nordic-trend/getAllReleases";

export const metadata = {
  title: "Nordic Trend - Xalqaro Nordik Universiteti",
  description:
    "Xalqaro Nordik Universitetining eng so'nggi nordic trend videolarini tomosha qiling. Universitetdagi trendlarni va yangiliklarni kuzatib boring.",
  keywords: [
    "Nordic Trend",
    "Xalqaro Nordik Universiteti trendlari",
    "Universitet videolari",
    "Nordic trendlar",
    "Universitet yangiliklari",
  ],
  openGraph: {
    title: "Nordic Trend - Xalqaro Nordik Universiteti",
    description:
      "Xalqaro Nordik Universitetining eng so'nggi nordic trend videolarini tomosha qiling. Universitetdagi trendlarni va yangiliklarni kuzatib boring.",
    url: "https://nordicuniversity.org/press-service/nordic-trend",
    type: "website",
  },
};

const Page = async () => {
  const data: VideoResponse = await getALlTrends({
    page: "1",
    limit: "50",
    lang: await getCurrentLangServer(),
  });

  return <ClientPage props={data} />;
};

export default Page;
