"use client";

import React from "react";
import { Tabs, TabsProps,Table } from "antd";
import dayjs from "dayjs";
import {useRouter} from "next/navigation";
interface Article {
  title: string;
  slug:string;
  status: string;
  category: {
    name: string;
  };
  createdAt: string;
  viewsCount: number;
}


export enum ArticleStatusEnum {
    NEW = "NEW",
    PLAGIARISM = "PLAGIARISM",
    REVIEW = "REVIEW",
    ACCEPT = "ACCEPT",
    REJECTED = "REJECTED",
    PAYMENT = "PAYMENT",
}

interface ProfileClientProps {
  data?: {
      Articles: Array<any>;
  };
}

const getStatusText = (status: string) => {
    switch (status) {
        case ArticleStatusEnum.NEW:
            return "Yangi";
        case ArticleStatusEnum.PLAGIARISM:
            return "Plagiatga berilgan";
        case ArticleStatusEnum.REVIEW:
            return "Ko'rib chiqilmoqda";
        case ArticleStatusEnum.ACCEPT:
            return "Qabul qilindi";
        case ArticleStatusEnum.REJECTED:
            return "Rad etildi";
        case ArticleStatusEnum.PAYMENT:
            return "To‘lov kutilmoqda";
        default:
            return status;
    }
};

export default function TableComponent({ data }: ProfileClientProps) {
    const router = useRouter();

    const columns = [
        {
            title: 'Maqola Holati',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Soni',
            dataIndex: 'count',
            key: 'count',
        },
    ];

    const dataSource = [
        {
            key: '1',
            status: 'Yangi Maqolalar',
            count: data?.Articles?.filter(
                (article: Article) => article.status === 'NEW'
            ).length,
        },
        {
            key: '2',
            status: 'Tekshirilayotgan Maqolalar',
            count: data?.Articles?.filter(
                (article: Article) => article.status === 'REVIEW'
            ).length,
        },
        {
            key: '3',
            status: 'Qabul Qilingan Maqolalar',
            count: data?.Articles?.filter(
                (article: Article) => article.status === 'ACCEPT'
            ).length,
        },
        {
            key: '4',
            status: 'Rad Etilgan Maqolalar',
            count: data?.Articles?.filter(
                (article: Article) => article.status === 'REJECTED'
            ).length,
        },
    ];

    const handleRowClick = (slug: string) => {
        router.push(`/profile/${slug}`);
    };

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
                  {data?.Articles?.map((article: Article, index: number) => (
                      <tr
                          className="border-b hover:bg-gray-100 w-full"
                          key={index}
                          onClick={() => handleRowClick(article.slug)}
                      >
                          <td className="py-4 px-6 overflow-hidden line-clamp-1">
                              {article.title}
                          </td>
                          <td className="py-4 px-6">{getStatusText(article.status)}</td>
                          <td className="py-4 px-6">{article.category?.name}</td>
                          <td className="py-4 px-6 text-nowrap">
                              {dayjs(article.createdAt).format("YYYY-MM-DD")}
                          </td>
                          <td className="py-4 px-6">{article.viewsCount}</td>
                      </tr>
                  ))}
                  </tbody>
              </table>
          </div>
      ),
    },
      {
          key: "2",
          label: "Ko'rsatkichlar",
          children: (
              <Table
                  dataSource={dataSource}
                  columns={columns}
                  bordered
                  pagination={false}
                  rowKey="key"
                  className="bg-white shadow-md rounded-lg"
              />
          ),
      }
  ];

    return (
        <div className="overflow-x-auto mt-5">
            <Tabs defaultActiveKey="1" type="card" items={tabsItem}/>
        </div>
    );
}