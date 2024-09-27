"use client";

import React from "react";
import {Tabs, TabsProps, Table} from "antd";
import dayjs from "dayjs";
import {useRouter} from "next/navigation";

interface Article {
    title: string;
    slug: string;
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

export default function TableComponent({data}: ProfileClientProps) {
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

    const articleColumn = [
        {
            title: 'Sarlavha',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Holati',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Yo‘nalish',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Yaratilgan vaqt',
            dataIndex: 'createdAt',
            key: 'category',
        },
        {
            title: 'O‘qishlar soni',
            dataIndex: 'viewsCount',
            key: 'viewsCount',
        },
    ];

    const articleDataSource = data?.Articles?.map((item, index) => {
        return {
            key: '1',
            title: item?.title,
            status: getStatusText(item?.status),
            slug: item?.slug,
            category: item?.category?.name,
            createdAt: dayjs(item?.createdAt).format("YYYY-MM-DD"),
            viewsCount: item?.viewsCount + " ta",
        }
    })

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
                    <Table
                        dataSource={articleDataSource}
                        columns={articleColumn}
                        bordered
                        pagination={false}
                        onRow={(record) => {
                            return {
                                className:"cursor-pointer",
                                onClick: () => handleRowClick(record.slug)
                            }
                        }}
                        rowKey="key"
                        className="bg-white shadow-md text-nowrap rounded-lg"
                    />
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