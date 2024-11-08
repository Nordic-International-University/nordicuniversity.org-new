"use client";

import React from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";
import WorkAndTravel from "@/app/components/templates/students/workAndTravel";

const ClientPage = () => {
  const t = useTranslations("student");
  const subItemDocument = useSelector(
    (state: RootState) => state.sideBar.students.studentsSidebarItems,
  );

  const brodCmbItems = [
    {
      url: "",
      name: t("title"),
    },
    {
      url: "/university/documents",
      name: t("Work_and_travel.sectionTitle"),
    },
  ];

  return (
    <LeftSidebarAndComponent
      translationKey="student"
      broadCampItems={brodCmbItems}
      sidebarItems={subItemDocument}
      sidebarTitle={t("Work_and_travel.sectionTitle")}
    >
      <WorkAndTravel />
    </LeftSidebarAndComponent>
  );
};

export default ClientPage;
