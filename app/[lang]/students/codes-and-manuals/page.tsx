import React from "react";
import ClientPage from "@/app/[lang]/students/codes-and-manuals/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { getAllCodesAndManuals } from "@/app/[lang]/students/codes-and-manuals/getAllJournal";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Talabalar uchun kodeks va qo'llanmalar - Xalqaro Nordik Universiteti",
    description:
      "Xalqaro Nordik Universiteti talabalari uchun kodekslar va qo'llanmalar to'plami. Talabalarimizga kerakli hujjatlar va qo'llanmalarga oson kirish imkoniyatini taqdim etamiz.",
    lang: params.lang,
    path: "/students/codes-and-manuals",
  });
}

const Page = async () => {
  const data = await getAllCodesAndManuals({
    page: "1",
    limit: "1000",
    lang: await getCurrentLangServer(),
  });

  return <ClientPage props={data} />;
};

export default Page;
