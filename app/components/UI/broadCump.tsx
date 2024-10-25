"use client";

import React from "react";
import Link from "next/link";
import getCurrentLang from "@/app/helpers/getCurrentLang";
import { useTranslations } from "next-intl";

const BroadCamp = ({ items }: { items: any[] }) => {
  const t = useTranslations("university");
  return (
    <div className="flex gap-2 items-center">
      <Link href={`/${getCurrentLang()}`}>{t("sectionTitle")}</Link>
      <span>/</span>
      {items.map((item, index) => (
        <Link key={index} href={item.url}>
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default BroadCamp;
