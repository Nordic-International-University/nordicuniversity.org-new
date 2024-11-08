"use client";

import React, { useState, useEffect, ReactElement } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
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
  { value: "en", label: "EN", flagImage: US },
  { value: "ru", label: "РУ", flagImage: RU },
  { value: "uz", label: "O‘Z", flagImage: UZ },
];

const LanguageSelect: React.FC = () => {
  const router = useRouter();
  const [language, setLanguage] = useState<string>("uz");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const cookieLang = Cookies.get("lang");
    if (cookieLang && languages.some((lang) => lang.value === cookieLang)) {
      setLanguage(cookieLang);
    }
  }, []);

  const handleLanguageChange = (lang: LanguageOption) => {
    setLanguage(lang.value);
    setIsOpen(false);

    Cookies.set("lang", lang.value, { path: "/" });

    const currentPath = window.location.pathname;
    const newPath = `/${lang.value}${currentPath.replace(/^\/[a-z]{2}/, "")}`;
    window.scrollTo(0, 0);
    router.push(newPath);
  };

  return (
    <div className="relative overflow-hidden hover:w-36 hover-lang ease-in-out transition-all group w-16">
      <div
        className="flex justify-between items-center gap-2 w-full rounded-md border border-gray-300 shadow-sm px-4 py-1 text-sm font-medium text-gray-700 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaEarthAmericas className="absolute text-white left-2 text-[16px]" />
        <div className="ml-5">
          <div className="flex ease-in-out transition-transform -translate-x-1 group-hover:-translate-x-2 group-hover:opacity-100 items-center gap-2.5">
            {languages.map((lang) => (
              <>
                <button
                  key={lang.value}
                  onClick={() => handleLanguageChange(lang)}
                  className={`flex items-center group/scoped transition-transform group-hover:static group-hover:translate-x-4 ${
                    lang.value !== language ? "translate-x-32" : "absolute"
                  } ${
                    lang.value === language ? "text-white" : "text-gray-400"
                  }  w-full text-md font-semibold`}
                >
                  <span className="group-hover/scoped:hidden block">
                    {lang.label}
                  </span>
                  <Image
                    className="group-hover/scoped:scale-100 scale-0"
                    width={20}
                    height={20}
                    src={lang.flagImage}
                    alt={lang.value}
                  />
                </button>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelect;
