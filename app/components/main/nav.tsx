"use client";

import React, { FC, useEffect } from "react";
import university_logo from "@/public/university_logo.svg";
import Image from "next/image";
import Link from "next/link";
import { Input } from "antd";
import mobile_logo from "@/public/images/home-images/hamburger_menu.png";
import MegaMenu from "@/app/components/UI/MegaMenu";

const menuItems = [
  {
    name: "UNIVERSITET",
    url: "/university",
    subItems: [
      { name: "Universitet ustunliklari", url: "/university/history" },
      { name: "Me’moriy hujjatlar", url: "/university/leadership" },
      { name: "Tashkiliy tuzilma", url: "/university/structure" },
      { name: "Rekvizitlar", url: "/university/activities" },
      { name: "Biz bilan bog’lanish", url: "/university/activities" },
      { name: "Universitet ta’limi", url: "/university/activities" },
    ],
  },
  {
    name: "QABUL",
    url: "/admissions",
    subItems: [
      { name: "Bakalavr", url: "/admissions/bachelor" },
      { name: "Magistratura", url: "/admissions/master" },
      { name: "Sirtqi ta'lim", url: "/admissions/extramural" },
    ],
  },
  {
    name: "TA'LIM",
    url: "/education",
    subItems: [
      { name: "Kafedralar", url: "/education/departments" },
      { name: "Ta'lim dasturlari", url: "/education/programs" },
    ],
  },
  {
    name: "ILM FAN",
    url: "/research",
    subItems: [
      { name: "Loyihalar", url: "/research/projects" },
      { name: "Nashrlar", url: "/research/publications" },
      { name: "Grantlar", url: "/research/grants" },
    ],
  },
  {
    name: "HAMKORLIK",
    url: "/collaboration",
    subItems: [
      { name: "Xalqaro", url: "/collaboration/international" },
      { name: "Milliy", url: "/collaboration/national" },
    ],
  },
  {
    name: "TALABALARGA",
    url: "/students",
    subItems: [
      { name: "Yotoqxona", url: "/students/dormitory" },
      { name: "Kutubxona", url: "/students/library" },
      { name: "Badiiy to'garaklar", url: "/students/clubs" },
    ],
  },
  {
    name: "MATBUOT XIZMATI",
    url: "/press-service",
    subItems: [
      { name: "Yangiliklar", url: "/press-service/news" },
      { name: "E'lonlar", url: "/press-service/announcements" },
      { name: "OAV bilan hamkorlik", url: "/press-service/media-relations" },
    ],
  },
];

const Nav: FC = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "k") {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <nav className="bg-custom-gradient py-6">
      <div className="container">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image src={university_logo} alt="universitet logosi" />
          </Link>
          <div className="flex items-center gap-4">
            <ul className="flex items-center gap-4">
              {menuItems.map((menuItem, index) => (
                <li
                  className="text-[#DBF2FF] group hover:text-blue-500 hover:after:border-b-[3.5px] after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-37px] after:transition-all after:h-[37px] after:bg-transparent"
                  key={index}
                >
                  <Link href={menuItem.url}>{menuItem.name}</Link>
                  <MegaMenu
                    itemName={menuItem.name}
                    subItems={menuItem.subItems}
                  />
                </li>
              ))}
            </ul>
            <Input placeholder="Qidiruv" className="w-48" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
