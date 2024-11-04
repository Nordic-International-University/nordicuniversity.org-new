"use client";

import React from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import Litsenziya from "@/app/components/templates/home/Litsenziya";
import litsenziya from "@/public/images/home-images/litsenziya.png";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";

const litsenziyarray: any = [
  {
    image: litsenziya,
    alt: "litsenziya",
  },
  {
    image: litsenziya,
    alt: "litsenziya",
  },
  {
    image: litsenziya,
    alt: "litsenziya",
  },
  {
    image: litsenziya,
    alt: "litsenziya",
  },
];

const ClientPage = () => {
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
      name: t("document.section_title"),
    },
  ];

  return (
    <LeftSidebarAndComponent
      broadCampItems={brodCmbItems}
      children={<Litsenziya props={litsenziyarray} sectionTitle="" />}
      sidebarItems={subItemDocument}
      translationKey="university"
      sidebarTitle="Meyoriy hujjatlar"
    ></LeftSidebarAndComponent>
  );
};

export default ClientPage;
