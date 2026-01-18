"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCreative } from "swiper/modules";
import Image from "next/image";
import { doubleSliderProps } from "@/types/templates/doubleSlider.types";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-creative";

const DoubleSlider = ({
  props,
  direction,
  reverseDirection,
  url,
  delay,
  sectionTitle,
}: doubleSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const raw = useId();
  const sliderId = raw.replace(/[^a-zA-Z0-9-_]/g, "");
  const t = useTranslations("buttons");

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.realIndex);
  };

  useEffect(() => {
    if (prevRef.current && nextRef.current) {
      const swiperEl = document.querySelector(`.swiper-${sliderId}`);
      if (swiperEl) {
        // @ts-ignore
        const swiper = swiperEl.swiper;
        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;
        swiper.navigation.init();
        swiper.navigation.update();
      }
    }
  }, [sliderId]);

  // Progress bar animation
  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 100 / (delay / 100);
      });
    }, 100);
    return () => clearInterval(interval);
  }, [activeIndex, delay]);

  return (
    <article className="container">
      {/* Section Header */}
      <div
        className={`flex items-center justify-between mb-10 ${direction === "vertical" ? "flex-row-reverse" : ""}`}
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-text_tertiary/20 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-text_tertiary animate-pulse" />
            </div>
          </div>
          <div>
            <span className="text-text_tertiary/60 text-sm font-medium uppercase tracking-wider">
              {t("see_all")}
            </span>
            <h2 className="text-white text-2xl max-sm:text-xl font-bold">
              {sectionTitle}
            </h2>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-4 max-sm:hidden">
          <div className="flex items-center gap-2 mr-4">
            <span className="text-text_tertiary font-bold text-lg">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <div className="w-12 h-0.5 bg-text_tertiary/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-text_tertiary transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-text_tertiary/40 font-medium">
              {String(props.length).padStart(2, "0")}
            </span>
          </div>
          <button
            ref={prevRef}
            className="w-11 h-11 rounded-full border-2 border-text_tertiary/30 flex items-center justify-center text-text_tertiary hover:bg-text_tertiary hover:text-tertiary transition-all duration-300 group"
          >
            <FaArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            ref={nextRef}
            className="w-11 h-11 rounded-full border-2 border-text_tertiary/30 flex items-center justify-center text-text_tertiary hover:bg-text_tertiary hover:text-tertiary transition-all duration-300 group"
          >
            <FaArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Main Slider */}
      <div className="relative">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          onSlideChange={handleSlideChange}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          effect="creative"
          creativeEffect={{
            prev: {
              shadow: true,
              translate: ["-20%", 0, -1],
              opacity: 0,
            },
            next: {
              translate: ["100%", 0, 0],
              opacity: 1,
            },
          }}
          speed={800}
          loop={props.length > 2}
          autoplay={{
            reverseDirection,
            delay,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Autoplay, EffectCreative]}
          className={`w-full swiper-${sliderId}`}
        >
          {props?.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className={`flex max-lg:flex-col ${direction === "vertical" ? "flex-row-reverse" : ""} gap-8 max-lg:gap-0`}
              >
                {/* Image Section */}
                <div className="relative w-[55%] max-lg:w-full group">
                  <div className="relative h-[480px] max-lg:h-[300px] max-sm:h-[250px] rounded-3xl max-lg:rounded-b-none overflow-hidden">
                    <Image
                      height={600}
                      width={800}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${item.image.file_path}`}
                      alt={item.name}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Floating Badge */}
                    <div className="absolute top-6 left-6 max-sm:top-4 max-sm:left-4">
                      <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                        <span className="text-white text-sm font-medium">
                          {sectionTitle}
                        </span>
                      </div>
                    </div>

                    {/* Date Badge */}
                    {item.date && (
                      <div className="absolute bottom-6 left-6 max-sm:bottom-4 max-sm:left-4 flex items-center gap-2 text-white/80">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{item.date}</span>
                      </div>
                    )}
                  </div>

                  {/* Decorative Elements */}
                  <div
                    className={`absolute -bottom-4 ${direction === "vertical" ? "-left-4" : "-right-4"} w-24 h-24 border-2 border-text_tertiary/30 rounded-2xl max-lg:hidden`}
                  />
                </div>

                {/* Content Section */}
                <div
                  className={`w-[45%] max-lg:w-full flex flex-col justify-between ${direction === "vertical" ? "pr-8" : "pl-8"} max-lg:p-6 max-lg:bg-gradient-to-b max-lg:from-tertiary/50 max-lg:to-transparent max-lg:rounded-b-3xl`}
                >
                  <div className="space-y-6">
                    {/* Title */}
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-0.5 bg-text_tertiary rounded-full" />
                        <span className="text-text_tertiary/60 text-sm uppercase tracking-wider">
                          #{String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="text-white text-3xl max-lg:text-2xl max-sm:text-xl font-bold leading-tight line-clamp-2">
                        {item.name}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-text_tertiary/80 text-base max-sm:text-sm leading-relaxed line-clamp-4">
                      {item.description}
                    </p>

                    {/* Stats or Tags */}
                    <div className="flex items-center gap-3 flex-wrap">
                      {[1, 2, 3].map((_, i) => (
                        <div
                          key={i}
                          className="h-2 w-2 rounded-full bg-text_tertiary/40"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4 mt-8 max-lg:mt-6">
                    <Link
                      href={url.single + `/${item.slug}`}
                      className="group flex items-center gap-3 bg-text_tertiary text-tertiary px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-text_tertiary/25 transition-all duration-300"
                    >
                      <span>{t("detail")}</span>
                      <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                    <Link
                      href={url.all}
                      className="group flex items-center gap-2 text-text_tertiary font-medium hover:gap-3 transition-all duration-300"
                    >
                      <span>{t("see_all")}</span>
                      <FaArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Slide Thumbnails - Desktop */}
        <div className="hidden lg:flex items-center gap-3 mt-8">
          {props?.slice(0, 5).map((item, index) => (
            <button
              key={index}
              onClick={() => {
                const swiperEl = document.querySelector(`.swiper-${sliderId}`);
                // @ts-ignore
                if (swiperEl?.swiper) swiperEl.swiper.slideToLoop(index);
              }}
              className={`relative h-16 rounded-xl overflow-hidden transition-all duration-300 ${
                activeIndex === index
                  ? "w-28 ring-2 ring-text_tertiary ring-offset-2 ring-offset-tertiary"
                  : "w-16 opacity-50 hover:opacity-80"
              }`}
            >
              <Image
                height={80}
                width={120}
                className="w-full h-full object-cover"
                src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${item.image.file_path}`}
                alt={item.name}
              />
              {activeIndex === index && (
                <div className="absolute inset-0 bg-text_tertiary/20" />
              )}
            </button>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center justify-center gap-4 mt-6">
          <button
            ref={prevRef}
            className="w-10 h-10 rounded-full border border-text_tertiary/30 flex items-center justify-center text-text_tertiary"
          >
            <FaArrowLeft className="w-3 h-3" />
          </button>
          <div className="flex items-center gap-2">
            {props?.slice(0, 5).map((_, index) => (
              <div
                key={index}
                className={`rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "w-6 h-2 bg-text_tertiary"
                    : "w-2 h-2 bg-text_tertiary/30"
                }`}
              />
            ))}
          </div>
          <button
            ref={nextRef}
            className="w-10 h-10 rounded-full border border-text_tertiary/30 flex items-center justify-center text-text_tertiary"
          >
            <FaArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default DoubleSlider;
