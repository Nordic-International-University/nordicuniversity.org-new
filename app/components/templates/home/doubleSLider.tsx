"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import { doubleSliderProps } from "@/types/templates/doubleSlider.types";

const DoubleSlider = ({
  props,
  direction,
  reverseDirection,
  delay,
}: doubleSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <article className="container">
      <div
        className={`flex ${direction === "vertical" ? "flex-row-reverse" : "flex-row"} items-center gap-6`}
      >
        <Swiper
          direction="horizontal"
          spaceBetween={30}
          slidesPerView={1}
          initialSlide={1}
          centeredSlides={true}
          onSlideChange={handleSlideChange}
          navigation={{
            prevEl: ".swiper-up-tadbir",
            nextEl: ".swiper-down-tadbir",
          }}
          breakpoints={{
            1024: {
              direction: "vertical",
              slidesPerView: 1,
              spaceBetween: 30,
            },
            300: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
          }}
          effect="slide"
          speed={2500}
          loop={true}
          autoplay={{
            reverseDirection,
            delay,
          }}
          modules={[Navigation, Autoplay]}
          className="w-full h-[404px] max-lg:h-auto"
        >
          {props?.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className={`flex max-lg:flex-col ${direction === "vertical" ? "flex-row-reverse" : "flex-row"} items-start max-lg:gap-3 gap-5 justify-between`}
              >
                <Image
                  className={`h-[430px] w-1/2 object-cover`}
                  src={item.image}
                  alt={item.title}
                />
                <div className="mt-6 flex w-1/2 pb-5 justify-between h-[379px] flex-col">
                  <div>
                    <div className="max-lg:bg-transparent rounded mb-4 w-full">
                      <h2 className="text-white max-sm:text-lg max-sm:pt-2 max-lg:text-center text-2xl font-semibold max-sm:p-0">
                        {item.title}
                      </h2>
                    </div>
                    <div className="max-lg:bg-transparent flex flex-col rounded justify-between gap-7 w-full">
                      <p className="text-text_tertiary max-lg:text-center">
                        {item.description}
                      </p>
                      <div className="flex flex-col">
                        <span className="text-white text-opacity-15">
                          {item.date}
                        </span>
                        <div>
                          <button className="text-tertiary  mt-3 font-semibold bg-text_tertiary px-11 py-1">
                            Batafsil...
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button className="text-tertiary inline-block float-right w-1/2 mt-3 font-semibold bg-text_tertiary px-11 py-1">
                      Barcha yangiliklar
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/*<div className="flex items-center mb-10 block max-lg:hidden flex-col gap-6">*/}
        {/*  <div className="cursor-pointer swiper-up-tadbir">*/}
        {/*    <FaChevronUp className="text-lg text-text_tertiary" />*/}
        {/*  </div>*/}
        {/*  <div className="flex flex-col items-center space-y-4">*/}
        {/*    {props.map((_, index) => (*/}
        {/*      <div*/}
        {/*        key={index}*/}
        {/*        className={`h-2 w-2 rounded-full ${*/}
        {/*          activeIndex === index*/}
        {/*            ? "bg-text_tertiary"*/}
        {/*            : "bg-text_tertiary opacity-45"*/}
        {/*        }`}*/}
        {/*      />*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*  <div className="cursor-pointer swiper-down-tadbir">*/}
        {/*    <FaChevronDown className="text-lg text-text_tertiary" />*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </article>
  );
};

export default DoubleSlider;