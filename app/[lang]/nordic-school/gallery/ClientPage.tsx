"use client";

import React from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import { RootState } from "@/app/utils/store/Store";
import { useSelector } from "react-redux";
import { ContactInfo } from "@/types/templates/contacts.types";
import About from "@/app/components/templates/nordik-school/about";
import Gallery from "@/app/components/templates/nordik-school/gallery";

const ClientPage = ({ props }: { props: ContactInfo | any }) => {
  const tDoc = useTranslations("nordic_school");
  const t = useTranslations("nordic_school");
  const subItemDocument = useSelector(
    (state: RootState) => state.sideBar.nordic_school.nordicSchoolSidebarItems,
  );

  const brodCmbItems = [
    {
      url: "",
      name: tDoc("title"),
    },
    {
      url: "/university/contacts",
      name: t("subItems.1"),
    },
  ];

  return (
    <LeftSidebarAndComponent
      translationKey="nordic_school"
      broadCampItems={brodCmbItems}
      children={<Gallery />}
      sidebarItems={subItemDocument}
      sidebarTitle={t("title")}
    ></LeftSidebarAndComponent>
  );
};

export default ClientPage;
