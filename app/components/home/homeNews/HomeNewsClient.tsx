"use client";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { homeNewsInterface } from "@/types/homeNews.types";
import Image from "next/image";

const HomeNewsClient = ({ news }: homeNewsInterface) => {
  useEffect(() => {
    console.log(news);
  }, []);
  return (
    <div className="flex">
      <Swiper slidesPerView={1}>
        {news.map((newsItem) => (
          <SwiperSlide key={newsItem.id}>
            <div className="flex max-sm:flex-col max-sm:mt-3">
              <Image
                src={`https://journal2.nordicun.uz${newsItem.source.file_path}`}
                alt="img"
                width={256}
                height={200}
                className="object-cover rounded-md  max-sm:w-full "
              />
              <div className="ml-3 w-full ">
                <h1 className=" text-[25px] font-bold  text-[#478CCF]">
                  {newsItem.title}
                </h1>
                <h2 className="text-[18px] text-gray-600 font-medium mt-3  ">
                  {newsItem.description}
                </h2>
                <hr />
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
