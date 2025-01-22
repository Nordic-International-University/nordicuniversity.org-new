import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  SectionType,
  structureByType,
  UniversitySection,
} from "@/types/templates/structure.types";
import { Button, Dropdown, Menu } from "antd";
import Link from "next/link";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "react-quill/dist/quill.snow.css";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import StaffUserCardReverse from "@/app/components/UI/staffUserCardReverse";
import { DownCircleFilled } from "@ant-design/icons";

const UniversityInfoTable = ({
  data,
  structureTypeData,
  structureButtonData,
  setStructureButtonData,
  handleChangeStructure,
  selectedStructureType,
  rectorateContent,
}: {
  data: UniversitySection[];
  structureTypeData: structureByType[];
  handleChangeStructure: any;
  structureButtonData: any;
  setStructureButtonData: any;
  selectedStructureType: string;
  rectorateContent: any;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const swiperRef = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  console.log(structureTypeData);

  const handleChangeStructureType = useCallback((type: any) => {
    handleChangeStructure(type);
    console.log(type);
  }, []);

  const handleMenuClick = ({ key }: { key: string }) => {
    handleChangeStructureType(key);
    console.log(key);
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

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handleDotClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index);
      setActiveIndex(index);
    }
  };

  return (
    <article className="mt-12 mb-14">
      <div className="flex flex-col w-full md:flex-row gap-7 items-start">
        <div className="hidden items-center max-sm:flex gap-4 w-full justify-between">
          <div
            className={`md:hidden ${
              selectedStructureType === SectionType.RECTORATE
                ? "max-sm:w-1/2"
                : "max-sm:w-full"
            }`}
          >
            <Dropdown overlay={dropdownMenu} trigger={["click"]}>
              <div>
                <Button className="w-full  py-5 text-lg rounded px-6 md:py-[24.4px] bg-[#46658B] text-white flex items-center justify-between">
                  {data.find((item) => item.type === selectedStructureType)
                    ?.label || "Select"}
                  <DownCircleFilled />
                </Button>
              </div>
            </Dropdown>
          </div>

          <div
            className={`hidden max-sm:w-1/2 ${selectedStructureType === SectionType.RECTORATE ? "" : "max-md:hidden"} flex-wrap max-md:flex justify-center gap-4 md:gap-7`}
          >
            {selectedStructureType === SectionType.RECTORATE ? (
              <Dropdown
                overlay={
                  <Menu
                    onClick={(key) => {
                      setStructureButtonData(key.key);
                    }}
                    items={structureTypeData?.map((item: any) => ({
                      key: item.slug,
                      label: item.name,
                    }))}
                  />
                }
                className="w-full"
                trigger={["click"]}
              >
                <div>
                  <Button className="w-full text-lg rounded px-6 py-5 md:py-[24.4px] bg-[#DBF2FF] text-[#46658B] flex items-center justify-between">
                    {structureTypeData.find(
                      (item: any) => item.slug === structureButtonData,
                    )?.name || "Select Option"}{" "}
                    <DownCircleFilled />
                  </Button>
                </div>
              </Dropdown>
            ) : (
              ""
            )}
          </div>
        </div>
        {/* Sidebar buttons for larger screens */}
        <div className="hidden md:flex flex-col gap-4 translate-y-20 ">
          {data.map((item, index) => (
            <Button
              onClick={() => handleChangeStructureType(item.type)}
              className={`rounded px-12 py-5 ${
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
          <hr className="w-full bg-black h-[1px]" />
          <Button
            href="/university/structure-schema"
            className="bg-[#DBF2FF]"
            size="large"
          >
            daraxt ko'rinishida
          </Button>
        </div>
        <div className="w-full md:w-4/5">
          <div className="flex flex-wrap max-md:hidden justify-center gap-4 md:gap-7">
            {selectedStructureType === SectionType.RECTORATE ? (
              structureTypeData
                .filter((item) => item.staffs.length > 0)
                .map((item, index) => (
                  <Button
                    onClick={() => {
                      setStructureButtonData(item.slug);
                    }}
                    className={`rounded px-6 md:px-12 py-3 md:py-5 text-sm md:text-md ${
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
                <div>
                  <Swiper
                    onSlideChange={({ activeIndex }) =>
                      setActiveIndex(activeIndex)
                    }
                    ref={swiperRef}
                    modules={[]}
                    className="w-full h-auto"
                  >
                    {rectorateContent?.staffs?.map(
                      (staff: any, index: number) => (
                        <SwiperSlide key={index}>
                          <StaffUserCardReverse
                            imagePosition="right"
                            staff={staff}
                          />
                        </SwiperSlide>
                      ),
                    )}
                  </Swiper>
                  <div className="flex gap-4 justify-center mt-4">
                    <button
                      onClick={handlePrev}
                      className="p-2 bg-[#DBF2FF] text-[#46658B] rounded-full hover:bg-[#46658B] hover:text-white"
                    >
                      <FaChevronLeft size={15} />
                    </button>
                    <div className="flex gap-3 items-center">
                      {rectorateContent?.staffs?.map(
                        (staff: any, staffIndex: number) => (
                          <span
                            key={staffIndex}
                            onClick={() => handleDotClick(staffIndex)}
                            className={`h-2 w-2 rounded-full cursor-pointer transition-all duration-300 ${
                              activeIndex === staffIndex
                                ? "bg-[#46658B]"
                                : "bg-[#DBF2FF]"
                            }`}
                          />
                        ),
                      )}
                    </div>
                    <button
                      onClick={handleNext}
                      className="p-2 bg-[#DBF2FF] text-[#46658B] rounded-full hover:bg-[#46658B] hover:text-white"
                    >
                      <FaChevronRight size={15} />
                    </button>
                  </div>
                </div>
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
