"use client";

import React, { useState } from "react";
import { NewsItem } from "@/types/templates/newsSlider.type";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Montserrat } from "next/font/google";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import dayjs from "dayjs";
import { Button } from "antd";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const monserrat = Montserrat({
  subsets: ["latin"],
  weight: "variable",
});

const NewsSlider = ({
  props,
  sectionTitle,
}: {
  props: Array<NewsItem>;
  sectionTitle: string;
}) => {
  const [activeIndex, setActiveIndex] = useState(1);

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  };
  const t = useTranslations("buttons");

  return (
    <section className="mb-14 max-lg:mt-0 max-sm:-mt-5 mt-28 pt-10">
      <article
        className={`${monserrat.className} container max-lg:w-full max-lg:px-0`}
      >
        <div className="flex items-center text-[#364E6B] justify-center max-sm:justify-between container mb-10">
          <h2 className="text-tertiary max-sm:text-lg font-semibold text-2xl  text-center">
            {sectionTitle}
          </h2>
          <div className=" max-sm:flex hidden items-center gap-2 text-sm">
            <div className="text-secondary flex items-center gap-2">
              <Link href="/press-service/news" className="font-normal">
                {t("see_all")}
              </Link>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-12">
          <Swiper
            direction="horizontal"
            spaceBetween={30}
            slidesPerView={1}
            initialSlide={1}
            centeredSlides={true}
            onSlideChange={handleSlideChange}
            navigation={{
              prevEl: "#swiper-up",
              nextEl: "#swiper-down",
            }}
            breakpoints={{
              1024: {
                direction: "vertical",
                slidesPerView: 1,
                spaceBetween: 30,
              },
              300: {
                slidesPerView: 1.5,
                direction: "horizontal",
                spaceBetween: 20,
              },
            }}
            modules={[Navigation]}
            className="w-full h-[284px] max-lg:h-full"
          >
            {props?.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="flex max-lg:flex-col items-center max-lg:gap-3 gap-12 justify-between">
                  <Image
                    className={`max-sm:h-auto max-lg:rounded-md max-lg:min-h-[270px] max-sm:object-cover transition-transform ${index === activeIndex ? "max-lg:translate-y-0" : "max-lg:translate-y-7"}`}
                    height={400}
                    width={400}
                    src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${item.image.file_path}`}
                    alt={item.title}
                  />
                  <div
                    className={`w-full transition-all max-lg:${index === activeIndex ? "block" : "hidden"}`}
                  >
                    <div className="bg-box_color max-lg:bg-transparent rounded mb-4 w-full">
                      <h2 className="text-tertiary max-sm:text-sm max-sm:pt-2 max-lg:text-center text-xl font-semibold pt-3 pl-3 pr-5 pb-4 max-sm:p-0">
                        {item.title}
                      </h2>
                    </div>
                    <div className="bg-box_color max-lg:bg-transparent flex flex-col pt-4 max-sm:pt-0 px-3 pb-5 rounded justify-between gap-7 w-full">
                      <p className="text-tertiary text-center px-5 max-sm:text-md max-lg:px-0 max-lg:-mx-8 max-lg:w-[calc(100%+2rem)] max-md:-mx-12  max-md:w-[calc(100%+6rem)]">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-tertiary text-opacity-100 font-semibold max-sm:hidden block">
                          {dayjs(item.time).format("MMMM DD YYYY")}
                        </span>
                        <Button
                          href={`/press-service/news/${item.slug}`}
                          className="font-semibold max-sm:py-4 text-white max-sm:w-full bg-text_secondary px-11 py-1"
                        >
                          {t("detail")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex items-center mb-10 max-lg:hidden flex-col gap-6">
            <div className="cursor-pointer">
              <FaChevronUp
                className="text-lg text-text_secondary"
                id="swiper-up"
              />
            </div>
            <div className="flex flex-col items-center space-y-4">
              {props.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    activeIndex === index
                      ? "bg-text_secondary"
                      : "bg-text_secondary opacity-45"
                  }`}
                />
              ))}
            </div>
            <div className="cursor-pointer">
              <FaChevronDown
                className="text-lg text-text_secondary"
                id="swiper-down"
              />
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default NewsSlider;
