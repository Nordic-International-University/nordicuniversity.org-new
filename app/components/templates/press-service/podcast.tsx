"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import React from "react";
import Link from "next/link";
import { podcastType } from "@/types/press-service/press-releases.types";
import dayjs from "dayjs";
import SocialLinks from "@/app/components/UI/SocialLinks";
import { BiCalendar } from "react-icons/bi";

const Podcast = ({ props }: { props: podcastType[] | any }) => {
  const t = useTranslations("press-service");

  return (
    <article className="mt-8 mb-10">
      <div className="flex flex-col gap-5">
        {props.map((item: podcastType, index: number) => (
          <Link
            target="_blank"
            href={item.video_link}
            key={index}
            className="group flex max-sm:flex-col border border-gray-200 rounded-xl overflow-hidden bg-white
              hover:border-text_secondary/20 hover:shadow-sm transition-all duration-200"
          >
            <div className="w-full h-[220px] sm:w-[260px] sm:h-auto relative flex-shrink-0">
              <Image
                fill
                className="object-cover"
                src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${item.image.file_path}`}
                alt={item.title}
              />
            </div>
            <div className="flex flex-col justify-between flex-1 p-5">
              <div>
                <h2 className="text-lg text-text_secondary font-semibold leading-snug line-clamp-2">
                  {item.title}
                </h2>
                <p className="text-gray-500 text-sm mt-2.5 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>
                {item.hashtags && (
                  <p className="text-text_secondary/60 text-sm mt-2 font-medium tracking-wide">
                    {item.hashtags}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <BiCalendar className="text-sm" />
                  <span className="text-xs">
                    {dayjs(item.createdAt).format("DD-MM-YYYY")}
                  </span>
                </div>
                <SocialLinks
                  className="mt-0"
                  social_network_links={item.social_network_links}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </article>
  );
};

export default Podcast;
