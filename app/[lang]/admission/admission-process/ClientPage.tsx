"use client";

import React from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";
import AdmissionProcess from "@/app/components/templates/admission/admission_process";
import { Faq } from "@/types/admission/faq.types";

const ClientPage = ({ data }: { data: Array<Faq> }) => {
  const t = useTranslations("admission");
  const subItemDocument = useSelector(
    (state: RootState) => state.sideBar.admission.admissionSidebarItems,
  );

  const brodCmbItems = [
    {
      url: "",
      name: t("title"),
    },
    {
      url: "/university/documents",
      name: t("admission_process.sectionTitle"),
    },
  ];

  return (
    <LeftSidebarAndComponent
      translationKey="admission"
      broadCampItems={brodCmbItems}
      children={<AdmissionProcess />}
      sidebarItems={subItemDocument}
      sidebarTitle={t("admission_process.sectionTitle")}
    ></LeftSidebarAndComponent>
  );
};

export default ClientPage;