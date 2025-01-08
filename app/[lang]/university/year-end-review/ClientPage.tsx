"use client";

import React, { FC } from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import { RootState } from "@/app/utils/store/Store";
import { useSelector } from "react-redux";
import YearEndReview from "@/app/components/templates/university/year_end_review";
import { annualsItem } from "@/types/templates/annuals_and_review.types";

const ClientPage: FC<{ allAnnuals: annualsItem[] }> = ({ allAnnuals }) => {
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
      <YearEndReview allAnnuals={allAnnuals} />
    </LeftSidebarAndComponent>
  );
};

export default ClientPage;
