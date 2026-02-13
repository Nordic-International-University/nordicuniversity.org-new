import React from "react";
import ClientPage from "@/app/[lang]/research/scientific-conferences/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { getAllEvents } from "@/app/[lang]/research/scientific-events/getAllEvents";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Ilmiy konferensiyalar - Xalqaro Nordik Universiteti",
    description: "Xalqaro Nordik Universitetining ilmiy konferensiyalari.",
    lang: params.lang,
    path: "/research/scientific-conferences",
  });
}

const Page = async () => {
  const lang = await getCurrentLangServer();
  const data = await getAllEvents(lang, "CONFERENCES", 1, 3, "future");

  return <ClientPage initialData={data} />;
};

export default Page;
