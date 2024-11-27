import React, { useCallback, useEffect, useState } from "react";
import {
  SectionType,
  structureByType,
  UniversitySection,
} from "@/types/templates/structure.types";
import { Button, Dropdown, Menu, Space } from "antd";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import "react-quill/dist/quill.snow.css";
import StaffUserCard from "@/app/components/UI/staffUserCard";
import { DownCircleFilled, DownOutlined } from "@ant-design/icons";

const UniversityInfoTable = ({
  data,
  structureTypeData,
  structureButtonData,
  setStructureButtonData,
  handleChangeStructure,
  selectedStructureType,
}: {
  data: UniversitySection[];
  structureTypeData: structureByType[];
  handleChangeStructure: any;
  structureButtonData: any;
  setStructureButtonData: any;
  selectedStructureType: string;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChangeStructureType = useCallback((type: any) => {
    handleChangeStructure(type);
  }, []);

  const handleMenuClick = ({ key }: { key: string }) => {
    handleChangeStructureType(key);
  };

  const menu = (
    <Menu
      onClick={({ key }) => setStructureButtonData(key)}
      items={structureTypeData.map((item: any) => ({
        key: item.slug,
        label: item.name,
      }))}
    />
  );

  const dropdownMenu = (
    <Menu
      onClick={handleMenuClick}
      items={data.map((item) => ({
        key: item.type,
        label: item.label,
      }))}
    />
  );

  return (
    <article className="mt-12 mb-14">
      <div className="flex flex-col w-full md:flex-row gap-7 items-start">
        {/* Dropdown for mobile */}
        <div className="hidden items-center max-sm:flex gap-4 w-full justify-between">
          <div className="md:hidden max-sm:w-1/2">
            <Dropdown overlay={dropdownMenu} trigger={["click"]}>
              <div>
                <Button className="w-full py-5 text-lg rounded px-6 md:py-[24.4px] bg-[#46658B] text-white flex items-center justify-between">
                  {data.find((item) => item.type === selectedStructureType)
                    ?.label || "Select"}
                  <DownCircleFilled />
                </Button>
              </div>
            </Dropdown>
          </div>
          <div className="hidden max-sm:w-1/2 flex-wrap max-md:flex justify-center gap-4 md:gap-7">
            {selectedStructureType === SectionType.RECTORATE ? (
              structureTypeData.map((item, index) => (
                <Dropdown overlay={menu} className="w-full" trigger={["click"]}>
                  <div>
                    <Button className="w-full text-lg rounded px-6 py-5 md:py-[24.4px] bg-[#DBF2FF] text-[#46658B] flex items-center justify-between">
                      {structureTypeData.find(
                        (item: any) => item.slug === structureButtonData,
                      )?.name || "Select Option"}
                      <DownCircleFilled />
                    </Button>
                  </div>
                </Dropdown>
              ))
            ) : (
              <Button
                className={`rounded px-6 md:px-12 py-3 w-full md:py-[24.4px] bg-[#DBF2FF] text-[#46658B]`}
                size="large"
              >
                {
                  (data as any).find(
                    (item: any) => item.type === selectedStructureType,
                  ).label
                }
              </Button>
            )}
          </div>
        </div>

        {/* Sidebar buttons for larger screens */}
        <div className="hidden md:flex flex-col gap-4 translate-y-20 ">
          {data.map((item, index) => (
            <Button
              onClick={() => handleChangeStructureType(item.type)}
              className={`rounded px-12 py-[24.4px] ${
                selectedStructureType === item.type
                  ? "bg-[#46658B] text-white"
                  : "bg-[#DBF2FF] text-[#46658B]"
              }`}
              size="large"
              key={index}
            >
              {item.label}
            </Button>
          ))}
        </div>

        {/* Main content section */}
        <div className="w-full md:w-4/5">
          <div className="flex flex-wrap max-md:hidden justify-center gap-4 md:gap-7">
            {selectedStructureType === SectionType.RECTORATE ? (
              structureTypeData.map((item, index) => (
                <Button
                  onClick={() => setStructureButtonData(item.slug)}
                  className={`rounded px-6 md:px-12 py-3 md:py-[24.4px] text-sm md:text-md ${
                    structureButtonData === item.slug
                      ? "bg-[#46658B] text-white"
                      : "bg-[#DBF2FF] text-[#46658B]"
                  }`}
                  size="large"
                  key={index}
                >
                  {item.name}
                </Button>
              ))
            ) : (
              <Button
                className={`rounded px-6 md:px-12 py-3 md:py-[24.4px] bg-[#46658B] text-white`}
                size="large"
              >
                {
                  (data as any).find(
                    (item: any) => item.type === selectedStructureType,
                  ).label
                }
              </Button>
            )}
          </div>
          {/* Content */}
          <div className="mt-8 max-md:mt-2">
            {selectedStructureType === SectionType.RECTORATE ? (
              isMounted && (
                <Swiper
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Navigation, Pagination]}
                  className="w-full"
                >
                  {structureTypeData.map((item: any) =>
                    item.staffs.map((staff: any, index: number) => (
                      <SwiperSlide key={index} className="max-md:py-9">
                        <StaffUserCard imagePosition="right" staff={staff} />
                      </SwiperSlide>
                    )),
                  )}
                </Swiper>
              )
            ) : (
              <ul className="flex max-md:ml-4 flex-col">
                {structureTypeData.map((item) => (
                  <li className="list-disc text-[#46658B]">
                    <Link
                      href={`/university/structure/${item.slug}`}
                      className="list-decimal underline max-md:text-sm text-lg"
                      key={item.slug}
                      dangerouslySetInnerHTML={{ __html: item.name }}
                    ></Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default UniversityInfoTable;
