"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { IDoctorateCount } from "@/types/templates/doctorate.types";

const DoctorateTable = ({
  allDoctorateCount,
}: {
  allDoctorateCount: IDoctorateCount;
}) => {
  const t = useTranslations("research.doctorate");
  const currentYear = new Date().getFullYear();

  const total =
    allDoctorateCount.doctorate_dsc +
    allDoctorateCount.doctorate_phd +
    allDoctorateCount.researcher_dsc +
    allDoctorateCount.researcher_phd;

  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full text-center border-collapse">
        <thead>
          <tr>
            <th className="bg-text_secondary text-white text-sm font-medium px-4 py-3 first:rounded-tl-lg">
              {t("table_headers.years")}
            </th>
            <th className="bg-text_secondary text-white text-sm font-medium px-4 py-3">
              {t("table_headers.doctorate_dsc")}
            </th>
            <th className="bg-text_secondary text-white text-sm font-medium px-4 py-3">
              {t("table_headers.doctorate_phd")}
            </th>
            <th className="bg-text_secondary text-white text-sm font-medium px-4 py-3">
              {t("table_headers.researcher_dsc")}
            </th>
            <th className="bg-text_secondary text-white text-sm font-medium px-4 py-3">
              {t("table_headers.researcher_phd")}
            </th>
            <th className="bg-text_secondary text-white text-sm font-medium px-4 py-3 last:rounded-tr-lg">
              {t("table_headers.total")}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700 font-medium bg-gray-50">
              2023-{currentYear} {t("years_label")}
            </td>
            <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">
              {allDoctorateCount.doctorate_dsc}
            </td>
            <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">
              {allDoctorateCount.doctorate_phd}
            </td>
            <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">
              {allDoctorateCount.researcher_dsc}
            </td>
            <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">
              {allDoctorateCount.researcher_phd}
            </td>
            <td className="border border-gray-200 px-4 py-3 text-sm text-text_secondary font-bold bg-gray-50">
              {total}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DoctorateTable;
