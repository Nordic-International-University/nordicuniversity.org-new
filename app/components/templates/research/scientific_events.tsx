import { researchEventProps } from "@/types/research/scince_events";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import {
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
import { FaTelegram } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/navigation";
import React, { useState } from "react";
import { Navigation } from "swiper/modules";
import { Button } from "antd";

const ScientificEvents = ({ props, buttons }: researchEventProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <article className="mt-12">
      <div className="flex items-center justify-center mb-6 gap-5">
        {buttons?.map((button, index) => (
          <Button
            key={index}
            size="large"
            className={`px-8 rounded text-md font-semibold ${button.className}`}
            onClick={button.onClick}
          >
            {button.label}
          </Button>
        ))}
      </div>
      <div className="border-2 border-[#7A98C1] max-lg:border-transparent rounded max-lg:p-0 p-4">
        <Swiper
          direction="horizontal"
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides={true}
          onSlideChange={handleSlideChange}
          navigation={{
            prevEl: ".swiperNumericDown",
            nextEl: ".swiperNumericUp",
          }}
          breakpoints={{
            1024: {
              direction: "horizontal",
              slidesPerView: 1,
              spaceBetween: 30,
            },
            300: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
          }}
          modules={[Navigation]}
          className="h-[243px] max-lg:h-auto"
        >
          {props.map((items, index) => (
            <SwiperSlide className="h-[243px] max-lg:h-auto" key={index}>
              <div className="flex items-start max-lg:flex-col gap-5">
                <Image
                  width={405}
                  height={243}
                  className="max-lg:w-full h-full"
                  src={items.image_url}
                  alt={items.title}
                />
                <div>
                  <h2 className="text-secondary text-[18px] max-lg:pr-0 max-lg:text-left pr-40 pb-3 font-semibold">
                    {items.title}
                  </h2>
                  <p className="text-[#7A98C1]  max-lg:text-left text-md pb-2">
                    {items.description}
                  </p>
                  <div className="flex text-[#7A98C1] pb-4 items-center gap-2">
                    <FaClock />
                    <h2>{items.date}</h2>
                  </div>
                  <h3 className="text-tertiary text-[17px] font-semibold">
                    {items.full_name}
                  </h3>
                  <div className="flex items-center mt-6 gap-2">
                    {items.social_links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#7A98C1] hover:text-secondary"
                        aria-label={link.alt}
                      >
                        {link.social_name === "facebook" && (
                          <FaFacebook className="text-2xl" />
                        )}
                        {link.social_name === "telegram" && (
                          <FaTelegram className="text-2xl" />
                        )}
                        {link.social_name === "youtube" && (
                          <FaYoutube className="text-2xl" />
                        )}
                        {link.social_name === "instagram" && (
                          <FaInstagram className="text-2xl" />
                        )}
                        {link.social_name === "twitter" && (
                          <FaTwitter className="text-2xl" />
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex items-center mb-10 justify-center mt-6 gap-6">
        <div className="cursor-pointer">
          <FaChevronUp className="text-lg -rotate-90 text-text_secondary swiperNumericDown" />
        </div>
        <div className="flex items-center gap-3">
          {props.map((_, index) => (
            <div
              key={index}
              className={`h-5 p-2.5 flex flex-col border-[1px] border-[#7A98C1] items-center justify-center  w-5 rounded ${
                activeIndex === index
                  ? "bg-text_secondary text-white"
                  : "text-text_secondary"
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <div className="cursor-pointer">
          <FaChevronDown className="text-lg -rotate-90 text-text_secondary swiperNumericUp" />
        </div>
      </div>
    </article>
  );
};

export default ScientificEvents;
