import React, { FC } from "react";
import Image from "next/image";
import { Button } from "antd";
import { annualsItem } from "@/types/templates/annuals_and_review.types";

const YearEndReview: FC<{ allAnnuals: annualsItem[] }> = async ({
  allAnnuals,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {allAnnuals.map((item, index) => (
        <div
          key={index}
          className="shadow-md rounded-md hover:shadow-gray-400 transition-all hover:shadow-2xl overflow-hidden"
        >
          <Image
            width={200}
            height={200}
            className="w-full h-[200px] sm:h-[400px] object-contain"
            alt={item.name}
            src={process.env.NEXT_PUBLIC_URL_BACKEND + item.image.file_path}
          />
          <h2 className="text-text_secondary px-2 my-3 text-center text-sm sm:text-base lg:text-lg">
            {item.name}
          </h2>
          <Button
            href={process.env.NEXT_PUBLIC_URL_BACKEND + item.file.file_path}
            target="_blank"
            className="bg-secondary py-3 text-white font-bold text-sm sm:text-base w-full"
            size="middle"
          >
            PDF
          </Button>
        </div>
      ))}
    </div>
  );
};

export default YearEndReview;
