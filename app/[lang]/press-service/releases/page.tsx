import React from "react";
import ClientPage from "@/app/[lang]/press-service/releases/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { getAllReleases } from "@/app/[lang]/press-service/releases/getAllReleases";

export const metadata = {
  title: "Press Relizlar - Xalqaro Nordik Universiteti",
  description:
    "Xalqaro Nordik Universitetining so'nggi press relizlari. Universitetimizdagi yangiliklar va muhim tadbirlar haqida bilib oling.",
  keywords: [
    "Press relizlar",
    "Xalqaro Nordik Universiteti press relizlari",
    "Universitet press relizlari",
    "Yangiliklar",
    "Xalqaro universitet yangiliklari",
  ],
  openGraph: {
    title: "Press Relizlar - Xalqaro Nordik Universiteti",
    description:
      "Xalqaro Nordik Universitetining so'nggi press relizlari. Universitetimizdagi yangiliklar va muhim tadbirlar haqida bilib oling.",
    url: "https://nordicuniversity.org/press-service/releases",
    type: "website",
  },
};

const Page = async () => {
  const data = await getAllReleases({
    page: "1",
    limit: "9",
    lang: await getCurrentLangServer(),
  });

  return <ClientPage props={data} />;
};

export default Page;
