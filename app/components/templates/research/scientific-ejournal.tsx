"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import journal from "@/public/images/research-images/journal.png";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { HiOutlineArrowRight, HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

const ScientificEjournal = ({ volumes }: { volumes: any[] }) => {
  const t = useTranslations("research.eJournal").raw;

  return (
    <article className="mt-6">
      {/* Hero section */}
      <div className="flex max-md:flex-col-reverse items-start gap-8">
        <div className="flex-1">
          <div
            className="text-gray-600 text-base leading-7 text-justify"
            dangerouslySetInnerHTML={{ __html: t("description") }}
          />
          <div
            className="mt-4 text-text_secondary font-semibold text-base leading-7"
            dangerouslySetInnerHTML={{ __html: t("davr") }}
          />
        </div>

        {/* Journal image + button */}
        <div className="w-full max-w-[420px] max-md:max-w-full flex-shrink-0">
          <div className="border border-gray-200 rounded-xl overflow-hidden
            hover:border-text_secondary/20 hover:shadow-sm transition-all duration-200">
            <Image
              className="w-full h-auto object-cover"
              src={journal}
              alt="journal"
            />
            <Link
              href="https://journal.nordicuniversity.org/"
              target="_blank"
              className="flex items-center justify-center gap-2 w-full py-3.5 px-4
                bg-text_secondary text-white text-sm font-medium
                hover:bg-text_secondary/90 transition-colors"
            >
              {t("button")}
              <HiOutlineArrowRight className="text-base" />
            </Link>
          </div>
        </div>
      </div>

      {/* Body text */}
      <p className="text-gray-600 text-base leading-7 mt-6">{t("body")}</p>

      {/* Volumes carousel */}
      {volumes?.length > 0 && (
        <div className="mt-10 relative">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-text_secondary font-semibold text-lg">
              {t("sectionTitle")}
            </h3>
            <div className="flex items-center gap-2">
              <button className="ejournal-prev w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center
                text-gray-500 hover:border-text_secondary hover:text-text_secondary transition-colors">
                <HiOutlineChevronLeft className="text-lg" />
              </button>
              <button className="ejournal-next w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center
                text-gray-500 hover:border-text_secondary hover:text-text_secondary transition-colors">
                <HiOutlineChevronRight className="text-lg" />
              </button>
            </div>
          </div>

          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".ejournal-next",
              prevEl: ".ejournal-prev",
            }}
            watchSlidesProgress
            updateOnWindowResize
            breakpoints={{
              320: { slidesPerView: 1.5, spaceBetween: 12 },
              480: { slidesPerView: 2, spaceBetween: 16 },
              640: { slidesPerView: 2.5, spaceBetween: 16 },
              1024: { slidesPerView: 3, spaceBetween: 20 },
              1280: { slidesPerView: 4, spaceBetween: 20 },
            }}
          >
            {volumes
              ?.sort(
                (a: any, b: any) => a.title.slice(0, 1) - b.title.slice(0, 1),
              )
              ?.map((item: any) => (
                <SwiperSlide key={item.id}>
                  <div className="border border-gray-200 rounded-xl overflow-hidden bg-white
                    hover:border-text_secondary/20 hover:shadow-sm transition-all duration-200">
                    <div className="relative aspect-[3/4]">
                      <Image
                        fill
                        className="object-cover"
                        src={`${process.env.NEXT_PUBLIC_URL_JOURNAL}${item?.image?.file_path}`}
                        alt={item.title || "volume"}
                        loading="lazy"
                      />
                    </div>
                    {item.title && (
                      <div className="px-3 py-2.5 text-center">
                        <p className="text-sm font-medium text-text_secondary line-clamp-1">
                          {item.title}
                        </p>
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      )}
    </article>
  );
};

export default ScientificEjournal;