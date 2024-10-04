"use client";

import React, { useState, useEffect } from "react";
import hero_logo from "@/public/images/home-images/hero_logo.png";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import SwiperCore from "swiper";
import { Autoplay, Pagination } from "swiper/modules";

SwiperCore.use([Autoplay, Pagination]);

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [progress, setProgress] = useState(0); // Progress bar uchun state
  const totalSlides = 3;
  const autoplayDelay = 5000; // Har bir slaydning o'tish vaqti (ms)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) return 0;
        return prevProgress + 1;
      });
    }, autoplayDelay / 100); // Progressni yangilash intervali

    return () => clearInterval(interval); // Cleanup interval
  }, []);

  return (
    <div className="relative bg-[url('/images/home-images/hero-image.png')] bg-cover bg-center calc-hero-bg">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="mt-[81px]">
            <Image className="block mx-auto" src={hero_logo} alt="hero logo" />
            <button className="bg-white font-bold rounded-[6px] mt-[30px] text-[#46658B] text-[20px py-[11px] px-[72px]">
              QABUL
            </button>

            <div className="mt-4 text-lg font-bold text-center">
              {currentSlide}/{totalSlides}{" "}
              {/* Hozirgi slayd va umumiy slaydlar soni */}
            </div>

            {/* Progress bar */}
            <div className="mt-2 w-full bg-gray-200 h-1">
              <div
                className="bg-blue-500 h-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="mt-8">
            <Swiper
              className="w-[400px]"
              slidesPerView={1}
              spaceBetween={50}
              loop={true}
              autoplay={{
                delay: autoplayDelay,
                disableOnInteraction: false, // Foydalanuvchi bilan o'zaro aloqada to'xtamaslik
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination, Autoplay]}
              onSlideChange={(swiper) => {
                setCurrentSlide(swiper.realIndex + 1);
                setProgress(0); // Har bir slayd o'tganda progressni noldan boshlash
              }}
            >
              <SwiperSlide>
                <div className="bg-red-500 w-full h-full flex items-center justify-center">
                  Slide 1
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="bg-green-500 w-full h-full flex items-center justify-center">
                  Slide 2
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="bg-blue-500 w-full h-full flex items-center justify-center">
                  Slide 3
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
