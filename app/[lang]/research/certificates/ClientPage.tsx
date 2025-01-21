"use client";

import React from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";
import { nordicLiveJournalProps } from "@/types/templates/nordiklieve.types";
import Patents from "@/app/components/templates/university/patents";

const ClientPage = ({ props }: { props: nordicLiveJournalProps[] }) => {
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
      url: "/research/patents",
      name: t("subItems.6"),
    },
  ];

  return (
    <LeftSidebarAndComponent
      broadCampItems={brodCmbItems}
      sidebarItems={subItemDocument}
      translationKey="research"
      sidebarTitle={t("subItems.6")}
    >
      <Patents buttonText="PDF" props={props} />
    </LeftSidebarAndComponent>
  );
};

export default ClientPage;
