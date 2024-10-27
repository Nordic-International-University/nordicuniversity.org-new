"use client";

import React from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import Structure from "@/app/components/templates/University/structure";

const ClientPage = () => {
  const t = useTranslations("university.document");

  const subItems = [
    {
      name: t("subItems.0"),
      url: "/university/advantages",
    },
    {
      name: t("subItems.1"),
      url: "/university/documents",
    },
    {
      name: t("subItems.2"),
      url: "/university/advantages",
    },
    {
      name: t("subItems.3"),
      url: "/university/advantages",
    },

    {
      name: t("subItems.4"),
      url: "/university/advantages",
    },
  ];

  const brodCmbItems = [
    {
      url: "",
      name: t("university"),
    },
    {
      url: "/university/documents",
      name: t("section_title"),
    },
  ];

  return (
    <LeftSidebarAndComponent
      broadCampItems={brodCmbItems}
      children={<Structure />}
      sidebarItems={subItems}
      sidebarTitle="Meyoriy hujjatlar"
    ></LeftSidebarAndComponent>
  );
};

export default ClientPage;
