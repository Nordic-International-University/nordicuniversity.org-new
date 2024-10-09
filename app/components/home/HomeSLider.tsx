"use client";

import mobile_image from "@/public/mobile_image.webp";
import React, { useState } from "react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-fade";
import { Button } from "antd";
import Link from "next/link";
import Cookies from "js-cookie";

const HomeSlider = () => {
  const [isAuth, setIsAuth] = useState(Cookies.get("access_token"));

  return (
    <>
      <header className="container">
        <div className="flex items-center max-lg:items-start max-lg:flex-col-reverse justify-between max-lg:mt-1 mt-10 max-lg:mb-5 mb-12">
          <div className="max-md:mt-5 max-lg:hidden block">
            <div className="max-w-[700px] max-lg:w-full">
              <h1 className="text-7xl max-md:text-4xl text-blue-600">
                <strong className="block">Nordik</strong>
                <span className="block">
                  ilmiy-amaliy elektron <br /> jurnali
                </span>
              </h1>
            </div>
            <div className="flex flex-wrap max-sm:mt-7 justify-start mt-14 gap-6">
              <Link
                href={`${isAuth ? "/createarticle" : "/register?fromhome=true"}`}
              >
                <Button className="bg-gradient-to-r from-blue-500 shadow-2xl via-sky-400 to-teal-400 px-6 py-6 text-xl text-white">
                  Maqola yuborish
                </Button>
              </Link>
            </div>
          </div>
          <Image
            src={mobile_image}
            className="h-auto w-[500px] max-lg:h-[600px] max-lg:object-cover max-sm:h-auto max-sm:object-contain max-lg:w-full drop-shadow-2xl rounded-2xl"
            alt="header_image"
          />
        </div>
      </header>
    </>
  );
};

export default HomeSlider;
