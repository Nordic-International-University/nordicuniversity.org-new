"use client";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { homeNewsInterface } from "@/types/homeNews.types";

const HomeNewsClient = ({ news }: homeNewsInterface) => {
  useEffect(() => {
    console.log(news);
  }, []);
  return (
    <div>
      <Swiper>
        <SwiperSlide key></SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HomeNewsClient;
