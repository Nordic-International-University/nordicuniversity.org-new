"use client";

import { ItemImage } from "@/types/students/students.types";
import Image from "next/image";
import { useState } from "react";

const Procedures = ({ data }: { data: Array<ItemImage> }) => {
  const [selectedIndex, setSelectedIndex] = useState(1);

  if (!data || data.length === 0) return null;

  const mainImage = data[selectedIndex] || data[0];

  return (
    <article className="mt-6">
      <div className="w-full max-w-[400px]">
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid rgba(11,64,117,0.08)" }}
        >
          <Image
            className="w-full h-[260px] object-cover"
            width={400}
            height={260}
            src={
              process.env.NEXT_PUBLIC_URL_BACKEND + mainImage.photo.file_path
            }
            alt={mainImage.photo.file_name}
          />
        </div>
        <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
          {data.slice(0, data.length - 1).map((item: ItemImage, index) => (
            <div
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`flex-shrink-0 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                selectedIndex === index
                  ? "ring-2 ring-offset-1"
                  : "opacity-60 hover:opacity-100"
              }`}
              style={{ // @ts-ignore
  "--tw-ring-color": "#0b4075" } as any}
            >
              <Image
                width={50}
                height={50}
                src={
                  process.env.NEXT_PUBLIC_URL_BACKEND + item.photo.file_path
                }
                alt={item.photo.file_name}
                className="w-[50px] h-[50px] object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

export default Procedures;
