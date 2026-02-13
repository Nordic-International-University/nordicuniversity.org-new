import React from "react";
import ClientPage from "@/app/[lang]/press-service/nordic-trend/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import {
  getALlTrends,
  VideoResponse,
} from "@/app/[lang]/press-service/nordic-trend/getAllReleases";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Nordic Trend - Xalqaro Nordik Universiteti",
    description:
      "Xalqaro Nordik Universitetining eng so'nggi nordic trend videolarini tomosha qiling. Universitetdagi trendlarni va yangiliklarni kuzatib boring.",
    lang: params.lang,
    path: "/press-service/nordic-trend",
  });
}

const Page = async () => {
  const data: VideoResponse = await getALlTrends({
    page: "1",
    limit: "50",
    lang: await getCurrentLangServer(),
  });

  return <ClientPage props={data} />;
};

export default Page;
