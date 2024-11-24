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
import { DownOutlined } from "@ant-design/icons";

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
        <div className="md:hidden w-1/2">
          <Dropdown overlay={dropdownMenu} trigger={["click"]}>
            <div>
              <Button className="w-full bg-[#46658B] text-white">
                {data.find((item) => item.type === selectedStructureType)
                  ?.label || "Select"}
                <DownOutlined />
              </Button>
            </div>
          </Dropdown>
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
          <div className="flex flex-wrap justify-center gap-4 md:gap-7">
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
                className={`rounded px-6 md:px-12 py-3 md:py-[24.4px] bg-[#DBF2FF] text-[#46658B]`}
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
          <div className="mt-8">
            {selectedStructureType === SectionType.RECTORATE ? (
              isMounted && (
                <Swiper
                  navigation
                  pagination={{ clickable: true }}
                  modules={[Navigation, Pagination]}
                  className="w-full"
                >
                  {structureTypeData.map((item) =>
                    item.staffs.map((staff, index) => (
                      <SwiperSlide key={index}>
                        <StaffUserCard imagePosition="right" staff={staff} />
                      </SwiperSlide>
                    )),
                  )}
                </Swiper>
              )
            ) : (
              <div className="flex flex-col">
                {structureTypeData.map((item) => (
                  <Link
                    href={`/university/structure/${item.slug}`}
                    className="ql-editor bubble text-blue-600 hover:underline text-sm md:text-md"
                    key={item.slug}
                    dangerouslySetInnerHTML={{ __html: item.name }}
                  ></Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default UniversityInfoTable;
