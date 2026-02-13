import React from "react";
import ClientPage from "@/app/[lang]/education/resources/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Ta'lim resurslari - Xalqaro Nordik Universiteti",
    description:
      "Xalqaro Nordik Universitetining ta'lim resurslari bo'yicha to'liq ma'lumot. Dars jadvali, o'quv dasturlari va boshqa foydali ta'lim manbalariga osongina kirish imkoniyati.",
    lang: params.lang,
    path: "/education/resources",
  });
}

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
