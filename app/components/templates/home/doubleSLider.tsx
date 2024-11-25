"use client";

import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { doubleSliderProps } from "@/types/templates/doubleSlider.types";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Button } from "antd";

const DoubleSlider = ({
  props,
  direction,
  reverseDirection,
  url,
  delay,
  sectionTitle,
}: doubleSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  };

  // @ts-ignore
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
            prevEl: prevRef.current,
            nextEl: nextRef.current,
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
          modules={[Navigation]}
          className="w-full h-[404px] max-lg:h-auto"
          onInit={(swiper: any) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
        >
          {props?.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className={`flex max-lg:flex-col ${direction === "vertical" ? "flex-row-reverse" : "flex-row"} items-start max-lg:gap-3 gap-5 justify-between`}
              >
                <div className="relative w-[51.6%] group overflow-hidden transition-all shadow-lg">
                  {/* Image */}
                  <Image
                    height={430}
                    width={400}
                    className="h-[430px] w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${item.image.file_path}`}
                    alt={item.name}
                  />

                  {/* Text Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
                  <h2
                    className={`absolute bottom-0 h-[100px] left-0 w-full text-white text-2xl font-semibold max-sm:text-lg text-center z-10 group-hover:backdrop-blur-lg bg-black/30 py-5 px-4 transition-all duration-500 group-hover:bottom-0 group-hover:h-full`}
                  >
                    {sectionTitle}
                  </h2>
                </div>

                <div className="mt-6 flex w-[45%] pb-5 justify-between h-[379px] flex-col">
                  <div>
                    <div className="max-lg:bg-transparent rounded mb-4 w-full">
                      <h2
                        className={` text-white max-sm:text-lg max-sm:pt-2  max-lg:text-center text-2xl font-semibold max-sm:p-0`}
                      >
                        {item.name}
                      </h2>
                    </div>
                    <div className="max-lg:bg-transparent flex flex-col rounded justify-between gap-7 w-full">
                      <p className="text-text_tertiary line-clamp-4 w-5/6 max-lg:text-center">
                        {item.description}
                      </p>
                      <div className="flex flex-col">
                        <span className="text-white text-opacity-15">
                          {item.date}
                        </span>
                        <div>
                          <Button
                            href={url.single + `/${item.slug}`}
                            className="text-tertiary  mt-3 font-semibold bg-text_tertiary px-11 py-1"
                          >
                            Batafsil...
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Button
                      href={url.all}
                      className="text-tertiary inline-block float-right w-1/2 mt-3 font-semibold bg-text_tertiary px-11 py-1"
                    >
                      Barchasini ko‘rish
                    </Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex items-center mb-10 block max-lg:hidden flex-col gap-6">
          <div ref={prevRef} className="cursor-pointer">
            <FaChevronUp className="text-lg text-text_tertiary" />
          </div>
          <div className="flex flex-col items-center space-y-4">
            {props.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  activeIndex === index
                    ? "bg-text_tertiary"
                    : "bg-text_tertiary opacity-45"
                }`}
              />
            ))}
          </div>
          <div ref={nextRef} className="cursor-pointer">
            <FaChevronDown className="text-lg text-text_tertiary" />
          </div>
        </div>
      </div>
    </article>
  );
};

export default DoubleSlider;
