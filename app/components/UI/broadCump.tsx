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

const BroadCamp = ({ items }: { items: { name: string; url: string }[][] }) => {
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
    <div className="relative flex items-center gap-2 text-brodCrumbColor max-sm:justify-center ">
      <Image
        className="absolute left-[-20px] -top-48 w-52 bg-blur-left hidden max-sm:block"
        src={bg_blur_left}
        alt="bg_blur_left"
      />

      <Link className="hidden max-sm:block" href={`/${getCurrentLang()}`}>
        <TbHome className="text-lg" />
      </Link>

      <Link className="block max-sm:hidden" href={`/${getCurrentLang()}`}>
        {t("document.main_menu")}
      </Link>

      <span>/</span>

      {items[0].map((item, index) => (
        <React.Fragment key={index}>
          <Link href={item.url} className="hover:underline">
            {item.name}
          </Link>
          {index < items[0].length - 1 && <span>/</span>}
        </React.Fragment>
      ))}

      <Image
        className="absolute right-[-20px] -top-40 w-56 bg-blur-right hidden max-sm:block"
        src={bg_blur_right}
        alt="bg_blur_right"
      />
    </div>
  );
};

export default BroadCamp;
