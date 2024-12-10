"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { FaEarthAmericas } from "react-icons/fa6";
import UZ from "@/public/svg/UZ.svg";
import RU from "@/public/svg/RU.svg";
import US from "@/public/svg/US.svg";
import Image from "next/image";

interface LanguageOption {
  value: string;
  label: string;
  flagImage: any;
}

const languages: LanguageOption[] = [
  { value: "uz", label: "O‘Z", flagImage: UZ },
  { value: "en", label: "EN", flagImage: US },
  { value: "ru", label: "РУ", flagImage: RU },
];

const fetchDefaultLanguage = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/core/language`,
    );
    const data = await res.json();
    return data.language || "uz";
  } catch (error) {
    console.error("Failed to fetch default language:", error);
    return "uz";
  }
};

const LanguageSelect = ({ color }: { color: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [language, setLanguage] = useState<string>("uz");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const setInitialLanguage = async () => {
      const pathLang = pathname.split("/")[1];
      const cookieLang = Cookies.get("lang");

      if (languages.some((lang) => lang.value === pathLang)) {
        setLanguage(pathLang);
        Cookies.set("lang", pathLang, { path: "/" });
      } else if (
        cookieLang &&
        languages.some((lang) => lang.value === cookieLang)
      ) {
        setLanguage(cookieLang);
      } else {
        const defaultLang = await fetchDefaultLanguage();
        setLanguage(defaultLang);
        Cookies.set("lang", defaultLang, { path: "/" });
      }
    };
    setInitialLanguage();
  }, [pathname]);

  useEffect(() => {
    const pathLang = pathname.split("/")[1];
    if (
      pathLang &&
      pathLang !== language &&
      languages.some((lang) => lang.value === pathLang)
    ) {
      setLanguage(pathLang);
    }
  }, [pathname, language]);

  const handleLanguageChange = (lang: LanguageOption) => {
    setLanguage(lang.value);
    setIsOpen(false);
    Cookies.set("lang", lang.value, { path: "/" });

    const newPath = `/${lang.value}${pathname.replace(/^\/[a-z]{2}/, "")}`;
    window.scrollTo(0, 0);
    router.push(newPath);
  };

  return (
    <div className="relative overflow-hidden hover:w-36 hover-lang ease-in-out transition-all group w-16">
      <div
        className="flex justify-between items-center gap-2 w-full rounded-md border border-gray-300 shadow-sm px-4 py-1 text-sm font-medium text-gray-700 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaEarthAmericas
          style={{ color: color }}
          className="absolute left-2 text-[16px]"
        />
        <div className="ml-5">
          <div className="flex ease-in-out transition-transform -translate-x-1 group-hover:-translate-x-2 group-hover:opacity-100 items-center gap-2.5">
            {languages.map((lang) => (
              <button
                key={lang.value}
                onClick={() => handleLanguageChange(lang)}
                className={`flex items-center group/scoped transition-transform group-hover:static group-hover:translate-x-4 ${
                  lang.value !== language ? "translate-x-32" : "absolute"
                } ${lang.value === language ? `text-[${color}]` : "text-gray-400"} w-full text-md font-semibold`}
                style={{ color: lang.value === language ? color : undefined }} // Dynamically set color for the selected language
              >
                <span className="group-hover/scoped:text-white transition-all">
                  {lang.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelect;
