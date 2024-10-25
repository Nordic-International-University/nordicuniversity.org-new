"use client";

import React, { FC, useState } from "react";
import university_logo from "@/public/university_logo.svg";
import Image from "next/image";
import Link from "next/link";
import menu from "@/public/images/home-images/hamburger_menu.png";
import { CloseIcon } from "@nextui-org/shared-icons";
import LanguageSelect from "@/app/components/UI/language.select";
import {
  FaChevronDown,
  FaChevronUp,
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { FaTelegram } from "react-icons/fa6";
import caricature from "@/public/images/home-images/mobile_image.png";
import MegaMenu from "@/app/components/UI/MegaMenu";

const menuItems = [
  {
    name: "UNIVERSITET",
    url: "/university",
    subItems: [
      { name: "Universitet ustunliklari", url: "/university/advantages" },
      { name: "Me’moriy hujjatlar", url: "/university/documents" },
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
  const [activeSubItems, setActiveSubItems] = useState<string | null>(null);
  const [menuHeight, setMenuHeight] = useState(0);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleAccordionToggle = (menuItemName: string) => {
    setActiveSubItems((prev) => (prev === menuItemName ? null : menuItemName));
  };

  const handleMouseEnter = (menuItemName: string) => {
    setActiveSubItems(menuItemName);
    const subItemCount = getSubItems(menuItemName).length;
    setMenuHeight(subItemCount * 50 + 200);
  };

  const handleMouseLeave = () => {
    setActiveSubItems(null);
    setMenuHeight(0);
  };

  const openHamburgerMenu = () => {
    setOpenMenu(true);
  };

  const closeHamburgerMenu = () => {
    setOpenMenu(false);
  };

  const getSubItems = (menuItemName: string) => {
    const menuItem = menuItems.find((item) => item.name === menuItemName);
    return menuItem ? menuItem.subItems : [];
  };
  return (
    <>
      <nav className="nav-bg-opacity bg-opacity-95 sticky z-[12]">
        <div className="container">
          <div className="flex items-center max-xl:py-6 justify-between">
            <div className="flex max-xl:hidden items-center gap-4 flex-1 justify-start">
              <ul className="flex items-center group-hover:group">
                {menuItems
                  .slice(0, Math.ceil(menuItems.length / 2))
                  .map((menuItem, index) => (
                    <li
                      onMouseEnter={() => handleMouseEnter(menuItem.name)}
                      onMouseLeave={handleMouseLeave}
                      className="text-white py-10 pr-4 text-lg group"
                      key={index}
                    >
                      <MegaMenu
                        subItems={menuItem.subItems}
                        itemName={menuItem.name}
                      />
                      <Link href={menuItem.url}>{menuItem.name}</Link>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="flex justify-center">
              <Link href="/">
                <Image
                  className="max-xl:w-[170px]"
                  width={220}
                  src={university_logo}
                  alt="universitet logosi"
                />
              </Link>
            </div>
            <Image
              className="hidden max-xl:block"
              src={menu}
              onClick={openHamburgerMenu}
              alt="menu"
            />
            <div className="flex max-xl:hidden items-center gap-4 flex-1 justify-end">
              <ul className="flex items-center group-hover:group gap-6">
                {menuItems
                  .slice(Math.ceil(menuItems.length / 2))
                  .map((menuItem, index) => (
                    <li
                      onMouseEnter={() => handleMouseEnter(menuItem.name)}
                      onMouseLeave={handleMouseLeave}
                      className="text-white text-lg group"
                      key={index}
                    >
                      <MegaMenu
                        subItems={menuItem.subItems}
                        itemName={menuItem.name}
                      />
                      <Link href={menuItem.url}>{menuItem.name}</Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {/*<div*/}
      {/*  className="absolute left-0 w-full bg-black transition-all duration-300 ease-in-out z-10"*/}
      {/*  style={{*/}
      {/*    height: `${menuHeight}px`,*/}
      {/*  }}*/}
      {/*  onMouseEnter={() => setMenuHeight(400)}*/}
      {/*  onMouseLeave={handleMouseLeave}*/}
      {/*>*/}
      {/*  {activeSubItems && (*/}
      {/*    <div className="container text-white sticky">*/}
      {/*      <ul className="flex flex-col">*/}
      {/*        {getSubItems(activeSubItems).map((subItem, index) => (*/}
      {/*          <li key={index} className="py-2">*/}
      {/*            <Link href={subItem.url} className="hover:underline">*/}
      {/*              {subItem.name}*/}
      {/*            </Link>*/}
      {/*          </li>*/}
      {/*        ))}*/}
      {/*      </ul>*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*</div>*/}

      {/*mobile menu*/}
      <div
        className={`${openMenu ? "top-0" : "-top-[300%]"} transition-all ease-in-out z-40 bg-white w-full h-screen fixed`}
      >
        <div className="p-4">
          <div className="flex item-center justify-between">
            <div className="static z-50">
              <LanguageSelect />
            </div>
            <div className="flex items-center text-secondary gap-3 max-sm:gap-1.5">
              <FaInstagram />
              <span className="block bg-secondary h-[20px] w-[0.5px]"></span>
              <FaTelegram />
              <span className="block bg-secondary h-[20px] w-[0.5px]"></span>
              <FaFacebook />
              <span className="block bg-secondary h-[20px] w-[0.5px]"></span>
              <FaYoutube />
            </div>
          </div>
          <div className="px-12">
            <h2 className="text-center pt-[45px] font-[600] text-text_secondary">
              Xalqaro Nordik <br /> Universiteti
            </h2>
            <hr className="bg-text_secondary h-0.5 mt-[28px]" />
            <div className="mt-[35px]">
              <CloseIcon
                className="text-text_secondary sticky z-40 text-2xl"
                onClick={closeHamburgerMenu}
              />
              <ul className="mt-[30px] sticky z-50">
                {menuItems.map((menuItem, index) => (
                  <li key={index} className="mb-4">
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => handleAccordionToggle(menuItem.name)}
                    >
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg text-text_secondary font-semibold">
                          {menuItem.name}
                        </h2>
                      </div>
                      {activeSubItems === menuItem.name ? (
                        <FaChevronUp className="text-xl text-text_secondary transition-transform duration-300" />
                      ) : (
                        <FaChevronDown className="text-xl text-text_secondary transition-transform duration-300" />
                      )}
                    </div>

                    <div
                      className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
                        activeSubItems === menuItem.name
                          ? "max-h-[1000px]"
                          : "max-h-0"
                      }`}
                    >
                      <ul className="mt-2">
                        {menuItem.subItems.map((subItem, subIndex) => (
                          <li
                            key={subIndex}
                            className="py-1 flex items-center gap-2.5"
                          >
                            <span className="bg-text_secondary h-1.5 w-1.5 rounded-full"></span>
                            <Link
                              href={subItem.url}
                              className="text-text_secondary"
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <Image
          src={caricature}
          alt="caricature"
          className="w-full absolute bottom-0"
        />
      </div>
    </>
  );
};

export default Nav;
