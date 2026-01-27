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

// Modern Staff Card Component
const StaffCard = ({ staff }: { staff: Staff }) => {
  return (
    <div className="bg-white rounded-2xl border border-tertiary/10 overflow-hidden shadow-xl">
      <div className="flex flex-col lg:flex-row" style={{ minHeight: '420px' }}>
        {/* Image Section */}
        <div className="lg:w-2/5 relative">
          <div className="h-64 lg:h-full relative overflow-hidden bg-gradient-to-br from-text_secondary/20 to-tertiary/20">
            <Image
              width={500}
              height={600}
              src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${staff.image.file_path}`}
              alt={staff.full_name}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-tertiary/80 via-tertiary/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-white/10" />

            {/* Position badge on mobile */}
            <div className="absolute bottom-4 left-4 right-4 lg:hidden">
              <span className="inline-block px-4 py-2 bg-white/95 backdrop-blur-sm rounded-xl text-text_secondary text-sm font-semibold shadow-lg">
                {staff.position}
              </span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="lg:w-3/5 p-6 lg:p-8 flex flex-col justify-center">
          {/* Position - Desktop */}
          <div className="hidden lg:flex items-center gap-3 mb-4">
            <div className="w-10 h-1 bg-gradient-to-r from-text_secondary to-text_secondary/50 rounded-full" />
            <span className="text-text_secondary text-sm font-semibold uppercase tracking-wider">
              {staff.position}
            </span>
          </div>

          {/* Name */}
          <h3 className="text-tertiary text-2xl lg:text-3xl font-bold mb-4">
            {staff.full_name}
          </h3>

          {/* Description */}
          <div
            className="ql-editor text-tertiary/70 text-sm lg:text-base leading-relaxed line-clamp-5"
            dangerouslySetInnerHTML={{ __html: staff.description }}
          />

          {/* Footer */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-tertiary/10">
            <SocialLinks
              className="!mt-0"
              social_network_links={staff.social_network_links}
            />

            {staff.resume_file && (
              <Link
                href={`${process.env.NEXT_PUBLIC_URL_BACKEND}${staff.resume_file.file_path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-text_secondary text-white rounded-xl text-sm font-medium hover:bg-text_secondary/90 hover:shadow-lg hover:shadow-text_secondary/30 transition-all"
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
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [subDropdownOpen, setSubDropdownOpen] = useState(false);
  const t = useTranslations("university.structure");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChangeStructureType = useCallback((type: any) => {
    handleChangeStructure(type);
    setMobileDropdownOpen(false);
  }, [handleChangeStructure]);

  const handlePrev = () => {
    swiperRef.current?.swiper.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.swiper.slideNext();
  };

  return (
    <article className="mt-8 mb-14">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          {/* Mobile Dropdown */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
              className="w-full flex items-center justify-between px-5 py-4 bg-text_secondary text-white rounded-xl font-medium"
            >
              <span className="flex items-center gap-3">
                {getIconForType(selectedStructureType as SectionType)}
                {data.find((item) => item.type === selectedStructureType)?.label}
              </span>
              <ChevronDown className={`w-5 h-5 transition-transform ${mobileDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {mobileDropdownOpen && (
              <div className="mt-2 bg-white rounded-xl border border-tertiary/10 shadow-lg overflow-hidden">
                {data.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleChangeStructureType(item.type)}
                    className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors ${
                      selectedStructureType === item.type
                        ? 'bg-text_secondary/10 text-text_secondary'
                        : 'text-tertiary hover:bg-box_color'
                    }`}
                  >
                    {getIconForType(item.type)}
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block sticky top-24 space-y-3">
            {data.map((item, index) => (
              <button
                key={index}
                onClick={() => handleChangeStructureType(item.type)}
                className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl font-medium transition-all duration-300 ${
                  selectedStructureType === item.type
                    ? 'bg-text_secondary text-white shadow-lg shadow-text_secondary/30'
                    : 'bg-box_color text-tertiary hover:bg-text_secondary/10 hover:text-text_secondary'
                }`}
              >
                {getIconForType(item.type)}
                {item.label}
              </button>
            ))}

            <div className="pt-4 border-t border-tertiary/10">
              <Link
                href="/university/structure-schema"
                className="w-full flex items-center gap-3 px-5 py-4 rounded-xl font-medium bg-tertiary/5 text-tertiary hover:bg-tertiary hover:text-white transition-all duration-300"
              >
                <GitBranch className="w-5 h-5" />
                {t("tree")}
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Sub-category tabs for Rectorate */}
          {selectedStructureType === SectionType.RECTORATE && structureTypeData.length > 0 && (
            <>
              {/* Mobile Sub-dropdown */}
              <div className="lg:hidden mb-6">
                <button
                  onClick={() => setSubDropdownOpen(!subDropdownOpen)}
                  className="w-full flex items-center justify-between px-5 py-4 bg-box_color text-tertiary rounded-xl font-medium"
                >
                  <span>
                    {structureTypeData.find((item) => item.slug === structureButtonData)?.name || "Tanlang"}
                  </span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${subDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {subDropdownOpen && (
                  <div className="mt-2 bg-white rounded-xl border border-tertiary/10 shadow-lg overflow-hidden max-h-60 overflow-y-auto">
                    {structureTypeData
                      .filter((item) => item.staffs.length > 0)
                      .map((item, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setStructureButtonData(item.slug);
                            setSubDropdownOpen(false);
                          }}
                          className={`w-full px-5 py-3 text-left transition-colors ${
                            structureButtonData === item.slug
                              ? 'bg-text_secondary/10 text-text_secondary'
                              : 'text-tertiary hover:bg-box_color'
                          }`}
                        >
                          {item.name}
                        </button>
                      ))}
                  </div>
                )}
              </div>

              {/* Desktop Tabs */}
              <div className="hidden lg:flex flex-wrap gap-3 mb-8">
                {structureTypeData
                  .filter((item) => item.staffs.length > 0)
                  .map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setStructureButtonData(item.slug)}
                      className={`px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                        structureButtonData === item.slug
                          ? 'bg-text_secondary text-white shadow-lg shadow-text_secondary/20'
                          : 'bg-box_color text-tertiary hover:bg-text_secondary/10'
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
              </div>
            </>
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
                      className="w-12 h-12 rounded-full bg-box_color text-tertiary flex items-center justify-center hover:bg-text_secondary hover:text-white transition-all duration-300"
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
                              ? 'w-8 bg-text_secondary'
                              : 'w-2 bg-tertiary/20 hover:bg-tertiary/40'
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={handleNext}
                      className="w-12 h-12 rounded-full bg-box_color text-tertiary flex items-center justify-center hover:bg-text_secondary hover:text-white transition-all duration-300"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-tertiary/10 flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-tertiary/40" />
                </div>
                <p className="text-tertiary/50">Ma'lumot topilmadi</p>
              </div>
            )
          ) : (
            /* List view for other types */
            <div className="grid gap-4">
              {structureTypeData.length > 0 ? (
                structureTypeData.map((item, index) => (
                  <Link
                    key={item.slug}
                    href={`/university/structure/${item.slug}`}
                    className="group flex items-center gap-4 p-5 bg-white rounded-xl border border-tertiary/10 hover:border-text_secondary/30 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-text_secondary/10 text-text_secondary flex items-center justify-center flex-shrink-0 group-hover:bg-text_secondary group-hover:text-white transition-all duration-300">
                      <span className="font-bold">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-tertiary font-medium group-hover:text-text_secondary transition-colors line-clamp-1"
                        dangerouslySetInnerHTML={{ __html: item.name }}
                      />
                      {item.staffs.length > 0 && (
                        <p className="text-tertiary/50 text-sm mt-1">
                          {item.staffs.length} xodim
                        </p>
                      )}
                    </div>
                    <ArrowRight className="w-5 h-5 text-tertiary/30 group-hover:text-text_secondary group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </Link>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-tertiary/10 flex items-center justify-center mb-4">
                    <Building2 className="w-8 h-8 text-tertiary/40" />
                  </div>
                  <p className="text-tertiary/50">Ma'lumot topilmadi</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default Structure;
