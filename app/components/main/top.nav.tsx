"use client";

import React, { useEffect, useState } from "react";
import LanguageSelect from "@/app/components/UI/language.select";
import Link from "next/link";
import { Dropdown, Modal, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { usePathname } from "next/navigation";
import { Timetable } from "@/types/templates/partners.types";
import { SearchIcon } from "@nextui-org/shared-icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";
import {
  handleCloseSearchModal,
  handleOpenSearchModal,
} from "@/app/utils/slices/search.slice";
import SearchModal from "@/app/components/UI/searchModal";
import { BiCommand } from "react-icons/bi";
import SearchInput from "@/app/components/main/searchInput";
import SocialMedia from "@/app/components/UI/socialMedia";
import { useTranslations } from "next-intl";

const TopNav = ({ props }: { props: Timetable[]; networks: any }) => {
  const pathname = usePathname();
  const t = useTranslations("nav");
  const [searchText, _] = useState("");
  const menuItems = useSelector(
    (state: RootState) => state.menuSlice.activeMenu,
  );
  const { isOpenSearch } = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();
  const items: any = props.slice(4, props.length - 1).map((item, index) => {
    return {
      label: (
        <Link target="_blank" href={item.link}>
          {item.name}
        </Link>
      ),
      key: index.toString(),
    };
  });

  const isHomePage = /^\/(uz|en|ru)?\/?$/.test(pathname);
  const navClass =
    isHomePage || menuItems ? "nav-bg-opacity" : "bg-dark_blue_color";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        dispatch(handleOpenSearchModal());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  return (
    <div
      className={`py-4 ${navClass} border-b-[0.1px] resources-translate border-white border-opacity-30 z-20 transition-colors bg-opacity-50`}
    >
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center max-lg:hidden gap-5">
              <div
                onClick={() => dispatch(handleOpenSearchModal())}
                className="px-4 py-2 flex items-center gap-2 bg-[#1E4A7D] hover:bg-[#1E4A7D] transition-opacity duration-200 rounded-full cursor-pointer"
              >
                <SearchIcon className="text-white" />
                <div className="flex text-white font-semibold items-center gap-1">
                  <BiCommand className="text-white text-lg" />
                  <span>+</span>
                  <span>K</span>
                </div>
              </div>

              <Modal
                onCancel={() => dispatch(handleCloseSearchModal())}
                open={isOpenSearch}
                width={800}
                title="Qidiruv"
                footer={null}
              >
                <SearchInput />

                <SearchModal searchModal={searchText} />
              </Modal>
              <ul className="flex items-center text-white gap-5">
                {props.slice(0, 4).map((resource, index) => (
                  <Link
                    className="uppercase"
                    href={resource.link}
                    key={index}
                    target="_blank"
                  >
                    <li>{resource.name}</li>
                  </Link>
                ))}
              </ul>
              <Dropdown menu={{ items }} trigger={["click"]}>
                <div
                  className="cursor-pointer  text-white"
                  onClick={(e) => e.preventDefault()}
                >
                  <Space>
                    {t("more")}
                    <DownOutlined />
                  </Space>
                </div>
              </Dropdown>
            </div>
          </div>
          <div className="flex items-center max-lg:justify-between max-lg:w-full gap-6">
            <LanguageSelect color={"white"} />
            <SocialMedia color="white" />
          </div>
        </div>
        <div className="max-lg:flex hidden max-lg:mt-6 items-center gap-5">
          <ul
            className="flex flex-wrap text-[11px] items-center justify-center
           text-white gap-5"
          >
            {props.map((resource, index) => (
              <Link
                href={resource.link}
                key={index}
                className="uppercase"
                target="_blank"
              >
                <li>{resource.name}</li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
