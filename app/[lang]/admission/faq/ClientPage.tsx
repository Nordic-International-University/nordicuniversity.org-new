"use client";

import React from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";
import Faq from "@/app/components/templates/admission/faq";

const ClientPage = ({ data }: { data: any }) => {
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
      children={<Faq data={data.data} />}
      sidebarItems={subItemDocument}
      sidebarTitle={t("admission_process.sectionTitle")}
    ></LeftSidebarAndComponent>
  );
};

export default ClientPage;
