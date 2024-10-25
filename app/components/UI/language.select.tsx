"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import ReactCountryFlag from "react-country-flag";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useRouter } from "next/navigation";

interface LanguageOption {
  value: string;
  label: string;
  countryCode: string;
}

const languages: LanguageOption[] = [
  { value: "en", label: "Ingilizcha", countryCode: "US" },
  { value: "ru", label: "Ruscha", countryCode: "RU" },
  { value: "uz", label: "O’zbekcha", countryCode: "UZ" },
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

  const selectedLanguage = languages.find((lang) => lang.value === language);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="flex justify-between items-center gap-2 w-full rounded-md border border-gray-300 shadow-sm px-4 py-1  text-sm font-medium text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedLanguage && (
            <div className="flex items-center">
              <ReactCountryFlag
                className="rounded-md"
                countryCode={selectedLanguage.countryCode}
                svg
                style={{
                  width: "1.5em",
                  height: "1.5em",
                  marginRight: "0.5em",
                }}
                title={selectedLanguage.label}
              />
            </div>
          )}
          <MdOutlineKeyboardArrowDown className="text-white text-xl" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right z-10 backdrop-blur-sm absolute right-0 mt-2 w-full rounded-md shadow-lg  ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {languages.map((lang, index) => (
              <button
                key={index}
                onClick={() => handleLanguageChange(lang)}
                className="flex mt-2 items-center w-full px-4 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                <ReactCountryFlag
                  className="rounded-md"
                  countryCode={lang.countryCode}
                  svg
                  style={{
                    width: "1.5em",
                    height: "1.5em",
                    marginRight: "0.5em",
                  }}
                  title={lang.label}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelect;
