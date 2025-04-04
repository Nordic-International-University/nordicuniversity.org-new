import React from "react";
import ClientPage from "@/app/[lang]/press-service/audio-books/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { getAllAudioTypes } from "@/app/[lang]/press-service/audio-books/api";

const Page = async () => {
  const lang = await getCurrentLangServer();
  const data = await getAllAudioTypes({ lang });

  return <ClientPage initialData={data} />;
};

export default Page;
