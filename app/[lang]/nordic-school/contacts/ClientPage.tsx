"use client";

import React from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import { RootState } from "@/app/utils/store/Store";
import { useSelector } from "react-redux";
import Contacts from "@/app/components/templates/nordik-school/contatcs";
import { ContactInfo } from "@/types/templates/contacts.types";

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
      url: "",
      name: t("subItems.2"),
    },
  ];
  return (
    <LeftSidebarAndComponent
      translationKey="nordic_school"
      broadCampItems={brodCmbItems}
      children={<Contacts />}
      sidebarItems={subItemDocument}
      sidebarTitle={t("title")}
    ></LeftSidebarAndComponent>
  );
};

export default ClientPage;
