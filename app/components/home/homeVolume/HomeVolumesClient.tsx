"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";

const HomeVolumesClient = ({ volume }: any) => {
  return (
    <section className="mt-8">
      <div className="swiperContainer">
        <Swiper slidesPerView={4}>
          {volume.map((item: any) => (
           <Link key={item.id} className="cursor-pointer" href={`/publications/volume/${item.id}`}>
               <SwiperSlide key={volume.id}>
                   <Image
                       src={`${"https://journal2.nordicun.uz"}${item.image.file_path}`}
                       width={1000}
                       height={300}
                       alt="volume"
                   />
               </SwiperSlide>
           </Link>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HomeVolumesClient;
