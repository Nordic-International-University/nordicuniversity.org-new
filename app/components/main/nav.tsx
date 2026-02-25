"use client";

import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import university_logo from "@/public/university_logo.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/utils/store/Store";
import { useTranslations } from "next-intl";
import { setActiveMenu } from "@/app/utils/slices/menuItem.slice";
import SocialMedia from "@/app/components/UI/socialMedia";
import { fetchSubPages } from "@/app/utils/slices/navbar.slice";
import getCurrentLangClient from "@/app/helpers/getCurrentLang";
import LanguageSelect from "@/app/components/UI/language.select";
import { HiOutlineX, HiOutlineChevronDown } from "react-icons/hi";
import { HiOutlineBars3 } from "react-icons/hi2";

const HOVER_OPEN_DELAY = 200;
const HOVER_CLOSE_DELAY = 300;

const Nav: FC = () => {
  const pathname = usePathname();
  const [activeSubItems, setActiveSubItems] = useState<string | null>(null);
  const [visibleSubmenu, setVisibleSubmenu] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [itemsReady, setItemsReady] = useState(false);
  const menuItems = useSelector((state: RootState) => state.sideBar.menuItems);
  const [transKey, setTransKey] = useState<string | null>(null);
  const t = useTranslations(transKey);
  const tMenu = useTranslations("menu");
  const dispatch: AppDispatch = useDispatch();

  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [contentHeight, setContentHeight] = useState(0);

  const clearTimers = useCallback(() => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const handleMenuItemEnter = useCallback(
    (menuItem: any) => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      if (openTimerRef.current) {
        clearTimeout(openTimerRef.current);
        openTimerRef.current = null;
      }

      openTimerRef.current = setTimeout(() => {
        setItemsReady(false);
        setActiveSubItems(menuItem.name);
        setVisibleSubmenu(menuItem.name);
        setTransKey(menuItem.transKey);
        dispatch(setActiveMenu(true));
        openTimerRef.current = null;
      }, HOVER_OPEN_DELAY);
    },
    [dispatch],
  );

  const handleMenuItemLeave = useCallback(() => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }

    closeTimerRef.current = setTimeout(() => {
      setActiveSubItems(null);
      setVisibleSubmenu(null);
      setItemsReady(false);
      dispatch(setActiveMenu(false));
      closeTimerRef.current = null;
    }, HOVER_CLOSE_DELAY);
  }, [dispatch]);

  const handleSubmenuEnter = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const handleSubmenuLeave = useCallback(() => {
    closeTimerRef.current = setTimeout(() => {
      setActiveSubItems(null);
      setVisibleSubmenu(null);
      setItemsReady(false);
      dispatch(setActiveMenu(false));
      closeTimerRef.current = null;
    }, HOVER_CLOSE_DELAY);
  }, [dispatch]);

  // Measure content height & trigger item animations when submenu changes
  useEffect(() => {
    if (visibleSubmenu && contentRef.current) {
      // Measure after render
      requestAnimationFrame(() => {
        if (contentRef.current) {
          setContentHeight(contentRef.current.scrollHeight);
        }
        // Trigger staggered fade-in after a frame
        requestAnimationFrame(() => {
          setItemsReady(true);
        });
      });
    } else {
      setContentHeight(0);
      setItemsReady(false);
    }
  }, [visibleSubmenu]);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const handleAccordionToggle = (menuItemName: string) => {
    setActiveSubItems((prev) => (prev === menuItemName ? null : menuItemName));
  };

  useEffect(() => {
    const currentLang = getCurrentLangClient();
    dispatch(fetchSubPages(currentLang));
  }, []);

  const getSubItems = (menuItemName: string) => {
    const menuItem = menuItems.find((item: any) => item.name === menuItemName);
    return menuItem ? menuItem.subItems : [];
  };

  useEffect(() => {
    if (openMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [openMenu]);

  const isHomePage = /^\/(uz|en|ru)?\/?$/.test(pathname);
  const navClass =
    isHomePage || activeSubItems ? "sm:bg-nav_opacity" : "bg-primary-gradient";

  // Reorder: swap "education" (Ta'lim) and "press" (Matbuot xizmati)
  const reorderedItems = React.useMemo(() => {
    if (menuItems.length === 0) return menuItems;
    const items = [...menuItems];
    const eduIdx = items.findIndex((m: any) => m.menuTransKey === "education");
    const pressIdx = items.findIndex((m: any) => m.menuTransKey === "press");
    if (eduIdx !== -1 && pressIdx !== -1) {
      [items[eduIdx], items[pressIdx]] = [items[pressIdx], items[eduIdx]];
    }
    return items;
  }, [menuItems]);

  const splitIndex = Math.floor(reorderedItems.length / 2);
  const isSubmenuOpen = !!visibleSubmenu;

  return (
    <>
      <nav
        className={`${isHomePage ? "bg-nav_opacity" : "max-sm:bg-primary-gradient"} ${navClass} z-[18] transition-colors`}
      >
        <div className="container">
          <div className=" relative flex items-center justify-between max-xl:py-5">
            {/* Left menu items */}
            <div className="hidden xl:flex items-center">
              <ul className="flex items-center">
                {reorderedItems
                  .slice(0, splitIndex)
                  .map((menuItem: any, index: number) => (
                    <li
                      onMouseEnter={() => handleMenuItemEnter(menuItem)}
                      onMouseLeave={handleMenuItemLeave}
                      className="relative py-8 px-4 first:pl-0"
                      key={index}
                    >
                      <Link
                        className={`text-white/90 hover:text-white text-[15px] font-medium uppercase tracking-wide transition-colors relative
                          after:content-[''] after:absolute after:left-0 after:-bottom-[33px] after:h-[2px] after:bg-white after:transition-all after:duration-300
                          ${pathname.split("/")[2] === menuItem.url.split("/")[1] ? "after:w-full text-white" : "after:w-0"}`}
                        href={menuItem.url}
                      >
                        {tMenu(`${menuItem.menuTransKey}`)}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Logo — always centered */}
            <div className="hidden xl:block absolute left-1/2 -translate-x-1/2 z-10">
              <Link href="/">
                <Image
                  width={200}
                  src={university_logo}
                  alt="universitet logosi"
                />
              </Link>
            </div>

            {/* Mobile logo */}
            <div className="xl:hidden">
              <Link href="/">
                <Image
                  width={160}
                  src={university_logo}
                  alt="universitet logosi"
                />
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="xl:hidden w-10 h-10 flex items-center justify-center
                rounded-lg text-white hover:bg-white/10 transition-colors"
              onClick={() => setOpenMenu(true)}
            >
              <HiOutlineBars3 className="text-2xl" />
            </button>

            {/* Right menu items */}
            <div className="hidden xl:flex items-center justify-end">
              <ul className="flex items-center">
                {reorderedItems
                  .slice(splitIndex)
                  .map((menuItem: any, index: number) => (
                    <li
                      onMouseEnter={() => handleMenuItemEnter(menuItem)}
                      onMouseLeave={handleMenuItemLeave}
                      className="relative py-8 pl-8 last:pr-0"
                      key={index}
                    >
                      <Link
                        className={`text-white/90 hover:text-white text-[15px] font-medium uppercase tracking-wide transition-colors relative
                          after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:h-[2px] after:bg-white after:transition-all after:duration-300
                          ${pathname.split("/")[2] === menuItem.url.split("/")[1] ? "after:w-full text-white" : "after:w-0"}`}
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

      {/* Desktop submenu dropdown */}
      <div
        className="max-lg:hidden block absolute w-full z-[13]"
        style={{
          top: 0,
          height: isSubmenuOpen ? `${contentHeight}px` : "0px",
          opacity: isSubmenuOpen ? 1 : 0,
          pointerEvents: isSubmenuOpen ? "auto" : "none",
          transition:
            "height 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease",
          overflow: "hidden",
        }}
        onMouseEnter={handleSubmenuEnter}
        onMouseLeave={handleSubmenuLeave}
      >
        {/* Layered background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #060d1a, rgba(10,22,40,0.98), rgba(14,31,61,0.95))",
            backdropFilter: "blur(20px)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(11,64,117,0.15), transparent 70%)",
          }}
        />

        <div
          ref={contentRef}
          className="relative container"
          style={{ paddingTop: "176px", paddingBottom: "48px" }}
        >
          {/* Gradient line */}
          <div
            className="relative"
            style={{ height: "1px", marginBottom: "32px", overflow: "hidden" }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, transparent, rgba(56,189,248,0.25), transparent)",
              }}
            />
          </div>

          {/* Active menu title */}
          <div
            style={{
              marginBottom: "24px",
              opacity: itemsReady ? 1 : 0,
              transform: itemsReady ? "translateY(0)" : "translateY(-8px)",
              transition: "opacity 0.35s ease, transform 0.35s ease",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "3px",
                color: "rgba(56,189,248,0.6)",
              }}
            >
              {visibleSubmenu &&
                tMenu(
                  reorderedItems.find((m: any) => m.name === visibleSubmenu)
                    ?.menuTransKey || "",
                )}
            </span>
          </div>

          {/* Sub-items grid */}
          <div
            key={visibleSubmenu}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "4px 24px",
            }}
          >
            {visibleSubmenu &&
              getSubItems(visibleSubmenu).map((subItem: any, index: number) => (
                <Link
                  key={index}
                  onClick={() => {
                    clearTimers();
                    setActiveSubItems(null);
                    setVisibleSubmenu(null);
                    setItemsReady(false);
                    dispatch(setActiveMenu(false));
                  }}
                  href={subItem.url}
                  className="group"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "10px 16px",
                    borderRadius: "8px",
                    opacity: itemsReady ? 1 : 0,
                    transform: itemsReady
                      ? "translateY(0)"
                      : "translateY(14px)",
                    transition: `opacity 0.4s ease ${index * 40}ms, transform 0.4s ease ${index * 40}ms, background-color 0.2s ease`,
                  }}
                >
                  <span
                    className="group-hover:shadow-[0_0_8px_rgba(56,189,248,0.5)]"
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(56,189,248,0.35)",
                      transition: "all 0.3s ease",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.6)",
                      transition: "all 0.2s ease",
                    }}
                    className="group-hover:!text-white group-hover:translate-x-0.5"
                  >
                    {subItem.id ? subItem.name : t(subItem.name)}
                  </span>
                </Link>
              ))}
          </div>

          {/* Bottom line */}
          <div
            style={{
              marginTop: "32px",
              height: "1px",
              background:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)",
            }}
          />
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          openMenu
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => {
            setOpenMenu(false);
            setActiveSubItems(null);
          }}
        />

        <div
          className={`absolute top-0 right-0 w-full max-w-[380px] h-full bg-white shadow-2xl
            transition-transform duration-300 ease-out overflow-y-auto ${
              openMenu ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <LanguageSelect color="black" />
            </div>
            <button
              onClick={() => {
                setOpenMenu(false);
                setActiveSubItems(null);
              }}
              className="w-9 h-9 flex items-center justify-center rounded-lg
                text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <HiOutlineX className="text-xl" />
            </button>
          </div>

          <div className="px-6 py-4">
            {menuItems.map((menuItem: any, index: number) => (
              <div
                key={index}
                className="border-b border-gray-50 last:border-0"
              >
                <button
                  className="flex items-center justify-between w-full py-4"
                  onClick={() => {
                    handleAccordionToggle(menuItem.name);
                    setTransKey(menuItem.transKey);
                  }}
                >
                  <span className="text-[15px] text-text_secondary font-semibold">
                    {tMenu(`${menuItem.menuTransKey}`)}
                  </span>
                  <HiOutlineChevronDown
                    className={`text-gray-400 text-sm transition-transform duration-200 ${
                      activeSubItems === menuItem.name ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    activeSubItems === menuItem.name
                      ? "max-h-[1000px] opacity-100 pb-3"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {menuItem.subItems.map((subItem: any, subIndex: number) => (
                    <Link
                      key={subIndex}
                      href={subItem.url}
                      onClick={() => {
                        setOpenMenu(false);
                        setActiveSubItems(null);
                      }}
                      className="flex items-center gap-2.5 py-2 px-1 text-sm text-gray-600
                          hover:text-text_secondary transition-colors"
                    >
                      <span className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" />
                      {subItem.id ? subItem.name : t(subItem.name)}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="px-6 py-5 border-t border-gray-100 mt-auto">
            <SocialMedia color="black" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
