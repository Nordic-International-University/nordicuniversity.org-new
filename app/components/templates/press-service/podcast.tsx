"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { FaClock } from "react-icons/fa";
import React from "react";
import Link from "next/link";
import { podcastType } from "@/types/press-service/press-releases.types";

const Podcast = ({ props }: { props: podcastType[] | any }) => {
  const t = useTranslations("press-service");
  console.log(props);
  return (
    <article className="mt-10 mb-10">
      <div className="flex flex-col max-sm:gap-8 gap-6 max-md:place-items-center">
        {props.map((item: any, index: number) => (
          <Link key={index} href={`/press-service/news/${item.slug}`}>
            <div className="w-full p-4 max-sm:border-none max-sm:p-0 max-sm:flex-col border-[1px] flex gap-6 items-stretch">
              <Image
                width={260}
                className="h-[230px] w-[400px]"
                height={200}
                src={process.env.NEXT_PUBLIC_URL_BACKEND + item.image.file_path}
                alt={item.title}
              />

              <div className="w-full flex flex-col">
                <div className="flex-grow">
                  <h2 className="max-sm:text-sm pb-4 text-xl text-text_secondary">
                    {item.title}
                  </h2>
                  <div className="flex text-[#7A98C1] mt-3 pb-4 items-center gap-2">
                    <FaClock />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </article>
  );
};

export default Podcast;
