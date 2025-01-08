import React, { FC } from "react";
import Image from "next/image";
import { Button } from "antd";
import { annualsItem } from "@/types/templates/annuals_and_review.types";

const YearEndReview: FC<{ allAnnuals: annualsItem[] }> = async ({
  allAnnuals,
}) => {
  return (
    <div className="grid-cols-3 mt-4">
      {allAnnuals.map((item, index) => (
        <div
          key={index}
          className="shadow-md w-72 max-md:w-full rounded-md hover:shadow-gray-400 transition-all hover:shadow-2xl overflow-hidden"
        >
          <Image
            width={200}
            height={200}
            className="mx-auto block w-full h-[250px] object-cover"
            alt={item.name}
            src={process.env.NEXT_PUBLIC_URL_BACKEND + item.image.file_path}
          />
          <h2 className="text-text_secondary pl-2 my-3">{item.name}</h2>
          <Button
            href={process.env.NEXT_PUBLIC_URL_BACKEND + item.file.file_path}
            target="_blank"
            className="bg-secondary py-[17px] text-white rounded-none font-bold text-lg w-full"
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
