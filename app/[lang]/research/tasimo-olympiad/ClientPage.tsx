"use client";

import React from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";
import TasimoOlympiad from "@/app/components/templates/research/tasimo-olympiad";

const ClientPage = () => {
  const t = useTranslations("research");
  const subItemDocument = useSelector(
    (state: RootState) => state.sideBar.university.researchSidebarItems,
  );

  const brodCmbItems = [
    {
      url: "",
      name: t("title"),
    },
    {
      url: "/research/tasimo-olympiad",
      name: t("tasimoOlympiad.breadcrumb.tasimo_olympiad"),
    },
  ];

  return (
    <LeftSidebarAndComponent
      translationKey="research"
      broadCampItems={brodCmbItems}
      sidebarItems={subItemDocument}
      sidebarTitle={t("tasimoOlympiad.breadcrumb.tasimo_olympiad")}
    >
      <TasimoOlympiad />
    </LeftSidebarAndComponent>
  );
};

export default ClientPage;
