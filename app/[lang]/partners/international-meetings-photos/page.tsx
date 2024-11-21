import React from "react";
import ClientPage from "@/app/[lang]/partners/international-meetings-photos/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { getALlPartnersAlbums } from "@/app/[lang]/partners/international-meetings-photos/getAllJournal";

const Page = async () => {
  const data = await getALlPartnersAlbums({
    page: "1",
    limit: "6",
    lang: await getCurrentLangServer(),
  });

  return <ClientPage props={data} />;
};

export default Page;
