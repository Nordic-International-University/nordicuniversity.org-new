import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import journal from "@/public/images/research-images/journal.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Button } from "antd";

const ScientificEjournal = ({ volumes }: { volumes: any[] }) => {
  const t = useTranslations("research.eJournal").raw;

  return (
    <article className="mt-8">
      <div className="flex max-md:flex-col-reverse items-start gap-6">
        <div className="flex max-md:flex-col-reverse max-md:flex-row items-start gap-6">
          <div className="flex-1">
            <p
              className="text-tertiary mb-5 font-medium text-justify text-[17px]"
              dangerouslySetInnerHTML={{ __html: t("description") }}
            ></p>
            <strong
              className="font-semibold text-tertiary text-[17px]"
              dangerouslySetInnerHTML={{ __html: t("davr") }}
            ></strong>
          </div>
          <div className="w-full max-w-[500px]">
            <Image
              className="w-full h-auto object-cover rounded-lg"
              src={journal}
              alt="journal"
              layout="responsive" // Agar Next.js Image komponentini ishlatayotgan bo‘lsangiz
              // sizga kerakli bo‘lgan propslarni qo‘shing, masalan:
              // width={500}
              // height={366}
            />
            <Button
              href="https://journal.nordicuniversity.org/"
              className="bg-text_secondary w-full text-white font-semibold py-4 px-4 rounded-b-lg shadow-md hover:shadow-lg hover:bg-secondary-dark focus:ring-4 focus:ring-secondary-light transition-all duration-300"
            >
              {t("button")}
            </Button>
          </div>
        </div>
      </div>
      <p className="w-full text-tertiary mt-5 text-[17px]">{t("body")}</p>

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
                className="relative group flex justify-center items-center"
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
