import React from "react";
import ClientPage from "@/app/[lang]/research/patents/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import {
  nordicLife,
  nordicLiveJournalProps,
} from "@/types/templates/nordiklieve.types";
import { getPatents } from "@/app/[lang]/research/patents/api";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Patentlar - Xalqaro Nordik Universiteti",
    description: "Xalqaro Nordik Universitetining patentlari.",
    lang: params.lang,
    path: "/research/patents",
  });
}

const Page = async () => {
  const data: nordicLife<nordicLiveJournalProps> = await getPatents(
    await getCurrentLangServer(),
    1,
    6,
  );
  return <ClientPage props={data} />;
};

export default Page;
