import React from "react";
import Image from "next/image";
import {SwiperSlide} from "swiper/react";
import {aboutSliderProps} from "@/types/about.types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const AboutSlider = ({image, name, description}: aboutSliderProps) => {
    return (
        <SwiperSlide className="w-full">
            <div className=" text-center">
                <Image src={image} alt="Tahririyat hayati rasm" className=""/>
                <div
                    className="absolute w-1/3 px-1 bottom-0 left-0 right-0 bg-[rgba(1,150,227,0.6)] bg-opacity-50 text-white h-[55px]">
                    <p className="text-xs font-semibold">{name}</p>
                    <p className="text-white text-[10px]">{description}</p>
                </div>
            </div>
        </SwiperSlide>
    );
};

export default AboutSlider;
