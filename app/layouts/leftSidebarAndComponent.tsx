"use client";

import React, { useRef, useLayoutEffect, useMemo } from "react";
import Link from "next/link";
import BroadCamp from "@/app/components/UI/broadCump";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { LayoutSidebarProps } from "@/types/templates/layout.types";

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

  const activeIndex = useMemo(() => {
    if (!sidebarItems || sidebarItems.length === 0) {
      return -1;
    }
    return sidebarItems.findIndex((item) => router.includes(item.url));
  }, [router, sidebarItems]);

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
    <div className="flex mt-12 gap-6 items-start container justify-between">
      <ul className="w-[20%] max-lg:hidden flex flex-col gap-2.5 relative">
        {sidebarItems.map((item, index) => (
          <Link key={index} href={item.url} className="w-full">
            <div className="flex items-center">
              <li
                ref={(el: any) => (linkRefs.current[index] = el)}
                className={`py-1 w-full text-md text-text_secondary font-medium top-1 rounded-lg pl-2 relative z-10 ${
                  activeIndex === index
                    ? "text-tertiary bg-text_tertiary"
                    : "text-tertiary underline"
                }`}
              >
                {t(item.name)}
              </li>
            </div>
          </Link>
        ))}
      </ul>
      <div className="w-4/5 max-lg:w-full">
        <div>
          <h1 className="text-tertiary max-sm:text-center max-sm:text-lg text-2xl font-semibold pb-3">
            {sidebarTitle}
          </h1>
          <BroadCamp items={[broadCampItems]} />
        </div>
        <div ref={contentRef}>{children}</div>
      </div>
    </div>
  );
};

export default LeftSidebarAndComponent;
