import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import journal from "@/public/images/research-images/journal.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const ScientificEjournal = ({ volumes }: { volumes: any[] }) => {
  const t = useTranslations("research.eJournal").raw;

  return (
    <article className="mt-8">
      <div className="flex max-md:flex-col-reverse items-start gap-6">
        <div>
          <p
            className="text-tertiary mb-5 font-medium text-justify text-[17px]"
            dangerouslySetInnerHTML={{ __html: t("description") }}
          ></p>
          <strong
            className="font-semibold text-tertiary text-[17px]"
            dangerouslySetInnerHTML={{ __html: t("davr") }}
          ></strong>
        </div>
        <Image
          className="w-auto max-md:w-full max-md:h-auto h-[366px]"
          src={journal}
          alt="journal"
        />
      </div>
      <p className="text-tertiary w-full text-tertiary mt-5 text-[17px]">
        {t("body")}
      </p>
      <div className="mt-8">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".swiper-button-nexts",
            prevEl: ".swiper-button-prevs",
          }}
          watchSlidesProgress
          updateOnWindowResize
          breakpoints={{
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
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          slidesPerView={4}
          className="-translate-x-20 max-lg:translate-x-0"
        >
          {volumes
            ?.sort(
              (a: any, b: any) => a.title.slice(0, 1) - b.title.slice(0, 1),
            )
            ?.map((item: any) => (
              <SwiperSlide
                className="relative w-auto h-[383px] group flex justify-center items-center"
                key={item.id}
              >
                <Image
                  className="h-full w-full object-cover min-w-[100px]"
                  src={`${process.env.NEXT_PUBLIC_URL_JOURNAL}${item?.image?.file_path}`}
                  width={700}
                  height={600}
                  alt="volume"
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </article>
  );
};

export default ScientificEjournal;
