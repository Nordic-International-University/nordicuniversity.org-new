"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { doctorateProps } from "@/types/templates/doctorate.types";
import DoctorateTable from "@/app/components/UI/doctorate.table";

const Doctorate = ({
  allDDoctorateField,
  allDoctorateCount,
}: doctorateProps) => {
  const t = useTranslations("research.doctorate").raw;

  return (
    <section>
      <article className="mt-5">
        <div className="flex items-start max-lg:flex-col-reverse justify-between gap-5">
          <div className="w-1/2 max-lg:w-full">
            <h2 className="text-text_secondary font-semibold text-xl">
              {t("main_title")}
            </h2>
            <p className="mt-3">{t("description")}</p>
            <ul className="mt-4">
              {allDDoctorateField.reverse().map((item) => (
                <li className="font-semibold">
                  {item.code} - {item.name}
                </li>
              ))}
            </ul>
          </div>
          <Image
            className="w-1/2 max-lg:w-full"
            width={1000}
            height={1000}
            src="/images/research-images/doctorate.jpg"
            alt="doctorate"
          />
        </div>
        <div className="mt-10">
          <h2 className="text-center text-text_secondary font-semibold text-xl">
            {t("center_title")}
          </h2>
          <DoctorateTable allDoctorateCount={allDoctorateCount} />
          <p
            className="mt-5"
            dangerouslySetInnerHTML={{ __html: t("bottom_title") }}
          ></p>
        </div>
      </article>
    </section>
  );
};

export default Doctorate;
