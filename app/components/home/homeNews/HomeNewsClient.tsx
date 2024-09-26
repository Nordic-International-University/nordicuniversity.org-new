"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { homeNewsInterface } from "@/types/homeNews.types";
import Image from "next/image";

const HomeNewsClient = ({ news }: homeNewsInterface) => {
  return (
    <div className="flex">
      <Swiper slidesPerView={1}>
        {news?.map((newsItem) => (
          <SwiperSlide key={newsItem.id}>
            <div className="flex max-sm:flex-col w-full max-sm:mt-3">
              <Image
                src={`https://journal2.nordicun.uz${newsItem.source.file_path}`}
                alt="img"
                width={256}
                height={200}
                className="object-cover rounded-md  max-sm:w-full "
              />
              <div className="ml-3 w-full">
                <h1 className="text-[25px] max-sm:text-[18px] max-sm:pt-3 font-bold  text-[#478CCF]">
                  {newsItem.title}
                </h1>
                <p className="text-[18px]  text-gray-600 font-medium mt-4">
                  {newsItem.description}
                </p>
                <hr className="my-3"/>
                <h3 className="text-[18px] text-gray-600 font-medium">
                  {newsItem.body}
                </h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeNewsClient;
