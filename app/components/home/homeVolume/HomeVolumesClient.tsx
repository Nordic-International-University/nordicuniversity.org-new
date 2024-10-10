"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import RoundedSvg from "@/app/components/helpers/RoundeSvg";
import { Navigation } from "swiper/modules";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const HomeVolumesClient = ({ volume }: any) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <section className="mt-8">
      <div className="container">
        <div className="flex items-center justify-between">
          <RoundedSvg title="Nashrlar" className="mt-0" />
          <div className="flex items-center mt-2 gap-3">
            <Button
              icon={<LeftOutlined className="text-blue-600" />}
              className="swiper-button-prevs bg-gray-200 p-5 rounded-xl hover:bg-gray-100 transition"
            ></Button>
            <Button
              icon={<RightOutlined className="text-blue-600" />}
              className="swiper-button-nexts bg-gray-200 p-5 rounded-xl hover:bg-gray-100 transition"
            ></Button>
          </div>
        </div>
      </div>
      <div className="swiperContainer">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".swiper-button-nexts",
            prevEl: ".swiper-button-prevs",
          }}
          watchSlidesProgress
          updateOnWindowResize
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
          slidesPerView={4}
        >
          {volume
            ?.sort(
              (a: any, b: any) => a.title.slice(0, 1) - b.title.slice(0, 1),
            )
            ?.map((item: any) => (
              <SwiperSlide className="relative group" key={item.id}>
                <Link
                  key={item.id}
                  className="cursor-pointer relative block overflow-hidden h-[370px]"
                  href={`/publications/volume/${item.id}`}
                >
                  <div className="absolute top-0 left-0 w-full h-1/2">
                    <Image
                      className="transform group-hover:-translate-y-6 transition-transform duration-300"
                      src={`${process.env.NEXT_PUBLIC_API_URL}${item?.image?.file_path}`}
                      width={1000}
                      height={500}
                      alt="volume"
                      loading="lazy"
                      style={{ clipPath: "inset(0 0 50% 0)" }}
                    />
                  </div>
                  <div className="absolute top-0 left-0 w-full h-1/2">
                    <Image
                      className="transform group-hover:translate-y-6 transition-transform duration-300"
                      src={`${process.env.NEXT_PUBLIC_API_URL}${item?.image?.file_path}`}
                      width={1000}
                      height={500}
                      alt="volume"
                      loading="lazy"
                      style={{ clipPath: "inset(50% 0 0 0)" }}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center pb-5 justify-center text-2xl font-bold text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.title}
                  </div>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HomeVolumesClient;
