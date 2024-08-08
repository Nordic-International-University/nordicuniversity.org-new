"use client";

import { VolumePropsInterface } from "@/types/home.types";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

const HomeVolumesClient = ({ volume }: VolumePropsInterface) => {
  return (
    <div>
      <Swiper>
        {volume.map((volume) => (
          <SwiperSlide>{/*<Image src={} alt="" />*/}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeVolumesClient;
