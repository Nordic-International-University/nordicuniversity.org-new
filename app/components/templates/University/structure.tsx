import React from "react";
import { useTranslations } from "next-intl";

const UniversityInfoTable = () => {
  const t = useTranslations("university.requisites.table").raw;

  const data = [
    { id: 1, name: t("fieldNames.officialAddress"), info: t("data.0") },
    { id: 2, name: t("fieldNames.address"), info: t("data.1") },
    { id: 3, name: t("fieldNames.address"), info: t("data.2") },
    { id: 4, name: t("fieldNames.phoneNumber"), info: t("data.3") },
    { id: 5, name: t("fieldNames.accountNumber"), info: t("data.4") },
    { id: 6, name: t("fieldNames.bank"), info: t("data.5") },
    { id: 7, name: t("fieldNames.mfo"), info: t("data.6") },
    { id: 8, name: t("fieldNames.tin"), info: t("data.7") },
    { id: 9, name: t("fieldNames.ifut"), info: t("data.8") },
    { id: 10, name: t("fieldNames.email"), info: t("data.9") },
  ];

  return (
    <div className="overflow-x-auto mt-14">
      <table className="min-w-full max-sm:text-nowrap border border-gray-300">
        <thead>
          <tr className="bg-white">
            <th className="px-4 py-2 border border-gray-300">
              {t("columns.number")}
            </th>
            <th className="px-4 py-2 border border-gray-300">
              {t("columns.name")}
            </th>
            <th className="px-4 py-2 border border-gray-300">
              {t("columns.info")}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-2 border border-gray-300 bg-white text-center">
                {item.id}
              </td>
              <td className="px-4 py-2 border border-gray-300 bg-text_tertiary">
                {item.name}
              </td>
              <td className="px-4 py-2 bg-text_tertiary border border-gray-300">
                {item.info}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UniversityInfoTable;
