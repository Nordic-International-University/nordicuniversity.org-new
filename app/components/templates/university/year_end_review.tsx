import React from "react";
import Image from "next/image";
import { Button } from "antd";

const array = [
  {
    image: "/images/university-images/year-summary.png",
    title: "2024-2025 yil sarhisobi",
    pdf: "/pdf/summary.pdf",
  },
];

const YearEndReview = () => {
  return (
    <div className="grid-cols-3 mt-4">
      {array.map((item, index) => (
        <div className="shadow-md w-72 max-md:w-full rounded-md hover:shadow-gray-400 transition-all hover:shadow-2xl overflow-hidden">
          <Image
            width={200}
            height={200}
            className="mx-auto block w-full h-[250px] object-cover"
            alt={item.title}
            src={item.image}
          />
          <h2 className="text-text_secondary pl-2 my-3">{item.title}</h2>
          <Button
            href={item.pdf}
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
