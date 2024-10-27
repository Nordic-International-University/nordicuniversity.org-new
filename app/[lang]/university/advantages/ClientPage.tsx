"use client";

import React from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import Advantages from "@/app/components/templates/University/advantages";

const ClientPage = () => {
  const t = useTranslations("university");

  const subItems = [
    {
      name: t("document.subItems.0"),
      url: "/university/advantages",
    },
    {
      name: t("document.subItems.1"),
      url: "/university/documents",
    },
    {
      name: t("document.subItems.2"),
      url: "/university/tuzilma",
    },
    {
      name: t("document.subItems.3"),
      url: "/university/tuzilma",
    },

    {
      name: t("document.subItems.4"),
      url: "/university/tuzilma",
    },
  ];

  const brodCmbItems = [
    {
      url: "",
      name: t("document.university"),
    },
    {
      url: "/university/documents",
      name: t("advantages.section_title"),
    },
  ];

  return (
    <LeftSidebarAndComponent
      broadCampItems={brodCmbItems}
      children={<Advantages />}
      sidebarItems={subItems}
      sidebarTitle={t("advantages.section_title")}
    ></LeftSidebarAndComponent>
  );
};

export default ClientPage;
