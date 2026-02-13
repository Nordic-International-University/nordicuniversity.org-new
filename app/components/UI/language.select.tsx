"use client";

import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";

interface LanguageOption {
  value: string;
  label: string;
}

const languages: LanguageOption[] = [
  { value: "uz", label: "O'Z" },
  { value: "en", label: "EN" },
  { value: "ru", label: "РУ" },
];

const LanguageSelect = ({ color }: { color: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [language, setLanguage] = useState<string>("uz");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
    }
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: LanguageOption) => {
    setLanguage(lang.value);
    setIsOpen(false);
    Cookies.set("lang", lang.value, { path: "/" });
    window.scrollTo(0, 0);
    const currentPath = pathname.split("/").slice(2).join("/") || "";
    const newPath = `/${lang.value}/${currentPath}`;
    router.push(newPath);
  };

  const isWhite = color === "white";
  const currentLang = languages.find((l) => l.value === language);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
          isWhite
            ? "text-white/90 hover:text-white hover:bg-white/10"
            : "text-text_secondary hover:bg-gray-100"
        }`}
      >
        <span>{currentLang?.label}</span>
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden z-50 min-w-[80px]">
          {languages.map((lang) => (
            <button
              key={lang.value}
              onClick={() => handleLanguageChange(lang)}
              className={`w-full px-4 py-2 text-sm text-left transition-colors ${
                lang.value === language
                  ? "bg-text_secondary/5 text-text_secondary font-semibold"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelect;
