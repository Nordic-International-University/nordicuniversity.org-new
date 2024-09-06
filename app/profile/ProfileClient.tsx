"use client";

import React from "react";
import { Tabs, TabsProps } from "antd";
import dayjs from "dayjs";


interface Article {
  title: string;
  status: string;
  category: {
    name: string;
  };
  createdAt: string;
  viewsCount: number;
}


interface ProfileClientProps {
  data?: {
    data:{
      Articles:Array<any>
    }
  };
}

export default function TableComponent({ data }: ProfileClientProps) {
  console.log("Prop Data", data?.data.Articles);

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
              {
                data?.data?.Articles?.map((article: Article, index: number) => (
                  <tr className="border-b hover:bg-gray-100" key={index}>
                    <td className="py-4 px-6 overflow-hidden line-clamp-1">
                      {article.title}
                    </td>
                    <td className="py-4 px-6">{article.status}</td>
                    <td className="py-4 px-6">{article.category?.name}</td>
                    <td className="py-4 px-6 text-nowrap">
                      {dayjs(article.createdAt).format("YYYY-MM-DD")}
                    </td>
                    <td className="py-4 px-6">{article.viewsCount}</td>
                  </tr>
                ))
              }
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
          {
            data?.data?.Articles?.filter((article: Article, index: number) => article.status === "NEW").length
          }
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
