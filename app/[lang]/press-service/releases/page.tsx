import React from "react";
import ClientPage from "@/app/[lang]/press-service/releases/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { getAllReleases } from "@/app/[lang]/press-service/releases/getAllReleases";

const Page = async () => {
  const data = await getAllReleases({
    page: "1",
    limit: "9",
    lang: await getCurrentLangServer(),
  });

  return <ClientPage props={data} />;
};

export default Page;
