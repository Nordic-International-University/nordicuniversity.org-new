"use client";

import mobile_image from '@/public/mobile_image.webp'
import React from "react";
import swiper_1 from "@/public/swiper_1.png";
import swiper_2 from "@/public/swiper_2.jpg";
import {Swiper, SwiperSlide} from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import {Autoplay} from "swiper/modules";

const HomeSlider = () => {
    return (
        <>
            <div>
                <Swiper
                    className="block max-sm:hidden"
                    autoplay={{
                        delay: 1500,
                    }}
                    speed={1500}
                    loop={true}
                    modules={[Autoplay]}
                >
                    <SwiperSlide>
                        <Image className="" src={swiper_1} alt="swiper 1"/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image className=" " src={swiper_2} alt="swiper 2"/>
                    </SwiperSlide>
                </Swiper>
            </div>
            <Image src={mobile_image} className="hidden h-full  rounded-xl px-3 max-sm:block" alt="header_image"/>
        </>
    );
};

export default HomeSlider;
