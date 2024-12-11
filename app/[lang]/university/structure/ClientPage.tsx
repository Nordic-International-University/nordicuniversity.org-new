"use client";

import React, { useEffect, useState } from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import Structure from "@/app/components/templates/university/structure";
import { RootState } from "@/app/utils/store/Store";
import { useSelector } from "react-redux";
import {
  SectionType,
  structureBySLug,
  structureByType,
  UniversitySection,
} from "@/types/templates/structure.types";
import {
  getAllStructureByType,
  getAllStructuresBySlug,
} from "@/app/[lang]/university/structure/apiCalls";
import getCurrentLangClient from "@/app/helpers/getCurrentLang";

const ClientPage = ({
  props,
  structureTypeByTypeData,
}: {
  props: UniversitySection[];
  structureTypeByTypeData: structureByType[];
}) => {
  const t = useTranslations("university");
  const subItemsDocument = useSelector(
    (state: RootState) => state.sideBar.university.documentsSidebarItem,
  );
  const [data, setData] = useState<structureByType[]>(structureTypeByTypeData);
  const [_, setContent] = useState<structureBySLug[]>([]);
  const [structureButtonData, setStructureButtonData] = useState<string>("");
  const [selectedStructureType, setSelectedStructureType] = useState(
    SectionType.RECTORATE,
  );

  useEffect(() => {
    const fetchData = async () => {
      const result: any = await getAllStructureByType(
        getCurrentLangClient(),
        selectedStructureType,
      );
      setData(result);
      if (result.length > 0) {
        setStructureButtonData(result[0].slug);
      }
    };

    fetchData();
  }, [selectedStructureType]);

  useEffect(() => {
    if (structureButtonData) {
      const fetchData = async () => {
        const result: any = await getAllStructuresBySlug(
          getCurrentLangClient(),
          structureButtonData,
        );
        setContent(result);
      };

      fetchData();
    }
  }, [structureButtonData]);

  const breadcrumbItems = [
    {
      url: "/university/advantages",
      name: t("document.university"),
    },
    {
      url: "/university/structure",
      name: t("structure.sectionName"),
    },
  ];

  return (
    <LeftSidebarAndComponent
      translationKey="university.document"
      broadCampItems={breadcrumbItems}
      sidebarItems={subItemsDocument}
      sidebarTitle={t("structure.sectionName")}
    >
      <Structure
        structureButtonData={structureButtonData}
        setStructureButtonData={setStructureButtonData}
        selectedStructureType={selectedStructureType}
        data={props}
        handleChangeStructure={setSelectedStructureType}
        structureTypeData={data}
      />
    </LeftSidebarAndComponent>
  );
};

export default ClientPage;
