import React from "react";
import ClientPage from "@/app/[lang]/research/certificates/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import {
  nordicLife,
  nordicLiveJournalProps,
} from "@/types/templates/nordiklieve.types";
import { getPatents } from "@/app/[lang]/research/certificates/api";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Ilmiy sertifikatlar - Xalqaro Nordik Universiteti",
    description: "Xalqaro Nordik Universitetining ilmiy sertifikatlari.",
    lang: params.lang,
    path: "/research/certificates",
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
