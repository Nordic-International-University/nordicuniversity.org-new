"use client";

import React from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import Litsenziya from "@/app/components/templates/home/Litsenziya";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";
import { SectionTypeEnum } from "@/types/home/home.megaMenu.types";

const ClientPage = ({ props }: any) => {
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
      url: "/university/documents",
      name: t("document.subItems.5"),
    },
  ];

  return (
    <LeftSidebarAndComponent
      broadCampItems={brodCmbItems}
      children={
        <Litsenziya
          props={props[SectionTypeEnum.NORMATIVE_DOCUMENTATION].data}
          sectionTitle={""}
        />
      }
      sidebarItems={subItemDocument}
      translationKey="university.document"
      sidebarTitle={props[SectionTypeEnum.NORMATIVE_DOCUMENTATION].title}
    ></LeftSidebarAndComponent>
  );
};

export default ClientPage;
