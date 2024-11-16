import React from "react";
import ClientPage from "@/app/[lang]/press-service/podcast/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { getAllPodcast } from "@/app/[lang]/press-service/podcast/getAllPodcast";

const Page = async () => {
  const data = await getAllPodcast({
    page: "1",
    limit: "4",
    lang: await getCurrentLangServer(),
  });

  return <ClientPage props={data} />;
};

export default Page;
