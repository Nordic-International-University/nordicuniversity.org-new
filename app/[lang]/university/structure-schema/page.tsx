import React from "react";
import StructureSchema from "@/app/components/templates/university/structure.schema";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import OrgChartPage from "@/app/components/templates/university/structure.schema";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Tashkiliy tuzilma sxemasi - Nordik Xalqaro Universiteti",
    description: "Nordik Xalqaro Universitetining tashkiliy tuzilma sxemasi.",
    lang: params.lang,
    path: "/university/structure-schema",
  });
}

const getAllStructuresTree = async (lang: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/university/org-structures/tree?language=uz`,
    );
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

const Page = async () => {
  const data = await getAllStructuresTree(await getCurrentLangServer());
  console.log(data);
  return <OrgChartPage data={data} />;
};

export default Page;
