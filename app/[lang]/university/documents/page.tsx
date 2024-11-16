import React from "react";
import ClientPage from "@/app/[lang]/university/documents/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";

const getHome = async (lang: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/core/home-page?language=${lang}`,
  );
  return await response.json();
};

const Page = async () => {
  const { sections } = await getHome(await getCurrentLangServer());
  return <ClientPage props={sections} />;
};

export default Page;
