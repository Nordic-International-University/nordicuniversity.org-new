import React from "react";
import ClientPage from "@/app/[lang]/students/albums/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { getAllAlbums } from "@/app/[lang]/students/albums/getAllAlbums";

const Page = async () => {
  const data = await getAllAlbums({
    page: "1",
    limit: "9",
    lang: await getCurrentLangServer(),
  });

  return <ClientPage props={data} />;
};

export default Page;
