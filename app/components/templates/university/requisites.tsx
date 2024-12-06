import React from "react";
import { useTranslations } from "next-intl";
import { Button, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";

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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      message.success({
        content: t("copied"),
        duration: 2,
      });
    });
  };
  return (
    <div className="mt-14">
      {/* Для десктопа */}
      <div className="hidden sm:block">
        <table className="min-w-full border border-gray-300 text-sm bg-gray-50 shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-primary-gradient text-white">
              <th className="px-4 py-3 border border-blue-700 text-left">
                {t("columns.number")}
              </th>
              <th className="px-4 py-3 border border-blue-700 text-left">
                {t("columns.name")}
              </th>
              <th className="px-4 py-3 border border-blue-700 text-left">
                {t("columns.info")}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={item.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                <td className="px-4 py-3 border border-gray-300 text-center text-gray-800">
                  {item.id}
                </td>
                <td className="px-4 py-3 border border-gray-300 text-gray-800">
                  {item.name}
                </td>
                <td className="px-4 py-3 border border-gray-300 text-gray-800 flex justify-between items-center">
                  <span>{item.info}</span>
                  <Button
                    icon={<CopyOutlined />}
                    type="link"
                    onClick={() => copyToClipboard(item.info)}
                  ></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Для мобильных устройств */}
      <div className="block sm:hidden">
        {data.map((item) => (
          <div
            key={item.id}
            className="border border-gray-300 mb-4 p-4 rounded-lg bg-gradient-to-br from-blue-50 to-white shadow-lg"
          >
            <div className="mb-2 text-gray-800 flex justify-between items-center">
              <span>
                <span className="font-semibold text-blue-600">
                  {t("columns.number")}:
                </span>{" "}
                {item.id}
              </span>
            </div>
            <div className="mb-2 text-gray-800 flex justify-between items-center">
              <span>
                <span className="font-semibold text-blue-600">
                  {t("columns.name")}:
                </span>{" "}
                {item.name}
              </span>
            </div>
            <div className="text-gray-800 flex justify-between items-center">
              <span>
                <span className="font-semibold text-blue-600">
                  {t("columns.info")}:
                </span>{" "}
                {item.info}
              </span>
              <Button
                icon={<CopyOutlined />}
                type="link"
                onClick={() => copyToClipboard(item.info)}
              ></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UniversityInfoTable;
