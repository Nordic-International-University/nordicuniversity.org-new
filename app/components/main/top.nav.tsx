"use client";

import React from "react";
import LanguageSelect from "@/app/components/UI/language.select";
import Link from "next/link";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa6";

const resources = [
  {
    name: "Hemis",
    url: "https://hemis.uz",
  },
  {
    name: "Nordik Foundation",
    url: "https://nordikfoundation.com",
  },
  {
    name: "Nordik e-library",
    url: "https://nordikelibrary.com",
  },
  {
    name: "Milliy Kutubxona",
    url: "https://nla.uz",
  },
  {
    name: "Nordik Trading",
    url: "https://nordiktrading.com",
  },
  {
    name: "Nordik Life",
    url: "https://nordiklife.com",
  },
  {
    name: "Nordik e-library",
    url: "https://nordikelibrary.com",
  },
  {
    name: "Dars Jadvali",
    url: "https://example.com/dars-jadvali",
  },
  {
    name: "Nordik e-jurnal",
    url: "https://nordikejournal.com",
  },
];

const TopNav = () => {
  const items: any = resources
    .slice(5, resources.length - 1)
    .map((item, index) => {
      return { label: item.name, key: index.toString() };
    });

  return (
    <div className="py-4 bg-secondary">
      <div className="container">
        <div className="flex items-center justify-between">
          <LanguageSelect />
          <div className="flex items-center gap-8">
            <div className="flex items-center max-lg:hidden gap-5">
              <ul className="flex items-center text-white gap-5">
                {resources.slice(0, 5).map((resource, index) => (
                  <Link href={resource.url} key={index}>
                    <li>{resource.name}</li>
                  </Link>
                ))}
              </ul>
              <Dropdown menu={{ items }} trigger={["click"]}>
                <a
                  className="cursor-pointer text-white"
                  onClick={(e) => e.preventDefault()}
                >
                  <Space>
                    Yana
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>
            <div className="flex text-white text-xl items-center gap-3 max-sm:gap-1.5">
              <FaInstagram />
              <span className="block bg-white h-[20px] w-[0.5px]"></span>
              <FaTelegram />
              <span className="block bg-white h-[20px] w-[0.5px]"></span>
              <FaFacebook />
              <span className="block bg-white h-[20px] w-[0.5px]"></span>
              <FaYoutube />
            </div>
          </div>
        </div>
        <div className="max-lg:flex hidden max-lg:mt-6 items-center gap-5">
          <ul
            className="flex flex-wrap items-center justify-center
           text-white gap-5"
          >
            {resources.map((resource, index) => (
              <Link href={resource.url} key={index}>
                <li>{resource.name}</li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
