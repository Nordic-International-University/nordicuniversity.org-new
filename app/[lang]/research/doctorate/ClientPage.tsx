"use client";

import React from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";
import Doctorate from "@/app/components/templates/research/doctorate";
import { doctorateProps } from "@/types/templates/doctorate.types";

const ClientPage = ({
  allDoctorateCount,
  allDDoctorateField,
}: doctorateProps) => {
  const t = useTranslations("research");
  const subItemDocument = useSelector(
    (state: RootState) => state.sideBar.university.researchSidebarItems,
  );

  const brodCmbItems = [
    {
      url: "",
      name: t("title"),
    },
    {
      url: "/university/documents",
      name: t("subItems.0"),
    },
  ];

  return (
    <LeftSidebarAndComponent
      translationKey="research"
      broadCampItems={brodCmbItems}
      sidebarItems={subItemDocument}
      sidebarTitle={t("subItems.0")}
    >
      <Doctorate
        allDoctorateCount={allDoctorateCount}
        allDDoctorateField={allDDoctorateField}
      />
    </LeftSidebarAndComponent>
  );
};

export default ClientPage;
