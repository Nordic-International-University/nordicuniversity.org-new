"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import university_logo from "@/public/university_logo.svg";
import Image from "next/image";
import Link from "next/link";
import menu from "@/public/images/home-images/hamburger_menu.png";
import { CloseIcon } from "@nextui-org/shared-icons";
import LanguageSelect from "@/app/components/UI/language.select";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import caricature from "@/public/images/home-images/mobile_image.png";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/utils/store/Store";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { setActiveMenu } from "@/app/utils/slices/menuItem.slice";
import SocialMedia from "@/app/components/UI/socialMedia";
import { fetchSubPages } from "@/app/utils/slices/navbar.slice";
import getCurrentLangClient from "@/app/helpers/getCurrentLang";

const Nav: FC = () => {
  const pathname = usePathname();
  const [activeSubItems, setActiveSubItems] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const menuItems = useSelector((state: RootState) => state.sideBar.menuItems);
  const [transKey, setTransKey] = useState<string | null>(null);
  const t = useTranslations(transKey);
  const tMenu = useTranslations("menu");
  const subItemsRef = useRef<HTMLDivElement | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const handleAccordionToggle = (menuItemName: string) => {
    setActiveSubItems((prev) => (prev === menuItemName ? null : menuItemName));
  };

  useEffect(() => {
    const currentLang = getCurrentLangClient();
    dispatch(fetchSubPages(currentLang));
  }, []);

  const handleMouseEnter = (menuItemName: any) => {
    setActiveSubItems(menuItemName.name);
    setTransKey(menuItemName.transKey);
    dispatch(setActiveMenu(true));
  };

  const handleMouseLeave = () => {
    setActiveSubItems(null);
    dispatch(setActiveMenu(false));
  };

  const openHamburgerMenu = () => {
    setOpenMenu(true);
  };

  const closeHamburgerMenu = () => {
    setOpenMenu(false);
    setActiveSubItems(null);
  };

  const getSubItems = (menuItemName: string) => {
    const menuItem = menuItems.find((item: any) => item.name === menuItemName);
    return menuItem ? menuItem.subItems : [];
  };

  useEffect(() => {
    const body = document.body;

    if (openMenu) {
      body.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.width = "100%";
    } else {
      body.style.overflow = "auto";
      body.style.position = "static";
    }

    return () => {
      body.style.overflow = "auto";
      body.style.position = "static";
    };
  }, [openMenu]);

  useEffect(() => {
    if (activeSubItems && subItemsRef.current) {
      gsap.fromTo(
        subItemsRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
        },
      );
    }
  }, [activeSubItems]);

  const isHomePage = /^\/(uz|en|ru)?\/?$/.test(pathname);
  const navClass =
    isHomePage || activeSubItems ? "sm:bg-nav_opacity" : "bg-primary-gradient";

  return (
    <>
      <nav
        className={`bg-opacity-95 ${isHomePage ? "bg-nav_opacity" : "max-sm:bg-primary-gradient"} ${navClass} z-[18]`}
      >
        <div className="container">
          <div className="flex items-center max-xl:py-6 justify-between">
            <div className="flex max-xl:hidden items-center gap-5 flex-1 justify-start">
              <ul className="flex items-center">
                {menuItems
                  .slice(0, Math.ceil(menuItems.length / 2))
                  .map((menuItem: any, index: number) => (
                    <li
                      onMouseEnter={() => handleMouseEnter(menuItem)}
                      onMouseLeave={handleMouseLeave}
                      className="relative text-white text-nowrap py-10 p-6 text-lg "
                      key={index}
                    >
                      <Link
                        className={`relative ${
                          pathname.split("/")[2] === menuItem.url.split("/")[1]
                            ? "after:w-full"
                            : "after:w-0"
                        } after:content-[''] uppercase after:absolute after:left-0 after:-bottom-[43px] after:h-[2px] after:bg-white after:transition-all after:duration-300`}
                        href={menuItem.url}
                      >
                        {tMenu(`${menuItem.menuTransKey}`)}
                      </Link>
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
            <div className="flex max-xl:hidden z-10 sticky items-center gap-4 flex-1 justify-end">
              <ul className="flex items-center">
                {menuItems
                  .slice(Math.ceil(menuItems.length / 2))
                  .map((menuItem: any, index: any) => (
                    <li
                      onMouseEnter={() => handleMouseEnter(menuItem)}
                      onMouseLeave={handleMouseLeave}
                      className="relative text-white text-nowrap py-10 pr-0 pl-10 text-lg"
                      key={index}
                    >
                      <Link
                        className={`relative ${
                          pathname.split("/")[2] === menuItem.url.split("/")[1]
                            ? "after:w-full"
                            : "after:w-0"
                        } after:content-[''] uppercase after:absolute after:left-0 after:-bottom-1.5 after:h-[2px] after:bg-white after:transition-all after:duration-300`}
                        href={menuItem.url}
                      >
                        {tMenu(`${menuItem.menuTransKey}`)}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {/*mobile menu*/}
      <div
        className={`${openMenu ? "top-0" : "-top-[300%]"} transition-all ease-in-out z-40 bg-white w-full h-screen overflow-auto fixed`}
      >
        <div className="p-4">
          <div className="flex item-center justify-between">
            <div className="static z-50">
              <LanguageSelect color="black" />
            </div>
            <SocialMedia color="black" />
          </div>
          <div className="px-12">
            <h2 className="text-center pt-[45px] font-[600] text-text_secondary">
              Xalqaro Nordik <br className="max-sm:hidden block" /> Universiteti
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
                      onClick={() => {
                        handleAccordionToggle(menuItem.name);
                        setTransKey(menuItem.transKey);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg text-text_secondary font-semibold">
                          {tMenu(`${menuItem.menuTransKey}`)}
                        </h2>
                      </div>
                      {activeSubItems === menuItem.name ? (
                        <FaChevronUp className="text-xl text-text_secondary transition-transform duration-300" />
                      ) : (
                        <FaChevronDown className="text-xl text-text_secondary transition-transform duration-300" />
                      )}
                    </div>

                    <div
                      className={`overflow-hidden ${
                        activeSubItems === menuItem.name
                          ? "max-h-[1000px]"
                          : "max-h-0"
                      }`}
                    >
                      <ul className="mt-2">
                        {menuItem.subItems.map(
                          (subItem: any, subIndex: number) => (
                            <li
                              onClick={() => closeHamburgerMenu()}
                              key={subIndex}
                              className="py-1 flex  items-center gap-2.5"
                            >
                              <span className="bg-text_secondary h-1.5 w-1.5 rounded-full"></span>
                              <Link
                                href={subItem.url}
                                className="text-text_secondary"
                              >
                                {subItem.id ? subItem.name : t(subItem.name)}
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
          className={`w-full bottom-0 ${openMenu ? "fixed" : "hidden"}`}
        />
      </div>
      <div
        className={`bg-[#272945] max-lg:hidden block absolute w-full min-h-[328px] z-[13] transition-all duration-500 ${
          activeSubItems ? "top-0 opacity-100" : "top-[-100%] opacity-0"
        }`}
        onMouseEnter={() => {
          setActiveSubItems(activeSubItems);
          dispatch(setActiveMenu(true));
        }}
        onMouseLeave={handleMouseLeave}
      >
        <div className="container pt-48 bottom-0 ease-linear mx-auto py-8 text-white">
          <hr className="bg-white opacity-30 w-full mb-4" />
          <div
            ref={subItemsRef}
            className="flex items-center flex-wrap gap-x-12 gap-y-5"
          >
            {activeSubItems &&
              getSubItems(activeSubItems).map((subItem: any, index: number) => {
                return (
                  <div key={index} className="py-2 flex">
                    <Link
                      onClick={handleMouseLeave}
                      href={subItem.url}
                      className="hover:underline"
                    >
                      {subItem.id ? subItem.name : t(subItem.name)}
                    </Link>
                  </div>
                );
              })}
          </div>
          <hr className="bg-white opacity-30 mt-4 w-full" />
        </div>
      </div>
    </>
  );
};

export default Nav;