"use client";

import React from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import Structure from "@/app/components/templates/University/structure";
import { RootState } from "@/app/utils/store/Store";
import { useSelector } from "react-redux";

const ClientPage = () => {
  const t = useTranslations("university.document");
  const subItemsDocument = useSelector(
    (state: RootState) => state.sideBar.university.documentsSidebarItem,
  );

  const breadcrumbItems = [
    {
      url: "/university",
      name: t("university"),
    },
    {
      url: "/university/documents",
      name: t("section_title"),
    },
  ];

  return (
    <LeftSidebarAndComponent
      translationKey="university"
      broadCampItems={breadcrumbItems}
      sidebarItems={subItemsDocument}
      sidebarTitle="Meyoriy hujjatlar"
    >
      <Structure />
    </LeftSidebarAndComponent>
  );
};

export default ClientPage;
