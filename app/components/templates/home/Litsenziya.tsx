"use client";

import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { Modal } from "antd";
import Image from "next/image";
import { LitsenziyaPropsTypes } from "@/types/templates/litsenziya.types";
import {
  X,
  ChevronLeft,
  ChevronRight,
  FileText,
  Award,
  ScrollText,
} from "lucide-react";

const Litsenziya = ({
  props,
  sectionTitle,
  documentButtons,
}: LitsenziyaPropsTypes) => {
  const [selectedTab, setSelectedTab] = useState("LICENSE");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iframeSrc, setIframeSrc] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const swiperRef = useRef<any>(null);

  const handleTabChange = (item: any) => {
    setSelectedTab(item.type);
  };

  const handleImageClick = (pdfPath: string) => {
    setIframeSrc(pdfPath);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIframeSrc("");
  };

  const getTabIcon = (type: string) => {
    switch (type) {
      case "LICENSE":
        return <Award className="w-5 h-5" />;
      case "CERTIFICATE":
        return <ScrollText className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <article className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-text_secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Section Header */}

        <h2 className="text-tertiary text-4xl pb-10 max-lg:text-3xl max-sm:text-2xl font-bold">
          {sectionTitle}
        </h2>

        {/* Modern Tab Navigation */}
        {documentButtons?.length > 0 && (
          <div className="flex justify-center mb-12 max-lg:mb-8 px-4">
            <div className="inline-flex p-1.5 rounded-2xl bg-gradient-to-r from-box_color to-box_color/50 backdrop-blur-sm border border-tertiary/10 shadow-lg">
              {documentButtons.map((item, index) => {
                const isButtonVisible = props[item.type]?.length > 0;
                return (
                  isButtonVisible && (
                    <button
                      onClick={() => handleTabChange(item)}
                      key={index}
                      className={`relative px-6 py-3 max-sm:px-4 max-sm:py-2 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                        selectedTab === item.type
                          ? "bg-text_secondary text-white shadow-lg shadow-text_secondary/30"
                          : "text-tertiary hover:text-text_secondary hover:bg-white/50"
                      }`}
                    >
                      {getTabIcon(item.type)}
                      <span className="max-sm:hidden">{item.label}</span>
                    </button>
                  )
                );
              })}
            </div>
          </div>
        )}

        {/* Coverflow Slider */}
        <div className="relative px-4">
          <Swiper
            ref={swiperRef}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 200,
              modifier: 1,
              slideShadows: false,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: ".litsenziya-prev",
              nextEl: ".litsenziya-next",
            }}
            modules={[EffectCoverflow, Navigation, Autoplay]}
            className="w-full py-10"
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {props[selectedTab]?.map((item, index) => (
              <SwiperSlide key={index} className="!w-[320px] max-sm:!w-[280px]">
                <div
                  className="group relative cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() =>
                    handleImageClick(
                      `${process.env.NEXT_PUBLIC_URL_BACKEND}${item.file.file_path}`,
                    )
                  }
                >
                  {/* Card Container */}
                  <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-text_secondary/20 group-hover:-translate-y-2">
                    {/* Decorative top border */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-text_secondary via-secondary to-text_secondary" />

                    {/* Image Container */}
                    <div className="relative p-4 pb-0">
                      <div className="relative overflow-hidden rounded-xl">
                        <Image
                          className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                          height={450}
                          width={350}
                          src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${item.image.file_path}`}
                          alt={item.id}
                        />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-text_secondary/90 via-text_secondary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                          <div className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium">
                            <FileText className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="p-4 pt-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-text_secondary/10 flex items-center justify-center">
                            <Award className="w-4 h-4 text-text_secondary" />
                          </div>
                          <span className="text-tertiary/60 text-sm font-medium">
                            #{String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3].map((_, i) => (
                            <div
                              key={i}
                              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                                hoveredIndex === index
                                  ? "bg-text_secondary"
                                  : "bg-tertiary/20"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Shadow effect */}
                  <div className="absolute -bottom-4 left-4 right-4 h-8 bg-text_secondary/10 rounded-2xl blur-xl transition-opacity duration-300 group-hover:opacity-0" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button className="litsenziya-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-14 h-14 max-sm:w-10 max-sm:h-10 rounded-full bg-white shadow-xl flex items-center justify-center text-text_secondary hover:bg-text_secondary hover:text-white transition-all duration-300 hover:scale-110">
            <ChevronLeft className="w-6 h-6 max-sm:w-5 max-sm:h-5" />
          </button>
          <button className="litsenziya-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-14 h-14 max-sm:w-10 max-sm:h-10 rounded-full bg-white shadow-xl flex items-center justify-center text-text_secondary hover:bg-text_secondary hover:text-white transition-all duration-300 hover:scale-110">
            <ChevronRight className="w-6 h-6 max-sm:w-5 max-sm:h-5" />
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        closeIcon={null}
        centered
        width="80%"
        className="!p-0"
        styles={{
          mask: {
            backgroundColor: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(10px)",
          },
          content: {
            padding: 0,
            borderRadius: "1.5rem",
            overflow: "hidden",
          },
          body: {
            padding: 0,
            height: "85vh",
          },
        }}
      >
        <div className="relative h-full">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
          >
            <X className="w-6 h-6" />
          </button>
          <iframe
            src={iframeSrc}
            width="100%"
            height="100%"
            style={{ border: "none" }}
          />
        </div>
      </Modal>
    </article>
  );
};

export default Litsenziya;
