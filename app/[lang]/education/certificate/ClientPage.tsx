"use client";

import React from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";
import Certificate from "@/app/components/templates/education/certificate";

const ClientPage = () => {
  const t = useTranslations("education");
  const subItemDocument = useSelector(
    (state: RootState) => state.sideBar.education.educationSidebarItems,
  );

  const brodCmbItems = [
    {
      url: "/education/level",
      name: t("educationLevels.breadcrumb"),
    },
    {
      url: "/university/certificate",
      name: t("certificate.sectionTitle"),
    },
  ];

  return (
    <>
      <LeftSidebarAndComponent
        translationKey="education"
        broadCampItems={brodCmbItems}
        sidebarItems={subItemDocument}
        sidebarTitle={t("certificate.sectionTitle")}
      >
        <Certificate />
      </LeftSidebarAndComponent>
    </>
  );
};

export default ClientPage;
