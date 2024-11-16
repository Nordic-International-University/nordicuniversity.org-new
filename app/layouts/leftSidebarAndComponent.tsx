"use client";

import React, { useRef, useEffect, useState } from "react";
import { LayoutSidebarProps } from "@/types/templates/layout.types";
import Link from "next/link";
import BroadCamp from "@/app/components/UI/broadCump";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Montserrat } from "next/font/google";
import { gsap } from "gsap";

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
  const contentRef = useRef<HTMLDivElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (activeIndex !== null && linkRefs.current[activeIndex]) {
      const activeLink = linkRefs.current[activeIndex];
      if (activeLink) {
        setSpanStyles({
          top: activeLink.offsetTop,
          height: activeLink.clientHeight,
        });

        if (spanRef.current) {
          gsap.fromTo(
            spanRef.current,
            { width: 0 },
            { width: "100%", duration: 0.5, ease: "power3.out" },
          );
        }
      }
    }
  }, [activeIndex, router]);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: -100 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
      );
    }
  }, [router]);

  return (
    <div
      className={`flex mt-12 gap-6 items-start container justify-between ${Montserrat_font.className}`}
    >
      <ul className="min-w-[19%] max-lg:hidden flex flex-col gap-2.5 relative">
        <span
          ref={spanRef}
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
              <div className="flex items-center">
                {isActive && (
                  <span
                    style={{ height: spanStyles.height - 5 }}
                    className="bg-[#7A98C1] relative -left-2 top-1 block w-1"
                  ></span>
                )}
                <li
                  ref={(el: any) => (linkRefs.current[index] = el)}
                  onClick={() => setActiveIndex(index)}
                  className={`py-1 w-full text-md relative top-1 rounded-lg pl-2 relative z-10 ${
                    isActive ? "text-tertiary" : "text-tertiary underline"
                  }`}
                >
                  {t(item.name)}
                </li>
              </div>
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
        <div ref={contentRef}>{children}</div>
      </div>
    </div>
  );
};

export default LeftSidebarAndComponent;
