"use client";

import React from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import Advantages from "@/app/components/templates/university/advantages";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";

const ClientPage = () => {
  const t = useTranslations("university");
  const subItemDocument = useSelector(
    (state: RootState) => state.sideBar.university.documentsSidebarItem,
  );

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
      translationKey="university.document"
      broadCampItems={brodCmbItems}
      children={<Advantages />}
      sidebarItems={subItemDocument}
      sidebarTitle={t("advantages.section_title")}
    ></LeftSidebarAndComponent>
  );
};

export default ClientPage;
