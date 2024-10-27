"use client";

import React from "react";
import Link from "next/link";
import getCurrentLang from "@/app/helpers/getCurrentLang";
import { useTranslations } from "next-intl";
import bg_blur_left from "@/public/svg/bg-blur-left.svg";
import bg_blur_right from "@/public/svg/bg-blur-left.svg";
import { TbHome } from "react-icons/tb";

const BroadCamp = ({ items }: { items: any[] }) => {
  const t = useTranslations("university");

  return (
    <div className="text-brodCrumbColor max-sm:justify-center flex gap-2 items-center">
      <Link className="max-sm:hidden block" href={`/${getCurrentLang()}`}>
        {t("document.main_menu")}
      </Link>

      <TbHome className="max-sm:block hidden" />
      <span>/</span>
      {items[0].map((item: any, index: number) => (
        <React.Fragment key={index}>
          <Link href={item.url}>{item.name}</Link>
          {index < items[0].length - 1 && <span>/</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default BroadCamp;
