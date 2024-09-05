"use client";

import React, {useState} from "react";
import {Tabs, TabsProps} from "antd";

interface ProfileClientProps {
    data?: any
}

export default function TableComponent({data}: ProfileClientProps) {
  console.log("Prop Data",data)
    const tabsItem: TabsProps["items"] = [
        {
            key: "1",
            label: "Ko'rsatkichlar",
            children: <div className="overflow-x-auto">
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
                    {data.data.Articles.map((article: any, index: number) => (
                        <tbody>
                        <tr className="border-b hover:bg-gray-100 " key={index}>
                            <td className="py-4 px-6">Row 1, Data 1</td>
                            <td className="py-4 px-6">Row 1, Data as2</td>
                            <td className="py-4 px-6">Row 1, Data 2</td>
                            <td className="py-4 px-6">Row 1, Data 2</td>
                            <td className="py-4 px-6">Row 1, Data 2</td>
                        </tr>

                        </tbody>
                    ))}

                </table>
            </div>
        },
        {
            key: "2",
            label: "nimadur",
            children: "fuck me",
        },
        {
            key: "3",
            label: "Tab 3",
            children: "Content of Tab Pane 3",
        },
    ];

    return (
        <div className="overflow-x-auto">
            <Tabs defaultActiveKey="1" type="card" items={tabsItem}/>
        </div>
    );
}
