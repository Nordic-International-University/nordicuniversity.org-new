"use client";

import React, { FC } from "react";
import Image from "next/image";
import { Button, Flex } from "antd";
import { annualsItem } from "@/types/templates/annuals_and_review.types";
import { useTranslations } from "next-intl";

const YearEndReview: FC<{ data: annualsItem[] }> = ({ data }) => {
  const t = useTranslations("buttons");
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {data.map((item, index) => (
        <div
          key={index}
          className="shadow-md rounded-md hover:shadow-xl transition-all overflow-hidden bg-white"
        >
          <div className="relative w-full aspect-[1.3] bg-gray-100">
            <Image
              fill
              className="object-cover"
              alt={item.name}
              src={process.env.NEXT_PUBLIC_URL_BACKEND + item.image.file_path}
            />
          </div>

          <div className="p-4">
            <h2 className="text-center text-text_secondary text-base sm:text-lg font-semibold mb-4">
              {item.name}
            </h2>

            <Flex gap={5} className="w-full">
              {item?.file?.file_path && (
                <Button
                  href={
                    process.env.NEXT_PUBLIC_URL_BACKEND + item.file.file_path
                  }
                  target="_blank"
                  className="bg-secondary text-white font-semibold w-full"
                  size="middle"
                >
                  PDF
                </Button>
              )}

              {item?.source_link && (
                <Button
                  href={item.source_link}
                  target="_blank"
                  className="bg-primary text-secodnary font-semibold w-full"
                  size="middle"
                >
                  {t("online_read")}
                </Button>
              )}
            </Flex>
          </div>
        </div>
      ))}
    </div>
  );
};

export default YearEndReview;
