import React from "react";
import ClientPage from "@/app/[lang]/university/year-end-review/ClientPage";
import { annualsItem } from "@/types/templates/annuals_and_review.types";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Yillik hisobot - Nordik Xalqaro Universiteti",
    description: "Nordik Xalqaro Universitetining yillik hisoboti.",
    lang: params.lang,
    path: "/university/year-end-review",
  });
}

const getAnnuals = async (): Promise<annualsItem[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/university/annual-review?language=${await getCurrentLangServer()}`,
  );
  return response.json();
};

const Page = async () => {
  const allAnnuals: annualsItem[] = await getAnnuals();

  return <ClientPage allAnnuals={allAnnuals} />;
};

export default Page;
