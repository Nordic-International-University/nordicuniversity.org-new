"use client";

import React, { useRef, useEffect, useState } from "react";
import { LayoutSidebarProps } from "@/types/templates/layout.types";
import Link from "next/link";
import BroadCamp from "@/app/components/UI/broadCump";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Montserrat } from "next/font/google";

const Montserrat_font = Montserrat({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700"],
});

const LeftSidebarAndComponent = ({
  children,
  sidebarItems,
  sidebarTitle,
  broadCampItems,
  translationKey,
}: LayoutSidebarProps) => {
  const router = usePathname();
  const t = useTranslations(translationKey);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [spanStyles, setSpanStyles] = useState({ top: 0, height: 0 });
  const linkRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    if (activeIndex !== null && linkRefs.current[activeIndex]) {
      const activeLink = linkRefs.current[activeIndex];
      if (activeLink) {
        setSpanStyles({
          top: activeLink.offsetTop,
          height: activeLink.clientHeight,
        });
      }
    }
  }, [activeIndex, router]);

  return (
    <div
      className={`flex mt-12 gap-14 items-start container justify-between ${Montserrat_font.className}`}
    >
      <ul className="min-w-[24%] max-lg:hidden flex flex-col gap-2.5 relative">
        <span
          className="absolute left-0 w-full bg-text_tertiary rounded-lg transition-all duration-300 ease-in-out"
          style={{
            top: spanStyles.top,
            height: spanStyles.height,
          }}
        ></span>
        {sidebarItems.map((item, index) => {
          const isActive = router.includes(item.url);
          if (isActive && activeIndex !== index) setActiveIndex(index);

          return (
            <Link key={index} href={item.url} className="w-full">
              <li
                ref={(el: any) => (linkRefs.current[index] = el)}
                onClick={() => setActiveIndex(index)}
                className={`py-1 w-full text-md rounded-lg pl-2 relative z-10 ${
                  isActive ? "text-tertiary" : "text-tertiary underline"
                }`}
              >
                {t(item.name)}
              </li>
            </Link>
          );
        })}
      </ul>
      <div className="w-4/5 max-lg:w-full">
        <div>
          <h2 className="text-tertiary max-sm:text-center max-sm:text-lg text-2xl font-semibold pb-3">
            {sidebarTitle}
          </h2>
          <BroadCamp items={[broadCampItems]} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default LeftSidebarAndComponent;
