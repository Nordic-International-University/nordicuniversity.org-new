"use client";

import { VolumePropsInterface } from "@/types/home.types";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

const HomeVolumesClient = ({ volume }: VolumePropsInterface) => {
  return (
    <section className="mt-8">
      <div className="swiperContainer">
        <Swiper slidesPerView={4}>
          {volume.map((volume) => (
            <SwiperSlide key={volume.id}>
              <Image
                src={`${"https://journal2.nordicun.uz"}${volume.image.file_path}`}
                width={1000}
                height={300}
                alt="volume"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HomeVolumesClient;
