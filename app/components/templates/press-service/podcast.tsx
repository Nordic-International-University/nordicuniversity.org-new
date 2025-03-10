"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  FaClock,
  FaInstagram,
  FaTelegram,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";
import React from "react";
import Link from "next/link";
import { podcastType } from "@/types/press-service/press-releases.types";
import dayjs from "dayjs";
import SocialLinks from "@/app/components/UI/SocialLinks";

const Podcast = ({ props }: { props: podcastType[] | any }) => {
  const t = useTranslations("press-service");

  return (
    <article className="mt-10 mb-10">
      <div className="flex flex-col max-sm:gap-8 gap-6 max-md:place-items-center">
        {props.map((item: podcastType, index: number) => (
          <Link
            target="_blank"
            href={item.video_link}
            key={index}
            className="w-full p-4 border-[1px] border-gray-300 rounded-lg flex gap-6 items-stretch max-sm:flex-col max-sm:border-none max-sm:p-0"
          >
            <div className="w-[249px] max-sm:w-full h-[240px] flex-shrink-0 overflow-hidden rounded-md">
              <Image
                width={249}
                height={240}
                className="w-full h-full object-cover"
                src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${item.image.file_path}`}
                alt={item.title}
              />
            </div>
            <div className="flex flex-col justify-between w-full">
              <div>
                <h2 className="text-xl text-text_secondary max-sm:text-sm pb-4 font-semibold">
                  {item.title}
                </h2>
                <p className="text-gray-600 line-clamp-4 max-sm:text-sm">
                  {item.description}
                </p>
                <p className="text-gray-600 max-sm:text-sm mt-3 font-semibold tracking-widest">
                  {item.hashtags}
                </p>
              </div>
              <div className="flex text-[#7A98C1] mt-3 pb-4 items-center gap-2">
                <FaClock />
                <span className="text-sm">
                  {dayjs(item.createdAt).format("DD-MM-YYYY")}
                </span>
              </div>
              <div className="justify-center flex items-center gap-4">
                <span className="h-[0.5px] w-full bg-tertiary"></span>
                <SocialLinks
                  className="mt-0"
                  social_network_links={item.social_network_links}
                />
                <span className="h-[0.5px] w-full bg-tertiary"></span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </article>
  );
};

export default Podcast;
