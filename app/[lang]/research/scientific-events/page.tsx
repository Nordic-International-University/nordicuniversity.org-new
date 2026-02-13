import React from "react";
import ClientPage from "@/app/[lang]/research/scientific-events/ClientPage";
import { getAllEvents } from "@/app/[lang]/research/scientific-events/getAllEvents";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Ilmiy tadbirlar - Xalqaro Nordik Universiteti",
    description:
      "Xalqaro Nordik Universiteti tomonidan tashkil etilgan ilmiy tadbirlar haqida to'liq ma'lumot: professorlar va talabalar uchun imkoniyatlar.",
    lang: params.lang,
    path: "/research/scientific-events",
  });
}

const Page = async () => {
  const lang = await getCurrentLangServer();
  const data = await getAllEvents(lang, "EVENTS", 1, 100, "past");
  return <ClientPage initialData={data} />;
};

export default Page;
