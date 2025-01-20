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
    <div className="overflow-x-auto mt-9">
      <table className="w-full border-collapse border border-blue-400 text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-blue-400 px-4 py-2">
              {t("table_headers.years")}
            </th>
            <th className="border border-blue-400 px-4 py-2">
              {t("table_headers.doctorate_dsc")}
            </th>
            <th className="border border-blue-400 px-4 py-2">
              {t("table_headers.doctorate_phd")}
            </th>
            <th className="border border-blue-400 px-4 py-2">
              {t("table_headers.researcher_dsc")}
            </th>
            <th className="border border-blue-400 px-4 py-2">
              {t("table_headers.researcher_phd")}
            </th>
            <th className="border border-blue-400 px-4 py-2">
              {t("table_headers.total")}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-blue-400 px-4 py-2">
              2023-{currentYear} {t("years_label")}
            </td>
            <td className="border border-blue-400 px-4 py-2">
              {allDoctorateCount.doctorate_dsc}
            </td>
            <td className="border border-blue-400 px-4 py-2">
              {allDoctorateCount.doctorate_phd}
            </td>
            <td className="border border-blue-400 px-4 py-2">
              {allDoctorateCount.researcher_dsc}
            </td>
            <td className="border border-blue-400 px-4 py-2">
              {allDoctorateCount.researcher_phd}
            </td>
            <td className="border border-blue-400 px-4 py-2">{total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DoctorateTable;
