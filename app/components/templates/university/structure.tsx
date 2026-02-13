"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  SectionType,
  structureByType,
  UniversitySection,
  Staff,
} from "@/types/templates/structure.types";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "react-quill/dist/quill.snow.css";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Building2,
  Users,
  GraduationCap,
  Briefcase,
  Building,
  ArrowRight,
  FileText,
  ExternalLink,
  GitBranch,
} from "lucide-react";
import SocialLinks from "@/app/components/UI/SocialLinks";
import { useTranslations } from "next-intl";

// CSS for swiper fix
const swiperStyles = `
  .structure-swiper .swiper-slide {
    height: auto !important;
    opacity: 0 !important;
    visibility: hidden;
    transition: opacity 0.8s ease, visibility 0.8s ease;
  }
  .structure-swiper .swiper-slide-active {
    opacity: 1 !important;
    visibility: visible;
  }
  .structure-swiper .swiper-wrapper {
    align-items: stretch;
  }
`;

const getIconForType = (type: SectionType) => {
  switch (type) {
    case SectionType.RECTORATE:
      return <Users className="w-5 h-5" />;
    case SectionType.OFFICES:
      return <Building2 className="w-5 h-5" />;
    case SectionType.FACULTIES:
      return <GraduationCap className="w-5 h-5" />;
    case SectionType.DEPARTMENT:
      return <Briefcase className="w-5 h-5" />;
    case SectionType.CENTRES:
      return <Building className="w-5 h-5" />;
    default:
      return <Building2 className="w-5 h-5" />;
  }
};

const StaffCard = ({ staff }: { staff: Staff }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      <div className="flex flex-col lg:flex-row" style={{ minHeight: "400px" }}>
        {/* Image */}
        <div className="lg:w-[38%] relative">
          <div className="h-64 lg:h-full relative overflow-hidden bg-gray-100">
            <Image
              width={500}
              height={600}
              src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${staff.image.file_path}`}
              alt={staff.full_name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="lg:w-[62%] p-6 lg:p-8 flex flex-col justify-center">
          <span className="text-text_secondary text-sm font-semibold uppercase tracking-wider">
            {staff.position}
          </span>

          <h3 className="text-text_secondary text-2xl lg:text-[28px] font-bold mt-2 mb-4">
            {staff.full_name}
          </h3>

          <div
            className="ql-editor text-gray-500 text-base leading-relaxed line-clamp-5"
            dangerouslySetInnerHTML={{ __html: staff.description }}
          />

          <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-200">
            <SocialLinks
              className="!mt-0"
              social_network_links={staff.social_network_links}
            />

            {staff.resume_file && (
              <Link
                href={`${process.env.NEXT_PUBLIC_URL_BACKEND}${staff.resume_file.file_path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-text_secondary text-white rounded-lg text-sm font-medium hover:bg-text_secondary/90 transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>CV</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Structure = ({
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
  const [isAnimating, setIsAnimating] = useState(false);
  const t = useTranslations("university.structure");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChangeStructureType = useCallback(
    (type: any) => {
      setIsAnimating(true);
      setTimeout(() => {
        handleChangeStructure(type);
        setTimeout(() => setIsAnimating(false), 50);
      }, 150);
    },
    [handleChangeStructure],
  );

  const handlePrev = () => {
    swiperRef.current?.swiper.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.swiper.slideNext();
  };

  return (
    <article className="mt-8 mb-14">
      {/* Horizontal Tabs — type selection */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-3 mb-6">
        {data.map((item, index) => (
          <button
            key={index}
            onClick={() => handleChangeStructureType(item.type)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedStructureType === item.type
                ? "bg-text_secondary text-white"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            }`}
          >
            {getIconForType(item.type)}
            {item.label}
          </button>
        ))}
        <Link
          href="/university/structure-schema"
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-all duration-200"
        >
          <GitBranch className="w-4 h-4" />
          {t("tree")}
        </Link>
      </div>

      {/* Content with fade animation */}
      <div
        className={`transition-all duration-200 ${isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}
      >
        {selectedStructureType === SectionType.RECTORATE &&
          structureTypeData.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {structureTypeData
                .filter((item) => item.staffs.length > 0)
                .map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setStructureButtonData(item.slug)}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      structureButtonData === item.slug
                        ? "bg-gray-800 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
            </div>
          )}

        {/* Content Area */}
        {selectedStructureType === SectionType.RECTORATE ? (
          isMounted && rectorateContent?.staffs?.length > 0 ? (
            <div className="relative">
              <style>{swiperStyles}</style>
              <Swiper
                ref={swiperRef}
                modules={[EffectFade, Autoplay]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                speed={800}
                autoplay={{ delay: 8000, disableOnInteraction: true }}
                onSlideChange={({ activeIndex }) => setActiveIndex(activeIndex)}
                className="w-full structure-swiper"
              >
                {rectorateContent.staffs.map((staff: Staff, index: number) => (
                  <SwiperSlide key={index}>
                    <StaffCard staff={staff} />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation */}
              {rectorateContent.staffs.length > 1 && (
                <div className="flex items-center justify-center gap-4 mt-6">
                  <button
                    onClick={handlePrev}
                    className="w-10 h-10 rounded-full border border-gray-200 text-gray-500 flex items-center justify-center hover:bg-text_secondary hover:text-white hover:border-text_secondary transition-all duration-200"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {rectorateContent.staffs.map((_: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => swiperRef.current?.swiper.slideTo(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          activeIndex === idx
                            ? "w-8 bg-text_secondary"
                            : "w-2 bg-gray-300 hover:bg-gray-400"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full border border-gray-200 text-gray-500 flex items-center justify-center hover:bg-text_secondary hover:text-white hover:border-text_secondary transition-all duration-200"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <Users className="w-7 h-7 text-gray-400" />
              </div>
              <p className="text-gray-400 text-base">Ma'lumot topilmadi</p>
            </div>
          )
        ) : (
          /* List view for other types */
          <div className="flex flex-col gap-3">
            {structureTypeData.length > 0 ? (
              structureTypeData.map((item, index) => (
                <Link
                  key={item.slug}
                  href={`/university/structure/${item.slug}`}
                  className="group flex items-center gap-4 py-4 px-5 rounded-xl border border-gray-200 bg-white
                  hover:border-text_secondary/20 hover:shadow-sm transition-all duration-200"
                >
                  <span className="text-text_secondary/30 text-lg font-bold flex-shrink-0 w-8 text-center">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-gray-800 text-base font-medium group-hover:text-text_secondary transition-colors line-clamp-1"
                      dangerouslySetInnerHTML={{ __html: item.name }}
                    />
                    {item.staffs.length > 0 && (
                      <p className="text-gray-400 text-sm mt-0.5">
                        {item.staffs.length} xodim
                      </p>
                    )}
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-text_secondary group-hover:translate-x-1 transition-all flex-shrink-0" />
                </Link>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <Building2 className="w-7 h-7 text-gray-400" />
                </div>
                <p className="text-gray-400 text-base">Ma'lumot topilmadi</p>
              </div>
            )}
          </div>
        )}
      </div>
      {/* end fade animation wrapper */}
    </article>
  );
};

export default Structure;
