import React from "react";
import ClientPage from "@/app/[lang]/university/patents/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { nordicLiveJournalProps } from "@/types/templates/nordiklieve.types";

const getPatents = async (lang: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/university/patents?language=${lang}`,
  );
  return await response.json();
};

const Page = async () => {
  const data: nordicLiveJournalProps[] = await getPatents(
    await getCurrentLangServer(),
  );
  return <ClientPage props={data} />;
};

export default Page;
