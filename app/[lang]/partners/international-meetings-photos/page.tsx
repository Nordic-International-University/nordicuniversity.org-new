import React from "react";
import ClientPage from "@/app/[lang]/partners/international-meetings-photos/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { getALlPartnersAlbums } from "@/app/[lang]/partners/international-meetings-photos/getAllJournal";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Xalqaro uchrashuvlar fotojamlanmasi - Xalqaro Nordik Universiteti",
    description: "Xalqaro Nordik Universitetining xalqaro uchrashuvlar fotojamlanmasi.",
    lang: params.lang,
    path: "/partners/international-meetings-photos",
  });
}

const Page = async () => {
  const data = await getALlPartnersAlbums({
    page: "1",
    limit: "6",
    lang: await getCurrentLangServer(),
  });

  return <ClientPage props={data} />;
};

export default Page;
