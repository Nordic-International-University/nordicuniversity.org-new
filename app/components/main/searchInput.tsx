"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import { handleCloseSearchModal } from "@/app/utils/slices/search.slice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Input, Button, InputRef } from "antd";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";

const SearchInput = () => {
  const [searchText, setSearchText] = useState(""); // Qidiruv matni
  const dispatch = useDispatch();
  const router = useRouter();
  const nameInput = useRef<InputRef>(null);
  const t = useTranslations("search");

  const navigate = (e: FormEvent, text: string) => {
    e.preventDefault(); // Form yuborilishi oldini olish
    if (text.trim()) {
      dispatch(handleCloseSearchModal()); // Modalni yopish
      router.push(`/search/${text}`); // Qidiruv sahifasiga yo'naltirish
    }
  };

  const clearInput = () => {
    setSearchText(""); // Inputni tozalash
    nameInput.current && nameInput.current.focus(); // Focusni qayta tiklash
  };

  useEffect(() => {
    nameInput.current?.focus(); // Inputga avtomatik fokus qo'yish
  }, []);

  return (
    <div>
      <form
        className="flex items-center gap-1"
        onSubmit={(e) => navigate(e, searchText)}
      >
        <Input
          onChange={(e) => setSearchText(e.target.value)} // Qidiruv matnini o'zgartirish
          placeholder={t("searchText")} // Placeholderni tarjima qilish
          className="w-full"
          ref={nameInput}
          value={searchText} // Inputni qidiruv matni bilan bog'lash
          prefix={<SearchOutlined size={100} />} // Ikonka
          suffix={
            searchText && (
              <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={clearInput} // Inputni tozalash
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
