"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import LanguageSelect from "@/app/components/UI/language.select";
import Link from "next/link";
import { Dropdown, Input, Modal, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import { Timetable } from "@/types/templates/partners.types";
import Image from "next/image";
import { SearchIcon } from "@nextui-org/shared-icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";
import {
  handleCloseSearchModal,
  handleOpenSearchModal,
} from "@/app/utils/slices/search.slice";
import SearchModal from "@/app/components/UI/searchModal";
import { BiCommand } from "react-icons/bi";
import { router } from "next/client";
import SearchInput from "@/app/components/main/searchInput";

const TopNav = ({ props, networks }: { props: Timetable[]; networks: any }) => {
  const pathname = usePathname();
  const [searchText, setSearchText] = useState("");
  const { isOpenSearch } = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();
  const items: any = props.slice(4, props.length - 1).map((item, index) => {
    return { label: item.name, key: index.toString() };
  });

  const isHomePage = /^\/(uz|en|ru)?\/?$/.test(pathname);
  const navClass = isHomePage ? "nav-bg-opacity" : "bg-dark_blue_color";
  const router = useRouter();

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
      className={`py-4 ${navClass} border-b-[0.1px] resources-translate border-white border-opacity-30 sticky z-20 bg-opacity-50`}
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
                  <Link className="uppercase" href={resource.link} key={index}>
                    <li>{resource.name}</li>
                  </Link>
                ))}
              </ul>
              <Dropdown menu={{ items }} trigger={["click"]}>
                <a
                  className="cursor-pointer lowercase text-white"
                  onClick={(e) => e.preventDefault()}
                >
                  <Space>
                    Yana
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>
          </div>
          <div className="flex max-lg:w-full flex-row-reverse items-center justify-between gap-6">
            <div className="flex text-white items-center gap-3 max-sm:gap-1.5">
              {networks.map((item: any, index: number) => (
                <React.Fragment key={index}>
                  <Link href={item.link}>
                    <Image
                      className="fill-white"
                      style={{
                        filter:
                          "invert(1) sepia(1) saturate(5) hue-rotate(180deg)",
                      }}
                      width={18}
                      height={18}
                      src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${item.icon.file_path}`}
                      alt={item.name}
                    />
                  </Link>
                  {index < networks.length - 1 && (
                    <span className="block bg-white h-[20px] w-[0.5px]"></span>
                  )}
                </React.Fragment>
              ))}
            </div>
            <LanguageSelect />
          </div>
        </div>
        <div className="max-lg:flex hidden max-lg:mt-6 items-center gap-5">
          <ul
            className="flex flex-wrap items-center justify-center
           text-white gap-5"
          >
            {props.map((resource, index) => (
              <Link href={resource.link} key={index}>
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
