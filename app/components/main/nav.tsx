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
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";

const Nav: FC = () => {
  const pathname = usePathname();
  const [activeSubItems, setActiveSubItems] = useState<string | null>(null);
  const [_, setMenuHeight] = useState(0);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const menuItems = useSelector((state: RootState) => state.sideBar.menuItems);

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
    const menuItem = menuItems.find((item: any) => item.name === menuItemName);
    return menuItem ? menuItem.subItems : [];
  };

  const isHomePage = /^\/(uz|en|ru)?\/?$/.test(pathname);
  const navClass = isHomePage ? "nav-bg-opacity" : "bg-primary-gradient";

  return (
    <>
      <nav className={`bg-opacity-95 ${navClass} sticky z-[12]`}>
        <div className="container">
          <div className="flex items-center max-xl:py-6 justify-between">
            <div className="flex max-xl:hidden items-center gap-4 flex-1 justify-start">
              <ul className="flex items-center ">
                {menuItems
                  .slice(0, Math.ceil(menuItems.length / 2))
                  .map((menuItem: any, index: number) => (
                    <li
                      onMouseEnter={() => handleMouseEnter(menuItem.name)}
                      onMouseLeave={handleMouseLeave}
                      className="text-white py-10 pr-4 text-lg "
                      key={index}
                    >
                      <MegaMenu
                        subItems={menuItem.subItems}
                        transKey={menuItem.transKey}
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
              <ul className="flex items-center  gap-6">
                {menuItems
                  .slice(Math.ceil(menuItems.length / 2))
                  .map((menuItem: any, index: any) => (
                    <li
                      onMouseEnter={() => handleMouseEnter(menuItem.name)}
                      onMouseLeave={handleMouseLeave}
                      className="text-white text-lg "
                      key={index}
                    >
                      <MegaMenu
                        subItems={menuItem.subItems}
                        transKey={menuItem.transKey}
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
                {menuItems.map((menuItem: any, index: number) => (
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
                        {menuItem.subItems.map(
                          (subItem: any, subIndex: number) => (
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
                          ),
                        )}
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
