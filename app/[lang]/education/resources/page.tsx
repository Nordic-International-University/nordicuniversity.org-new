import React from "react";
import ClientPage from "@/app/[lang]/education/resources/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";

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
