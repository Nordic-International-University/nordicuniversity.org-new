"use client";

import React from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import { RootState } from "@/app/utils/store/Store";
import { useSelector } from "react-redux";
import Contacts from "@/app/components/templates/university/contacts";
import { ContactInfo } from "@/types/templates/contacts.types";

const ClientPage = ({ props }: { props: ContactInfo | any }) => {
  const tDoc = useTranslations("university.document");
  const t = useTranslations("university.contacts");
  const subItemDocument = useSelector(
    (state: RootState) => state.sideBar.university.documentsSidebarItem,
  );

  const brodCmbItems = [
    {
      url: "",
      name: tDoc("university"),
    },
    {
      url: "/university/contacts",
      name: t("sectionTitle"),
    },
  ];

  return (
    <LeftSidebarAndComponent
      translationKey="university.document"
      broadCampItems={brodCmbItems}
      children={<Contacts props={props} />}
      sidebarItems={subItemDocument}
      sidebarTitle={t("sectionTitle")}
    ></LeftSidebarAndComponent>
  );
};

export default ClientPage;
