"use client";

import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { annualsItem } from "@/types/templates/annuals_and_review.types";
import { useTranslations } from "next-intl";
import { HiOutlineDocumentText, HiOutlineExternalLink } from "react-icons/hi";

const YearEndReview: FC<{ data: annualsItem[] }> = ({ data }) => {
  const t = useTranslations("buttons");
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
      {data.map((item, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-xl overflow-hidden bg-white
            hover:border-text_secondary/20 hover:shadow-sm transition-all duration-200"
        >
          <div className="relative w-full aspect-[1.3] bg-gray-50">
            <Image
              fill
              className="object-cover"
              alt={item.name}
              src={process.env.NEXT_PUBLIC_URL_BACKEND + item.image.file_path}
            />
          </div>

          <div className="p-4">
            <h2 className="text-center text-text_secondary line-clamp-1 text-base font-semibold mb-4">
              {item.name}
            </h2>

            <div className="flex gap-2 w-full">
              {item?.file?.file_path && (
                <Link
                  href={
                    process.env.NEXT_PUBLIC_URL_BACKEND + item.file.file_path
                  }
                  target="_blank"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5
                    bg-text_secondary text-white text-sm font-medium rounded-lg
                    hover:bg-text_secondary/90 transition-colors"
                >
                  <HiOutlineDocumentText className="text-base" />
                  PDF
                </Link>
              )}

              {item?.source_link && (
                <Link
                  href={item.source_link}
                  target="_blank"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5
                    bg-gray-100 text-text_secondary text-sm font-medium rounded-lg
                    hover:bg-gray-200 transition-colors"
                >
                  <HiOutlineExternalLink className="text-base" />
                  {t("online_read")}
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default YearEndReview;
