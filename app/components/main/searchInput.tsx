"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import { handleCloseSearchModal } from "@/app/utils/slices/search.slice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { HiOutlineSearch, HiOutlineX } from "react-icons/hi";

const SearchInput = () => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations("search");

  const navigate = (e: FormEvent, text: string) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(handleCloseSearchModal());
      router.push(`/search/${text}`);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={(e) => navigate(e, searchText)}
    >
      <div className="relative flex-1">
        <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
        <input
          ref={inputRef}
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder={t("searchText")}
          className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm
            focus:outline-none focus:border-text_secondary/40 transition-colors"
        />
        {searchText && (
          <button
            type="button"
            onClick={() => {
              setSearchText("");
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400
              hover:text-gray-600 transition-colors"
          >
            <HiOutlineX className="text-base" />
          </button>
        )}
      </div>
      <button
        type="submit"
        className="px-5 py-2.5 bg-text_secondary text-white text-sm font-medium
          rounded-lg hover:bg-text_secondary/90 transition-colors"
      >
        {t("searchText")}
      </button>
    </form>
  );
};

export default SearchInput;
