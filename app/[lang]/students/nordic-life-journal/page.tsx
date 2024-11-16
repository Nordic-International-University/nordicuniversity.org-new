import React from "react";
import ClientPage from "@/app/[lang]/students/nordic-life-journal/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { getLiveJournals } from "@/app/[lang]/students/nordic-life-journal/getAllJournal";

const Page = async () => {
  const data = await getLiveJournals({
    page: "1",
    limit: "1000",
    lang: await getCurrentLangServer(),
  });

  return <ClientPage props={data} />;
};

export default Page;
