"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import { handleCloseSearchModal } from "@/app/utils/slices/search.slice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Input, Button } from "antd";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";

const SearchInput = () => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const nameInput = useRef(null);

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
    if (nameInput.current) {
      nameInput.current.focus();
    }
  }, []);

  return (
    <div>
      <form onSubmit={(e) => navigate(e, searchText)}>
        <Input
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search"
          className="w-full"
          ref={nameInput}
          value={searchText}
          prefix={<SearchOutlined />}
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
