import React, { FC, ReactNode } from "react";
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
