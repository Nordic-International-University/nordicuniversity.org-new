import React from "react";
import ClientPage from "@/app/[lang]/press-service/nordic-and-mass-media/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import {
  nordicLife,
  nordicLiveJournalProps,
} from "@/types/templates/nordiklieve.types";
import { getAllMassMedia } from "@/app/[lang]/press-service/nordic-and-mass-media/api";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Nordik va OAV - Xalqaro Nordik Universiteti",
    description: "Xalqaro Nordik Universiteti ommaviy axborot vositalarida.",
    lang: params.lang,
    path: "/press-service/nordic-and-mass-media",
  });
}

const Page = async () => {
  const data: nordicLiveJournalProps[] = await getAllMassMedia(
    await getCurrentLangServer(),
  );
  return <ClientPage props={data} />;
};

export default Page;
