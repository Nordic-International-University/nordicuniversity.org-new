"use client";

import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { IoMdArrowBack } from "react-icons/io";
import { Button } from "antd";
import Image from "next/image";
import { LitsenziyaPropsTypes } from "@/types/templates/litsenziya.types";
import { useTranslations } from "next-intl";
import gsap from "gsap";

const Litsenziya = ({ props, sectionTitle }: LitsenziyaPropsTypes) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState("LICENSE");
  const [prevTab, setPrevTab] = useState("LICENSE");
  const contentRef = useRef(null);
  const t = useTranslations("university");
  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  };

  const handleTabChange = (item: any) => {
    setPrevTab(selectedTab);
    setSelectedTab(item);
  };

  useEffect(() => {
    const direction = selectedTab > prevTab ? 100 : -100;
    gsap.fromTo(
      contentRef.current,
      { x: direction, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
    );
  }, [selectedTab]);

  const totalPages = Math.ceil(props[selectedTab].length / 3);

  return (
    <article className="mt-12">
      <h2 className="text-center text-tertiary text-2xl font-semibold pb-7">
        {sectionTitle}
      </h2>
      <div className="flex items-center justify-center mb-6 gap-5">
        {Object.keys(props)
          .filter((item) => props[item].length !== 0)
          .map((item, index) => (
            <Button
              onClick={() => handleTabChange(item)}
              key={index}
              size="large"
              className={`px-8 rounded text-md font-semibold ${
                selectedTab === item
                  ? "bg-text_secondary text-white"
                  : "bg-text_tertiary text-text_secondary"
              }`}
            >
              {t(`document.buttons.${item}`)}
            </Button>
          ))}
      </div>
      <div ref={contentRef}>
        <Swiper
          key={selectedTab}
          direction="horizontal"
          spaceBetween={30}
          slidesPerView={1}
          initialSlide={0}
          onSlideChange={handleSlideChange}
          navigation={{
            prevEl: ".swiper-up-litsenziya",
            nextEl: ".swiper-down-litsenziya",
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          modules={[Navigation]}
          className="w-full h-[550px]"
        >
          {props[selectedTab].map((item, index) => (
            <SwiperSlide key={index}>
              <Image
                className="mx-auto h-auto w-[390px] block"
                height={500}
                width={500}
                src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${item.image.file_path}`}
                alt={item.id}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {props[selectedTab].length > 3 && (
        <div className="flex items-center justify-center mt-6 gap-6">
          <div className="cursor-pointer">
            <IoMdArrowBack className="text-lg text-text_secondary swiper-up-litsenziya" />
          </div>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <div
                key={pageIndex}
                className={`h-2 w-2 rounded-full ${
                  activeIndex === pageIndex
                    ? "bg-text_secondary"
                    : "bg-text_secondary opacity-45"
                }`}
              />
            ))}
          </div>
          <div className="cursor-pointer">
            <IoMdArrowBack className="text-lg rotate-180 text-text_secondary swiper-down-litsenziya" />
          </div>
        </div>
      )}
    </article>
  );
};

export default Litsenziya;
