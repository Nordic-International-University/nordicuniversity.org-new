"use client";

import React from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";
import ExaminationProcedures from "@/app/components/templates/students/examination-procedures";
import { ItemImage } from "@/types/students/students.types";

const ClientPage = ({ data }: { data: Array<ItemImage> }) => {
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
      name: t("exam.sectionTitle"),
    },
  ];

  return (
    <LeftSidebarAndComponent
      translationKey="student"
      broadCampItems={brodCmbItems}
      sidebarItems={subItemDocument}
      sidebarTitle={t("exam.sectionTitle")}
    >
      <ExaminationProcedures data={data} />
    </LeftSidebarAndComponent>
  );
};

export default ClientPage;
