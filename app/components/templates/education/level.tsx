"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import image from "@/public/images/admisssion-images/admission_process.png";
import Image from "next/image";
import { EducationLevels } from "@/types/education/educaation.types";

const Level: FC<{ fieldCount: EducationLevels }> = ({ fieldCount }) => {
  const t = useTranslations("education.educationLevels");

  const stats = [
    { count: fieldCount.bachelor.FULL_TIME, label: "overview.bachelor" },
    { count: fieldCount.master, label: "overview.master" },
    { count: fieldCount.doctorate, label: "overview.doctorate" },
  ];

  return (
    <article className="mt-8">
      <div className="flex items-start max-md:flex-col-reverse gap-8 justify-between">
        <div className="flex-1">
          <h2 className="text-text_secondary text-xl font-bold">
            {t("overview.title")}
          </h2>
          <p className="text-gray-500 mt-4 text-[16px] leading-relaxed">
            {t("overview.description")}
          </p>

          {/* Stats */}
          <div className="flex flex-col gap-3 mt-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200
                  hover:border-text_secondary/20 hover:shadow-sm transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-text_secondary/10 text-text_secondary flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  {idx + 1}
                </div>
                <div
                  className="text-text_secondary text-[15px] font-medium"
                  dangerouslySetInnerHTML={{
                    __html: t(stat.label, { count: stat.count }),
                  }}
                />
              </div>
            ))}
          </div>

          <p className="text-gray-500 mt-5 text-[15px] leading-relaxed">
            {t("overview.demand")}
          </p>
        </div>

        <Image
          className="h-72 w-auto rounded-xl max-md:w-full max-md:h-auto"
          src={image}
          alt="Ta'lim darajalari"
        />
      </div>
    </article>
  );
};

export default Level;
