"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import getCurrentLang from "@/app/helpers/getCurrentLang";
import { useTranslations } from "next-intl";
import bg_blur_left from "@/public/svg/bg-blur-left.svg";
import bg_blur_right from "@/public/svg/bg-blur-right.svg";
import { TbHome } from "react-icons/tb";
import Image from "next/image";
import { gsap } from "gsap";

const BroadCamp = ({ items }: { items: any[] }) => {
  const t = useTranslations("university");

  useEffect(() => {
    gsap.fromTo(
      ".bg-blur-left",
      { left: "-100px", opacity: 0 },
      { left: "-20px", opacity: 1, duration: 1, ease: "power3.out" },
    );

    gsap.fromTo(
      ".bg-blur-right",
      { right: "-100px", opacity: 0 },
      { right: "-20px", opacity: 1, duration: 1, ease: "power3.out" },
    );
  }, []);

  return (
    <div className="text-brodCrumbColor relative max-sm:justify-center flex gap-2 items-center">
      <Image
        className="absolute w-52 -top-48 max-sm:block hidden left-[-20px] bg-blur-left"
        src={bg_blur_left}
        alt="bg_blur_left"
      />
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
      <Image
        className="absolute w-56 max-sm:block hidden -top-40 right-[-20px] bg-blur-right"
        src={bg_blur_right}
        alt="bg_blur_right"
      />
    </div>
  );
};

export default BroadCamp;
