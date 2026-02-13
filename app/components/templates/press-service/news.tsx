import Image from "next/image";
import { NewsItem } from "@/types/templates/newsSlider.type";
import { useTranslations } from "next-intl";
import React from "react";
import Link from "next/link";
import { BiCalendar } from "react-icons/bi";
import { HiOutlineArrowRight } from "react-icons/hi";

const News = ({ props }: { props: NewsItem[] | any }) => {
  const t = useTranslations("press-service");

  return (
    <article className="mt-8 mb-10">
      <div className="flex flex-col gap-5">
        {props.map((item: NewsItem, index: number) => (
          <Link
            key={index}
            href={`/press-service/news/${item.slug}`}
            className="group flex max-sm:flex-col border border-gray-200 rounded-xl overflow-hidden bg-white
              hover:border-text_secondary/20 hover:shadow-sm transition-all duration-200"
          >
            <div className="w-full h-[220px] sm:w-[260px] sm:h-auto relative flex-shrink-0">
              <Image
                fill
                className="object-cover"
                src={process.env.NEXT_PUBLIC_URL_BACKEND + item.image.file_path}
                alt={item.title}
              />
            </div>

            <div className="flex flex-col justify-between flex-1 p-5">
              <div>
                <h2 className="text-lg font-semibold text-text_secondary leading-snug line-clamp-2">
                  {item.title}
                </h2>
                <p className="text-gray-500 text-sm mt-2.5 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <BiCalendar className="text-sm" />
                  <span className="text-xs">{item.time}</span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-text_secondary text-sm font-medium group-hover:gap-2.5 transition-all">
                  {t("news.button")}
                  <HiOutlineArrowRight className="text-sm" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </article>
  );
};

export default News;
