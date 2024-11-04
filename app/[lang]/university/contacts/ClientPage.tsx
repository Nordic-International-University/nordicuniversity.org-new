"use client";

import React from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import Structure from "@/app/components/templates/University/structure";
import { RootState } from "@/app/utils/store/Store";
import { useSelector } from "react-redux";
import Contacts from "@/app/components/templates/University/contacts";

const ClientPage = () => {
  const tDoc = useTranslations("university.document");
  const t = useTranslations("university.requisites");
  const subItemDocument = useSelector(
    (state: RootState) => state.sideBar.university.documentsSidebarItem,
  );

  const brodCmbItems = [
    {
      url: "",
      name: tDoc("university"),
    },
    {
      url: "/university/requisites",
      name: t("sectionName"),
    },
  ];

  return (
    <LeftSidebarAndComponent
      translationKey="university"
      broadCampItems={brodCmbItems}
      children={<Contacts />}
      sidebarItems={subItemDocument}
      sidebarTitle={t("sectionName")}
    ></LeftSidebarAndComponent>
  );
};

export default ClientPage;
