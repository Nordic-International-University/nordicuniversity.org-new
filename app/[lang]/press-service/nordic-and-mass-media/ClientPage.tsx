"use client";

import React from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";
import Patents from "@/app/components/templates/university/patents";
import { nordicLiveJournalProps } from "@/types/templates/nordiklieve.types";

const ClientPage = ({ props }: { props: nordicLiveJournalProps[] }) => {
  const t = useTranslations("press-service");
  const subItemDocument = useSelector(
    (state: RootState) => state.sideBar.press_service.pressServiceSidebarItems,
  );

  console.log(props);
  const brodCmbItems = [
    {
      url: "",
      name: t("title"),
    },
    {
      url: "/research/certificates",
      name: t("subItems.4"),
    },
  ];

  return (
    <LeftSidebarAndComponent
      broadCampItems={brodCmbItems}
      sidebarItems={subItemDocument}
      translationKey="press-service"
      sidebarTitle={t("subItems.4")}
    >
      <Patents buttonText="PDF" props={props} />
    </LeftSidebarAndComponent>
  );
};

export default ClientPage;
