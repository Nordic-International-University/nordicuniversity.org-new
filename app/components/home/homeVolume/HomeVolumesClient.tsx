"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";

const HomeVolumesClient = ({ volume }: any) => {
  return (
    <section className="mt-8">
      <div className="swiperContainer">
        <Swiper breakpoints={{
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
        }} slidesPerView={4}>
          {volume.map((item: any) => (
               <SwiperSlide key={volume.id}>
           <Link key={item.id} className="cursor-pointer hover:grayscale transition-all" href={`/publications/volume/${item.id}`}>
                   <Image
                       src={`${"https://journal2.nordicun.uz"}${item.image.file_path}`}
                       width={1000}
                       height={300}
                       alt="volume"
                   />
           </Link>
               </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HomeVolumesClient;
