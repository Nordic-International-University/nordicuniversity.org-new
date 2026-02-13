import React from "react";
import ClientPage from "@/app/[lang]/press-service/podcast/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { getAllPodcast } from "@/app/[lang]/press-service/podcast/getAllPodcast";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Podkastlar - Xalqaro Nordik Universiteti",
    description:
      "Xalqaro Nordik Universitetining eng so'nggi podkastlarini tinglang. Universitetimizdagi so'nggi muhim mavzular, tadbirlar va intervyular haqida bilib oling.",
    lang: params.lang,
    path: "/press-service/podcast",
  });
}

const Page = async () => {
  const data = await getAllPodcast({
    page: "1",
    limit: "4",
    lang: await getCurrentLangServer(),
  });

  return <ClientPage props={data} />;
};

export default Page;
