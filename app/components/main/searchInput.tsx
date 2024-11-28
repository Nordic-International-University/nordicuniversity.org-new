"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import { handleCloseSearchModal } from "@/app/utils/slices/search.slice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Input, Button, InputRef } from "antd";

import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";

const SearchInput = () => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const nameInput = useRef<InputRef>(null);
  const t = useTranslations("search");

  const navigate = (e: FormEvent, text: string) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(handleCloseSearchModal());
      router.push(`/search/${text}`);
    }
  };

  const clearInput = () => {
    setSearchText("");
    nameInput.current && nameInput.current.focus();
  };

  useEffect(() => {
    nameInput.current?.focus();
  }, []);

  return (
    <div>
      <form
        className="flex items-center gap-1"
        onSubmit={(e) => navigate(e, searchText)}
      >
        <Input
          onChange={(e) => setSearchText(e.target.value)}
          placeholder={t("searchText")}
          className="w-full"
          ref={nameInput}
          value={searchText}
          prefix={<SearchOutlined size={100} />}
          suffix={
            searchText && (
              <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={clearInput}
                size="small"
              />
            )
          }
        />
        <Button htmlType="submit">{t("searchText")}</Button>
      </form>
    </div>
  );
};

export default SearchInput;
