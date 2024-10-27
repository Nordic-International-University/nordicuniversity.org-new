"use client";

import statistics from "@/public/images/university-images/statistics.png";
import hand from "@/public/images/university-images/hand.png";
import search from "@/public/images/university-images/search.png";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Advantages = () => {
  const t = useTranslations("university.advantages").raw;

  const images = [hand, statistics, search];
  return (
    <article className="mt-12">
      <div className="flex flex-col gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="flex items-center max-sm:flex-col max-sm:items-center max-sm:justify-center gap-4"
          >
            <div className="bg-text_secondary flex items-center justify-center min-h-24 min-w-24 rounded-full">
              <Image className="m-auto block" src={image} alt="qo‘l" />
            </div>
            <div
              className="text-md max-sm:text-center text-gray-800"
              dangerouslySetInnerHTML={{
                __html: t(`cardTitle.${index}`),
              }}
            />
          </div>
        ))}
      </div>
    </article>
  );
};

export default Advantages;
