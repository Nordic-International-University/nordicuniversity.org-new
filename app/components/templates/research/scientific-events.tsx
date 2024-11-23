import { ScientificEvent } from "@/types/research/scince_events";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import {
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaTelegram,
} from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import React, { useState } from "react";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import NoDataComponent from "@/app/components/UI/no-data";

const ScientificEvents = ({ props }: { props: ScientificEvent[] }) => {
  const [_, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  };

  if (props.length === 0) {
    return <NoDataComponent />;
  }

  return (
    <article className="mt-12">
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
                  height={343}
                  className="max-lg:w-full object-cover h-full min-w-[213px] min-h-[313px]"
                  src={
                    process.env.NEXT_PUBLIC_URL_BACKEND + items.image.file_path
                  }
                  alt={items.name}
                />
                <div>
                  <div className="max-md:mb-5">
                    <h2 className="text-secondary text-[18px] max-lg:pr-0 max-lg:text-left pr-40 pb-3 max-md:pb-0 font-semibold line-clamp-2">
                      {items.name}
                    </h2>
                  </div>

                  <p className="text-[#7A98C1] max-lg:text-left text-md pb-2 line-clamp-3">
                    {items.description}
                  </p>
                  <div className="flex text-[#7A98C1] pb-4 items-center gap-2">
                    <FaClock />
                    <h2>{items.time}</h2>
                  </div>
                  <h3 className="text-tertiary text-[17px] font-semibold">
                    SPIKER-{items.speaker_name}
                  </h3>
                  <div className="flex items-center mt-6 gap-2">
                    {Object.entries(items.social_network_links).map(
                      ([key, value]: any, idx) => {
                        return (
                          <Link
                            key={idx}
                            href={value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#7A98C1] hover:text-secondary"
                            aria-label={key}
                          >
                            {key === "facebook" && (
                              <FaFacebook className="text-2xl" />
                            )}
                            {key === "telegram" && (
                              <FaTelegram className="text-2xl" />
                            )}
                            {key === "youtube" && (
                              <FaYoutube className="text-2xl" />
                            )}
                            {key === "instagram" && (
                              <FaInstagram className="text-2xl" />
                            )}
                            {key === "twitter" && (
                              <FaTwitter className="text-2xl" />
                            )}
                          </Link>
                        );
                      },
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </article>
  );
};

export default ScientificEvents;
