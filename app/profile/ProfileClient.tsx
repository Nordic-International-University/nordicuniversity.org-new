"use client";

import React from "react";
import { Tabs, TabsProps } from "antd";
import dayjs from "dayjs";

interface Article {
  title: string;
  status: string;
  category: string;
  createdAt: string;
  viewsCount: number;
}

interface ProfileClientProps {
  data?: {
    data: Article[];
  };
}

export default function TableComponent({ data }: ProfileClientProps) {
  console.log("Prop Data", data);

  const tabsItem: TabsProps["items"] = [
    {
      key: "1",
      label: "Maqolalar",
      children: (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Sarlavha</th>
                <th className="py-3 px-6 text-left">Holati</th>
                <th className="py-3 px-6 text-left">Kategoriyasi</th>
                <th className="py-3 px-6 text-left">Yaratilgan vaqt</th>
                <th className="py-3 px-6 text-left">O'qishlar soni</th>
              </tr>
            </thead>
            <tbody className="cursor-pointer">
              {Array.isArray(data?.data) && data?.data.length > 0 ? (
                data?.data?.map((article: Article, index: number) => (
                  <tr className="border-b hover:bg-gray-100" key={index}>
                    <td className="py-4 px-6 overflow-hidden line-clamp-1">
                      {article.title}
                    </td>
                    <td className="py-4 px-6">{article.status}</td>
                    <td className="py-4 px-6">{article.category}</td>
                    <td className="py-4 px-6 text-nowrap">
                      {dayjs(article.createdAt).format("YYYY-MM-DD")}
                    </td>
                    <td className="py-4 px-6">{article.viewsCount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-4 px-6 text-center" colSpan={5}>
                    Maqolalar xali qo'shilmadi
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ),
    },
    {
      key: "2",
      label: "Ko'rsatkichlar",
      children: (



        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <tbody className="cursor-pointer ">
          {Array.isArray(data?.data) && data?.data.length > 0 ? (
              data?.data?.map((article: Article, index: number) => (
                  <tr className="border-b hover:bg-gray-100">
                    <td className="py-4 px-6">Nashr Etilgan Maqolalar Soni</td>
                    <td className="py-4 px-6">{article.category}</td>
                  </tr>
              ))
          ) : (
              <tr>
                <td className="py-4 px-6 text-center" colSpan={5}>
                  Maqolalar xali qo'shilmadi
                </td>
              </tr>
          )}














          </tbody>
        </table>
      ),
    },
    {
      key: "3",
      label: "Tab 3",
      children: "Контент для Tab 3",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <Tabs defaultActiveKey="1" type="card" items={tabsItem} />
    </div>
  );
}
