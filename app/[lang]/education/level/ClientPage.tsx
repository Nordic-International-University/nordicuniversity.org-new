"use client";

import React, { FC } from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";
import eduImage from "@/public/images/education-image/bachelor.png";
import Level from "@/app/components/templates/education/level";
import Image from "next/image";
import { EducationLevels } from "@/types/education/educaation.types";

const ClientPage: FC<{ data: EducationLevels }> = ({ data }) => {
  const t = useTranslations("education");

  const subItemDocument = useSelector(
    (state: RootState) => state.sideBar.education.educationSidebarItems,
  );

  const brodCmbItems = [
    {
      url: "/education/level",
      name: t("educationLevels.breadcrumb"),
    },
    {
      url: "/education/level",
      name: t("educationLevels.sectionTitle"),
    },
  ];

  const getCounts = (index: number) => {
    if (index === 0) return data.bachelor.FULL_TIME;
    if (index === 1) return data.master;
    return data.doctorate;
  };

  return (
    <>
      <LeftSidebarAndComponent
        translationKey="education"
        broadCampItems={brodCmbItems}
        sidebarItems={subItemDocument}
        sidebarTitle={t("educationLevels.sectionTitle")}
      >
        <Level fieldCount={data} />
      </LeftSidebarAndComponent>

      {/* Education Level Cards */}
      <div className="container">
        <div className="mt-16 max-sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-2xl bg-white border border-gray-200
                hover:border-text_secondary/30 hover:shadow-md transition-all duration-300"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-text_secondary
                scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl" />

              {/* Icon + Number */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-text_secondary/10 flex items-center justify-center">
                  <Image width={30} height={30} src={eduImage} alt="icon" />
                </div>
                <span className="text-text_secondary/40 text-4xl font-bold">
                  0{index + 1}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-text_secondary text-xl font-bold mb-3">
                {t(`educationLevels.levels.${index}.name`)}
              </h3>

              {/* Count */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                bg-gray-100 text-text_secondary text-sm font-semibold mb-4">
                <span>{getCounts(index)}</span>
                <span className="font-normal text-gray-500">yo'nalish</span>
              </div>

              {/* Description */}
              <p className="text-gray-500 text-[15px] leading-relaxed">
                {t(`educationLevels.levels.${index}.description`, {
                  count: getCounts(index),
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ClientPage;
