"use client";

import React, { useState } from "react";
import { NewsItem } from "@/types/templates/newsSlider.type";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import { Montserrat } from "next/font/google";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import dayjs from "dayjs";
import { ArrowRight, Calendar } from "lucide-react";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const t = useTranslations("buttons");

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <section className="mb-14 max-lg:mt-0 mt-28 pt-10">
      <article className={`${monserrat.className} container`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="w-1 h-10 bg-text_secondary rounded-full" />
            <h2 className="text-tertiary max-sm:text-xl font-bold text-3xl">
              {sectionTitle}
            </h2>
          </div>
          <Link
            href="/press-service/news"
            className="max-sm:hidden group flex items-center gap-2 text-secondary hover:text-text_secondary transition-colors duration-300"
          >
            <span className="font-medium">{t("see_all")}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Main Content */}
        <div className="relative">
          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-6">
            {/* Featured News - Left Side */}
            <div className="col-span-7 relative group">
              <Swiper
                spaceBetween={0}
                slidesPerView={1}
                onSlideChange={handleSlideChange}
                navigation={{
                  prevEl: "#news-prev",
                  nextEl: "#news-next",
                }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                modules={[Navigation, Autoplay, EffectFade]}
                className="w-full h-[480px] rounded-2xl overflow-hidden"
              >
                {props?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <Link href={`/press-service/news/${item.slug}`} className="block relative h-full">
                      <Image
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        height={600}
                        width={800}
                        src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${item.image.file_path}`}
                        alt={item.title}
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <div className="flex items-center gap-2 text-white/80 mb-3">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {dayjs(item.time).format("DD MMMM, YYYY")}
                          </span>
                        </div>
                        <h3 className="text-white text-2xl font-bold mb-3 line-clamp-2 leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-white/70 text-sm line-clamp-2 max-w-xl">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation Buttons */}
              <div className="absolute bottom-8 right-8 z-10 flex items-center gap-3">
                <button
                  id="news-prev"
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-text_secondary transition-all duration-300"
                >
                  <FaChevronLeft className="w-4 h-4" />
                </button>
                <button
                  id="news-next"
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-text_secondary transition-all duration-300"
                >
                  <FaChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Slide Indicators */}
              <div className="absolute bottom-8 left-8 z-10 flex items-center gap-2">
                {props?.slice(0, 5).map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      activeIndex === index
                        ? "w-8 bg-text_secondary"
                        : "w-4 bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Side News Cards - Right Side */}
            <div className="col-span-5 flex flex-col gap-4">
              {props?.slice(0, 3).map((item, index) => (
                <Link
                  key={index}
                  href={`/press-service/news/${item.slug}`}
                  className={`group flex gap-4 p-4 rounded-xl transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-box_color shadow-lg"
                      : "bg-box_color/50 hover:bg-box_color hover:shadow-md"
                  }`}
                >
                  <div className="relative w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      height={150}
                      width={150}
                      src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${item.image.file_path}`}
                      alt={item.title}
                    />
                  </div>
                  <div className="flex flex-col justify-between py-1">
                    <div>
                      <h4 className="text-tertiary font-semibold text-base line-clamp-2 mb-2 group-hover:text-text_secondary transition-colors duration-300">
                        {item.title}
                      </h4>
                      <p className="text-tertiary/60 text-sm line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-tertiary/50 text-xs">
                      <Calendar className="w-3 h-3" />
                      <span>{dayjs(item.time).format("DD MMM, YYYY")}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            <Swiper
              spaceBetween={16}
              slidesPerView={1.15}
              centeredSlides={false}
              onSlideChange={handleSlideChange}
              modules={[Navigation]}
              className="w-full !overflow-visible"
            >
              {props?.map((item, index) => (
                <SwiperSlide key={index}>
                  <Link
                    href={`/press-service/news/${item.slug}`}
                    className="block group"
                  >
                    <div className="relative rounded-2xl overflow-hidden shadow-lg">
                      <div className="relative h-52">
                        <Image
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          height={300}
                          width={400}
                          src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${item.image.file_path}`}
                          alt={item.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white/90">
                          <Calendar className="w-3 h-3" />
                          <span className="text-xs font-medium">
                            {dayjs(item.time).format("DD MMM, YYYY")}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 bg-box_color">
                        <h4 className="text-tertiary font-semibold text-base line-clamp-2 mb-2">
                          {item.title}
                        </h4>
                        <p className="text-tertiary/60 text-sm line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Mobile See All Link */}
            <div className="flex justify-center mt-6">
              <Link
                href="/press-service/news"
                className="flex items-center gap-2 text-secondary font-medium text-sm"
              >
                <span>{t("see_all")}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default NewsSlider;
