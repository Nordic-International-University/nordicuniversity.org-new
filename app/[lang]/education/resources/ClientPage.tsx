"use client";

import React from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";
import Recourse from "@/app/components/templates/education/recourse";

const ClientPage = ({ data }: any) => {
  const t = useTranslations("education");

  const subItemDocument = useSelector(
    (state: RootState) => state.sideBar.education.educationSidebarItems,
  );

  const brodCmbItems = [
    {
      url: "",
      name: t("educationLevels.breadcrumb"),
    },
    {
      url: "/university/documents",
      name: t("recourse.sectionTitle"),
    },
  ];

  return (
    <LeftSidebarAndComponent
      translationKey="education"
      broadCampItems={brodCmbItems}
      sidebarItems={subItemDocument}
      sidebarTitle={t("educationLevels.sectionTitle")}
    >
      <Recourse props={data} />
    </LeftSidebarAndComponent>
  );
};

export default ClientPage;
