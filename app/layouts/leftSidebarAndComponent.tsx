"use client";

import React, {
  useRef,
  useLayoutEffect,
  useMemo,
  useState,
  useEffect,
} from "react";
import Link from "next/link";
import BroadCamp from "@/app/components/UI/broadCump";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import {
  LayoutSidebarProps,
  sideBarItemTypes,
} from "@/types/templates/layout.types";
import { getSubPages } from "@/app/layouts/getSubPages";
import getCurrentLangClient from "@/app/helpers/getCurrentLang";

const LeftSidebarAndComponent = ({
  children,
  sidebarItems,
  sidebarTitle,
  broadCampItems,
  translationKey,
}: LayoutSidebarProps) => {
  const router = usePathname();
  const t = useTranslations(translationKey);
  const linkRefs = useRef<Array<HTMLLIElement | null>>([]);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [subMenuItems, setSubMenuItems] = useState<
    Array<sideBarItemTypes | null>
  >([]);

  useEffect(() => {
    const getAllSubMenuItems = async () => {
      const subMenuItems = await getSubPages(
        getCurrentLangClient(),
        translationKey,
      );
      setSubMenuItems(
        subMenuItems.map((item: any) => {
          return {
            name: item.name,
            url: `${router.includes("dynamic") ? "" : "dynamic/"}${item.slug}`,
            id: item.id,
            index: item.id,
          };
        }),
      );
    };

    getAllSubMenuItems();
  }, []);

  const combinedItems = useMemo(() => {
    return [...sidebarItems, ...subMenuItems];
  }, [sidebarItems, subMenuItems]);

  const activeIndex = useMemo(() => {
    if (!combinedItems || combinedItems.length === 0) {
      return -1;
    }
    return combinedItems.findIndex((item: any) => router.includes(item.url));
  }, [router, combinedItems]);

  useLayoutEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
      );
    }
  }, [router]);

  return (
    <div className="container mt-10 flex items-start gap-10 max-lg:gap-0">
      {/* Sidebar */}
      <aside className="w-[230px] flex-shrink-0 max-lg:hidden sticky top-6">
        <nav className="flex flex-col">
          {combinedItems.map((item: any, index) => (
            <Link key={index} href={item.url}>
              <li
                ref={(el: any) => (linkRefs.current[index] = el)}
                className={`list-none py-2.5 px-3 text-[18px] font-medium border-l-2 transition-all duration-200
                  ${
                    activeIndex === index
                      ? "border-text_secondary text-text_secondary bg-text_secondary/5"
                      : "border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-800"
                  }`}
              >
                {item.id ? item.name : t(item.name)}
              </li>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-1 min-w-0 max-lg:w-full">
        <div className="mb-6">
          <h1 className="text-text_secondary text-2xl max-sm:text-lg font-bold">
            {sidebarTitle}
          </h1>
          <div className="mt-3">
            <BroadCamp items={[broadCampItems]} />
          </div>
        </div>
        <div ref={contentRef}>{children}</div>
      </div>
    </div>
  );
};

export default LeftSidebarAndComponent;
