"use client";

import React from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";
import Ejournal from "@/app/components/templates/research/ejournal";

const ClientPage = ({ data }: { data: any[] }) => {
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
      url: "/university/documents",
      name: t("eJournal.sectionTitle"),
    },
  ];

  return (
    <LeftSidebarAndComponent
      translationKey="research"
      broadCampItems={brodCmbItems}
      children={<Ejournal volumes={data} />}
      sidebarItems={subItemDocument}
      sidebarTitle={t("eJournal.sectionTitle")}
    ></LeftSidebarAndComponent>
  );
};

export default ClientPage;
