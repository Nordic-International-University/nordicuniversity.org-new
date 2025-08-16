"use client";

import React from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";
import NordicWay from "@/app/components/templates/university/nordic-way";

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
      url: "",
      name: t("document.subItems.6"),
    },
  ];

  return (
    <LeftSidebarAndComponent
      translationKey="university.document"
      broadCampItems={brodCmbItems}
      children={<NordicWay />}
      sidebarItems={subItemDocument}
      sidebarTitle={t("advantages.section_title")}
    ></LeftSidebarAndComponent>
  );
};

export default ClientPage;
