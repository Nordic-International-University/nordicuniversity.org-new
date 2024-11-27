"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PartnersType } from "@/types/templates/partners.types";
import Link from "next/link";

interface PartnersSliderProps {
  partners: PartnersType[];
  sectionTitle: string;
}

const PartnersSlider: React.FC<PartnersSliderProps> = ({
  partners,
  sectionTitle,
}) => {
  const [activeIndex, setActiveIndex] = useState<number[]>([]);

  useEffect(() => {
    // Инициализация активных индексов
    setActiveIndex(
      partners.map(() => Math.floor(Math.random() * partners.length)),
    );

    // Установка интервалов для смены картинок
    const intervalIds = partners.map((_, index) =>
      setInterval(
        () => {
          setActiveIndex((prev) => {
            const newIndices = [...prev];
            newIndices[index] = (newIndices[index] + 1) % partners.length;
            return newIndices;
          });
        },
        Math.random() * 4000 + 4000, // Случайный интервал 4-8 секунд
      ),
    );

    return () => {
      intervalIds.forEach(clearInterval);
    };
  }, [partners]);

  return (
    <section className="mt-16 block container  justify-center ">
      <h2 className="text-center text-tertiary max-sm:text-lg max-sm:text-left text-2xl font-semibold mb-16 max-md:mb-5">
        {sectionTitle}
      </h2>
      <div className="slider-container grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-md:grid-rows-2 max-sm:gap-3 justify-center">
        {partners.slice(0, 4).map((_, colIndex) => (
          <div
            className="slider-column flex justify-center items-center"
            key={colIndex}
          >
            {partners.map((partner, index) => (
              <Link
                target="_blank"
                href={partner.link}
                key={index}
                className={`slide ${
                  index === activeIndex[colIndex] ? "active" : ""
                }`}
              >
                <Image
                  src={
                    process.env.NEXT_PUBLIC_URL_BACKEND +
                    partner.image.file_path
                  }
                  alt={partner.name}
                  width={400}
                  height={400}
                  className="object-contain w-[150px] h-[100px] max-sm:w-[100px] max-sm:h-[70px]"
                />
              </Link>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PartnersSlider;
