import React from "react";
import ClientPage from "@/app/[lang]/education/resources/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";

export const metadata = {
  title: "Ta'lim resurslari - Xalqaro Nordik Universiteti",
  description:
    "Xalqaro Nordik Universitetining ta'lim resurslari bo'yicha to'liq ma’lumot. Dars jadvali, o'quv dasturlari va boshqa foydali ta'lim manbalariga osongina kirish imkoniyati.",
  keywords: [
    "Ta'lim resurslari",
    "Dars jadvali",
    "O'quv dasturlari",
    "Ta'lim manbalari",
    "Universitet resurslari",
    "Online o'quv materiallari",
    "Ta'lim vositalari",
    "Dars materiallari",
    "Xalqaro Nordik Universiteti",
    "Resurslar va vositalar",
    "O'quv materiallari",
    "Universitet xizmatlari",
    "Akademik resurslar",
  ],
  openGraph: {
    title: "Ta'lim resurslari - Xalqaro Nordik Universiteti",
    description:
      "Xalqaro Nordik Universitetining ta'lim resurslari bo'yicha to'liq ma’lumot. Dars jadvali, o'quv dasturlari va boshqa foydali ta'lim manbalariga osongina kirish imkoniyati.",
    url: "https://nordicuniversity.org/education/resources",
    type: "website",
  },
};

const getALlResources = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/education/resources?language=${await getCurrentLangServer()}`,
    {
      cache: "no-cache",
    },
  );

  const json = response.json();
  return json;
};

const Page = async () => {
  const resources = await getALlResources();

  return <ClientPage data={resources} />;
};

export default Page;
