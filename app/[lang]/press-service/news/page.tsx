import React from "react";
import ClientPage from "@/app/[lang]/press-service/news/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { getAllNews } from "@/app/[lang]/press-service/news/getAllNews";

const Page = async () => {
  const data = await getAllNews({
    page: "1",
    limit: "1000",
    lang: await getCurrentLangServer(),
  });

  return <ClientPage props={data} />;
};

export default Page;
