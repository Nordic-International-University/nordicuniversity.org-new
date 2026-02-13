import React from "react";
import ClientPage from "@/app/[lang]/press-service/audio-books/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { getAllAudioTypes } from "@/app/[lang]/press-service/audio-books/api";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Audio kitoblar - Xalqaro Nordik Universiteti",
    description: "Xalqaro Nordik Universitetining audio kitoblari.",
    lang: params.lang,
    path: "/press-service/audio-books",
  });
}

const Page = async () => {
  const lang = await getCurrentLangServer();
  const data = await getAllAudioTypes({ lang });

  return <ClientPage initialData={data} />;
};

export default Page;
