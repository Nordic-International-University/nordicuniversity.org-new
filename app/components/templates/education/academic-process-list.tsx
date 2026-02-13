"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import NoDataComponent from "@/app/components/UI/no-data";
import { HiOutlineArrowRight } from "react-icons/hi";

const AcademicProcessList = ({
  props,
  path,
}: {
  props: any;
  path?: string;
}) => {
  const t = useTranslations("buttons");

  if (props.data.length === 0) {
    return <NoDataComponent />;
  }

  return (
    <article className="mt-8">
      <div className="flex flex-col gap-5">
        {props?.data.map((item: any, index: number) => (
          <div
            key={item.id || index}
            className="group flex max-sm:flex-col h-[220px] max-sm:h-auto border border-gray-200 rounded-xl
              bg-white hover:border-text_secondary/20 hover:shadow-sm
              transition-all duration-300 overflow-hidden"
          >
            {/* Image */}
            <div className="w-[280px] h-[220px] max-sm:w-full max-sm:h-52 flex-shrink-0 relative">
              <Image
                fill
                src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${item.image.file_path}`}
                alt={item.name}
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between flex-1 p-5 sm:p-6">
              <div>
                <h2 className="text-text_secondary text-lg font-bold leading-snug line-clamp-2">
                  {item.name}
                </h2>
                <p className="mt-3 text-gray-500 text-[15px] leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>

              <div className="mt-4">
                <Link
                  href={`${path}${item.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
                    bg-text_secondary text-white text-sm font-medium
                    hover:bg-text_secondary/90 transition-colors duration-200"
                >
                  {t("see")}
                  <HiOutlineArrowRight className="text-base group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

export default AcademicProcessList;
