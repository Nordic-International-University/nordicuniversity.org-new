"use client";

import React, { useState } from "react";
import { LitsenziyaPropsTypes } from "@/types/templates/litsenziya.types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import { IoMdArrowBack } from "react-icons/io";
import { Button } from "antd";

const Litsenziya = ({ props, sectionTitle }: LitsenziyaPropsTypes) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  };

  const totalPages = Math.ceil(props.length / 3);

  return (
    <article className="mt-16">
      <h2 className="text-center text-tertiary text-2xl font-semibold pb-7">
        {sectionTitle}
      </h2>
      <div className="flex items-center justify-center mb-6 gap-5">
        <Button
          size="large"
          className="px-8 rounded text-white text-md font-semibold bg-text_secondary"
        >
          GUVOXNOMA
        </Button>
        <Button
          size="large"
          className="px-8 rounded text-white text-md font-semibold bg-text_secondary"
        >
          LITSENZIYA
        </Button>
      </div>
      <Swiper
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
        className="w-full]"
      >
        {props.map((item, index) => (
          <SwiperSlide key={index}>
            <Image
              className="mx-auto h-[500px] block"
              src={item.image}
              alt={item.alt}
            />
          </SwiperSlide>
        ))}
      </Swiper>
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
    </article>
  );
};

export default Litsenziya;
