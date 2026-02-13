"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { doctorateProps } from "@/types/templates/doctorate.types";
import DoctorateTable from "@/app/components/UI/doctorate.table";
import { HiOutlineAcademicCap, HiOutlineBookOpen } from "react-icons/hi";

const Doctorate = ({
  allDDoctorateField,
  allDoctorateCount,
}: doctorateProps) => {
  const t = useTranslations("research.doctorate");
  const bottom = useTranslations("research.doctorate").raw;

  const total =
    (allDoctorateCount?.doctorate_dsc || 0) +
    (allDoctorateCount?.doctorate_phd || 0) +
    (allDoctorateCount?.researcher_dsc || 0) +
    (allDoctorateCount?.researcher_phd || 0);

  return (
    <section>
      <article className="mt-6">
        {/* Hero section */}
        <div className="flex items-start max-lg:flex-col-reverse gap-8">
          <div className="flex-1 max-lg:w-full">
            <h2 className="text-text_secondary font-bold text-2xl leading-snug">
              {t("main_title")}
            </h2>
            <p className="mt-4 text-gray-600 text-base leading-relaxed">
              {t("description", {
                fieldCount: allDDoctorateField.length || 6,
              })}
            </p>

            {/* Fields list */}
            <div className="mt-6 flex flex-col gap-2.5">
              {[...allDDoctorateField].reverse().map((item, index) => (
                <div
                  key={item.id || index}
                  className="flex items-center gap-3 p-3.5 border border-gray-200 rounded-xl bg-white
                    hover:border-text_secondary/20 hover:shadow-sm transition-all duration-200"
                >
                  <div className="w-9 h-9 rounded-lg bg-text_secondary/10 flex items-center justify-center flex-shrink-0">
                    <HiOutlineBookOpen className="text-text_secondary text-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                      {item.code}
                    </span>
                    <p className="text-text_secondary text-sm font-semibold leading-snug mt-0.5">
                      {item.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="w-[45%] max-lg:w-full flex-shrink-0">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                fill
                className="object-cover"
                src="/images/research-images/doctorate.jpg"
                alt="doctorate"
              />
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className="mt-12">
          <h2 className="text-text_secondary font-bold text-xl text-center mb-8">
            {t("center_title")}
          </h2>

          {/* Stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <StatCard
              label={t("table_headers.doctorate_dsc")}
              value={allDoctorateCount?.doctorate_dsc || 0}
            />
            <StatCard
              label={t("table_headers.doctorate_phd")}
              value={allDoctorateCount?.doctorate_phd || 0}
            />
            <StatCard
              label={t("table_headers.researcher_dsc")}
              value={allDoctorateCount?.researcher_dsc || 0}
            />
            <StatCard
              label={t("table_headers.researcher_phd")}
              value={allDoctorateCount?.researcher_phd || 0}
            />
          </div>

          {/* Total */}
          <div className="flex items-center justify-center gap-3 p-5 bg-text_secondary rounded-xl">
            <HiOutlineAcademicCap className="text-white text-2xl" />
            <span className="text-white text-lg font-bold">{total}</span>
            <span className="text-white/70 text-sm font-medium">
              {t("table_headers.total")}
            </span>
          </div>

          {/* Detailed table */}
          <DoctorateTable allDoctorateCount={allDoctorateCount} />

          {/* Bottom text */}
          <div
            className="mt-6 text-gray-600 text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: bottom("bottom_title") }}
          />
        </div>
      </article>
    </section>
  );
};

const StatCard = ({ label, value }: { label: string; value: number }) => (
  <div className="border border-gray-200 rounded-xl p-5 bg-white text-center
    hover:border-text_secondary/20 hover:shadow-sm transition-all duration-200">
    <div className="text-3xl font-bold text-text_secondary">{value}</div>
    <div className="text-xs text-gray-400 font-medium mt-2 uppercase tracking-wider leading-snug">
      {label}
    </div>
  </div>
);

export default Doctorate;