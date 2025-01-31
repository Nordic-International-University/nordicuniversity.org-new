"use client";

import React, { FC, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";
import eduImage from "@/public/images/education-image/bachelor.png";
import Level from "@/app/components/templates/education/level";
import Image from "next/image";
import { EducationLevels } from "@/types/education/educaation.types";

gsap.registerPlugin(ScrollTrigger);

const ClientPage: FC<{ data: EducationLevels }> = ({ data }) => {
  const t = useTranslations("education");
  const animationContainerRef = useRef<HTMLDivElement>(null);

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

  // GSAP animatsiya qo'shish
  useEffect(() => {
    if (animationContainerRef.current) {
      gsap.fromTo(
        animationContainerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: animationContainerRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
          },
        },
      );
    }
  }, []);

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

      {/* Animatsiya qismi */}
      <div className="container">
        <div
          className="mt-[70px] max-sm:mt-10 max-lg:flex-col gap-4 flex items-center justify-between"
          ref={animationContainerRef}
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="w-[430px] max-md:w-full">
              <div className="flex items-center gap-2">
                <Image width={45} height={45} src={eduImage} alt="image" />
                <h2 className="text-tertiary text-2xl font-semibold">
                  {t(`educationLevels.levels.${index}.name`)}
                </h2>
              </div>
              <p className="pt-3 text-[#7A98C1]">
                {t(`educationLevels.levels.${index}.description`, {
                  count:
                    index === 0
                      ? data.bachelor.FULL_TIME
                      : index === 1
                        ? data.master
                        : data.doctorate,
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
