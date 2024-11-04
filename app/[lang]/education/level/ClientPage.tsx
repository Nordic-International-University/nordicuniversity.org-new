"use client";

import React from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";
import eduImage from "@/public/images/education-image/bachelor.png";
import Level from "@/app/components/templates/education/level";
import Image from "next/image";

const ClientPage = () => {
  const t = useTranslations("education");

  const subItemDocument = useSelector(
    (state: RootState) => state.sideBar.education.educationSidebarItems,
  );

  const brodCmbItems = [
    {
      url: "",
      name: t("educationLevels.breadcrumb"),
    },
    {
      url: "/university/documents",
      name: t("educationLevels.sectionTitle"),
    },
  ];

  return (
    <>
      <LeftSidebarAndComponent
        translationKey="education"
        broadCampItems={brodCmbItems}
        sidebarItems={subItemDocument}
        sidebarTitle={t("educationLevels.sectionTitle")}
      >
        <Level />
      </LeftSidebarAndComponent>
      <div className="container">
        <div className="mt-[70px] max-sm:mt-10 max-lg:flex-col gap-4 flex items-center justify-between">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index}>
              <div className="flex items-center gap-2">
                <Image width={45} height={45} src={eduImage} alt="image" />
                <h2 className="text-tertiary text-2xl font-semibold">
                  {t("educationLevels.levels." + index + ".name")}
                </h2>
              </div>
              <p className="pt-3 text-[#7A98C1]">
                {t("educationLevels.levels." + index + ".description")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ClientPage;
