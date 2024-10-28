import React from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import Litsenziya from "@/app/components/templates/home/Litsenziya";
import { useTranslations } from "next-intl";
import EducationDegree from "@/app/components/templates/education/educationDegree";

const Page = () => {
  const t = useTranslations("education");

  const subItems = [
    {
      name: t("subItems.0"),
      url: "/education/educationDegree",
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
  ];

  const brodCmbItems = [
    {
      url: "",
      name: t("talim"),
    },
    {
      url: "/university/documents",
      name: t("educationDegree.sectionTitle"),
    },
  ];
  return (
    <div>
      <LeftSidebarAndComponent
        broadCampItems={brodCmbItems}
        children={<EducationDegree />}
        sidebarItems={subItems}
        sidebarTitle={t("educationDegree.sectionTitle")}
      ></LeftSidebarAndComponent>
    </div>
  );
};

export default Page;
