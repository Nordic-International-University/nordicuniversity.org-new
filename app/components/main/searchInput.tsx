"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import { handleCloseSearchModal } from "@/app/utils/slices/search.slice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Input, Button, InputRef } from "antd";

import { SearchOutlined, CloseOutlined } from "@ant-design/icons";

const SearchInput = () => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const nameInput = useRef<InputRef>(null);

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
      <form onSubmit={(e) => navigate(e, searchText)}>
        <Input
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Qidirish"
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
      </form>
    </div>
  );
};

export default SearchInput;
