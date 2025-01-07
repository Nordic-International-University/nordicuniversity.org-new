"use client";

import React from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";
import { nordicLiveJournalProps } from "@/types/templates/nordiklieve.types";
import Patents from "@/app/components/templates/university/patents";

const ClientPage = ({ props }: { props: nordicLiveJournalProps[] }) => {
  const t = useTranslations("university");
  const subItemDocument = useSelector(
    (state: RootState) => state.sideBar.university.documentsSidebarItem,
  );

  const brodCmbItems = [
    {
      url: "",
      name: t("document.university"),
    },
    {
      url: "/university/patents",
      name: t("document.subItems.6"),
    },
  ];

  return (
    <LeftSidebarAndComponent
      broadCampItems={brodCmbItems}
      sidebarItems={subItemDocument}
      translationKey="university.document"
      sidebarTitle={t("document.subItems.6")}
    >
      <Patents props={props} />
    </LeftSidebarAndComponent>
  );
};

export default ClientPage;
