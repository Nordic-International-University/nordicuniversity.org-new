import React from "react";
import ClientPage from "@/app/[lang]/press-service/releases/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { getAllReleases } from "@/app/[lang]/press-service/releases/getAllReleases";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Press Relizlar - Xalqaro Nordik Universiteti",
    description:
      "Xalqaro Nordik Universitetining so'nggi press relizlari. Universitetimizdagi yangiliklar va muhim tadbirlar haqida bilib oling.",
    lang: params.lang,
    path: "/press-service/releases",
  });
}

const Page = async () => {
  const data = await getAllReleases({
    page: "1",
    limit: "9",
    lang: await getCurrentLangServer(),
  });

  return <ClientPage props={data} />;
};

export default Page;
