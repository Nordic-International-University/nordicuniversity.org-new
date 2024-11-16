import React from "react";
import ClientPage from "@/app/[lang]/students/codes-and-manuals/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { getAllCodesAndManuals } from "@/app/[lang]/students/codes-and-manuals/getAllJournal";

const Page = async () => {
  const data = await getAllCodesAndManuals({
    page: "1",
    limit: "1000",
    lang: await getCurrentLangServer(),
  });

  return <ClientPage props={data} />;
};

export default Page;
