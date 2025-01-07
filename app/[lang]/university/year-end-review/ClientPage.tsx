"use client";

import React from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import { RootState } from "@/app/utils/store/Store";
import { useSelector } from "react-redux";
import YearEndReview from "@/app/components/templates/university/year_end_review";

const ClientPage = () => {
  const tDoc = useTranslations("university.document");
  const t = useTranslations("university.year_end_review");
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
      translationKey="university.document"
      broadCampItems={brodCmbItems}
      sidebarItems={subItemDocument}
      sidebarTitle={t("sectionName")}
    >
      <YearEndReview />
    </LeftSidebarAndComponent>
  );
};

export default ClientPage;
