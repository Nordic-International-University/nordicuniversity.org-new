import React from "react";
import ClientPage from "@/app/[lang]/university/structure/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import {
  SectionType,
  structureByType,
  UniversitySection,
} from "@/types/templates/structure.types";
import {
  getAllStructureByType,
  getAllStructureTypes,
} from "@/app/[lang]/university/structure/apiCalls";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Universitetning tashkiliy tuzilmasi - Nordik Xalqaro Universiteti",
    description:
      "Nordik Xalqaro Universitetining tashkiliy tuzilmasi: rektorat, fakultetlar, bo'limlar va boshqa muhim tuzilmalarning ro'yxati va batafsil ma'lumotlar. Bizning universitetning ichki tuzilmasi haqida ma'lumot oling.",
    lang: params.lang,
    path: "/university/structure",
  });
}

const Page = async () => {
  const allStructureTypes: UniversitySection[] = await getAllStructureTypes(
    await getCurrentLangServer(),
  );
  const allStructureByTypeData: structureByType[] = await getAllStructureByType(
    await getCurrentLangServer(),
    SectionType.RECTORATE,
  );

  return (
    <ClientPage
      props={allStructureTypes}
      structureTypeByTypeData={allStructureByTypeData}
    />
  );
};

export default Page;
