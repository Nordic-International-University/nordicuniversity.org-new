import { useTranslations } from "next-intl";
import React from "react";
import { pressReleasesType } from "@/types/press-service/press-releases.types";
import Link from "next/link";
import { BiCalendar } from "react-icons/bi";
import { HiOutlineArrowRight } from "react-icons/hi";

const Releases = ({ props }: { props: pressReleasesType[] }) => {
  const t = useTranslations("press-service");

  return (
    <article className="mt-8 mb-10">
      <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-5">
        {props.map((item, index) => (
          <Link
            href={`/press-service/releases/${item.slug}`}
            key={index}
            className="group border border-gray-200 rounded-xl p-5 bg-white
              hover:border-text_secondary/20 hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <h2 className="font-semibold text-lg text-text_secondary line-clamp-2 leading-snug group-hover:text-text_secondary/80 transition-colors">
                {item.title}
              </h2>
              <p
                className="text-sm text-gray-500 mt-3 line-clamp-3 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item.body }}
              />
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
          </Link>
        ))}
      </div>
    </article>
  );
};

export default Releases;
