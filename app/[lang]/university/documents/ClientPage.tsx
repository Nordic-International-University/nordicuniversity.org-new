"use client";

import React from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import Litsenziya from "@/app/components/templates/home/Litsenziya";
import litsenziya from "@/public/images/home-images/litsenziya.png";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("university.document");

  const subItems = [
    {
      name: t("subItems.0"),
      url: "/university/advantages",
    },
    {
      name: t("subItems.1"),
      url: "/university/documents",
    },
    {
      name: t("subItems.2"),
      url: "/university/advantages",
    },
    {
      name: t("subItems.3"),
      url: "/university/advantages",
    },

    {
      name: t("subItems.4"),
      url: "/university/advantages",
    },
  ];

  const brodCmbItems = [
    {
      url: "",
      name: t("university"),
    },
    {
      url: "/university/documents",
      name: t("section_title"),
    },
  ];

  return (
    <LeftSidebarAndComponent
      broadCampItems={brodCmbItems}
      children={<Litsenziya props={litsenziyarray} sectionTitle="" />}
      sidebarItems={subItems}
      sidebarTitle="Meyoriy hujjatlar"
    ></LeftSidebarAndComponent>
  );
};

export default ClientPage;
