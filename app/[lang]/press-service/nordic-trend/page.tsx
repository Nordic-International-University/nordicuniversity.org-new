import React from "react";
import ClientPage from "@/app/[lang]/press-service/nordic-trend/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import {
  getALlTrends,
  VideoResponse,
} from "@/app/[lang]/press-service/nordic-trend/getAllReleases";

const Page = async () => {
  const data: VideoResponse = await getALlTrends({
    page: "1",
    limit: "50",
    lang: await getCurrentLangServer(),
  });

  return <ClientPage props={data} />;
};

export default Page;
