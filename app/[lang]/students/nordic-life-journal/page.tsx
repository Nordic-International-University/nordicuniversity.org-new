import React from "react";
import ClientPage from "@/app/[lang]/students/nordic-life-journal/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { getLiveJournals } from "@/app/[lang]/students/nordic-life-journal/getAllJournal";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Nordik Life jurnal - Xalqaro Nordik Universiteti",
    description:
      "Xalqaro Nordik Universiteti talabalari uchun Nordik Life jurnalida universitetdagi hayot, tajribalar va talabalik yillari haqida maqolalar va voqealar.",
    lang: params.lang,
    path: "/students/nordic-life-journal",
  });
}

const Page = async () => {
  const data = await getLiveJournals({
    page: "1",
    limit: "1000",
    lang: await getCurrentLangServer(),
  });

  return <ClientPage props={data} />;
};

export default Page;
