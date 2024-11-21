import React, { useCallback, useEffect, useState } from "react";
import {
  SectionType,
  structureByType,
  UniversitySection,
} from "@/types/templates/structure.types";
import { Button } from "antd";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import "react-quill/dist/quill.snow.css";
import StaffUserCard from "@/app/components/UI/staffUserCard";

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

  const handleChangeStructureType = useCallback((e: any) => {
    handleChangeStructure(e);
  }, []);
  console.log(data);
  return (
    <article className="mt-12 mb-14">
      <div className="flex gap-7 items-start">
        <div className="flex flex-col gap-4 translate-y-20">
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
        <div className="w-4/5">
          <div className="flex items-center justify-center gap-7">
            {selectedStructureType === SectionType.RECTORATE ? (
              <>
                {structureTypeData.map((item, index) => (
                  <Button
                    onClick={() => setStructureButtonData(item.slug)}
                    className={`rounded px-12 py-[24.4px] ${
                      structureButtonData === item.slug
                        ? "bg-[#46658B] text-white"
                        : "bg-[#DBF2FF] text-[#46658B]"
                    }`}
                    size="large"
                    key={index}
                  >
                    {item.name}
                  </Button>
                ))}
              </>
            ) : (
              <Button
                className={`rounded px-12 py-[24.4px] bg-[#DBF2FF] text-[#46658B]`}
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
                    className="ql-editor bubble text-blue-600 hover:underline"
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
