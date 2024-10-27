"use client";

import React from "react";
import { LayoutSidebarProps } from "@/types/templates/layout.types";
import Link from "next/link";
import BroadCamp from "@/app/components/UI/broadCump";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

const LeftSidebarAndComponent = ({
  children,
  sidebarItems,
  sidebarTitle,
  broadCampItems,
  translationKey,
}: LayoutSidebarProps) => {
  const router = usePathname();
  const t = useTranslations(translationKey);

  return (
    <>
      <div className="flex mt-12 gap-6 items-start container justify-between">
        <ul className="w-1/5 max-lg:hidden flex flex-col gap-2.5">
          {sidebarItems.map((item, index) => {
            const isActive = router.includes(item.url);

            return (
              <li
                key={index}
                className={`py-1 text-md rounded-lg pl-2 ${
                  isActive
                    ? "bg-text_tertiary text-tertiary"
                    : "text-tertiary underline"
                }`}
              >
                {item.url ? (
                  <Link href={item.url}>{t(item.name)}</Link>
                ) : (
                  <span>{item.name}</span>
                )}
              </li>
            );
          })}
        </ul>
        <div className="w-4/5 max-lg:w-full">
          <div>
            <h2 className="text-tertiary max-sm:text-center text-2xl font-semibold pb-3">
              {sidebarTitle}
            </h2>
            <BroadCamp items={[broadCampItems]} />
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default LeftSidebarAndComponent;
