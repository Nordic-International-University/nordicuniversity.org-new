"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PartnersType } from "@/types/templates/partners.types";
import Link from "next/link";
export const distributeIntoColumns = (
  partners: PartnersType[],
  numberOfColumns: number,
) => {
  const columns: PartnersType[][] = Array.from(
    { length: numberOfColumns },
    () => [],
  );

  partners.forEach((partner, index) => {
    columns[index % numberOfColumns].push(partner);
  });

  return columns;
};
interface PartnersSliderProps {
  partners: PartnersType[];
  sectionTitle: string;
}

const PartnersSlider: React.FC<PartnersSliderProps> = ({
  partners,
  sectionTitle,
}) => {
  const numberOfColumns = 5; // Kolumnalar sonini belgilash
  const columns = distributeIntoColumns(partners, numberOfColumns);

  const [activeIndices, setActiveIndices] = useState<number[]>(
    columns.map(() => 0),
  );

  useEffect(() => {
    const intervalIds = columns.map((_, columnIndex) => {
      const intervalTime = Math.random() * 4000 + 4000; // 4-8 soniya oralig'ida

      return setInterval(() => {
        setActiveIndices((prev) => {
          const newIndices = [...prev];
          newIndices[columnIndex] =
            (newIndices[columnIndex] + 1) % columns[columnIndex].length;
          return newIndices;
        });
      }, intervalTime);
    });

    return () => {
      intervalIds.forEach(clearInterval);
    };
  }, [columns]);

  return (
    <section className="mt-16 container mx-auto px-4 lg:px-8">
      <h2 className="text-center text-tertiary max-sm:text-lg max-sm:text-left text-2xl font-semibold mb-16 max-md:mb-5">
        {sectionTitle}
      </h2>
      <div className="slider-container grid grid-cols-5 place-items-center gap-4 max-lg:grid-cols-4 max-md:grid-cols-2 max-md:grid-rows-2 max-sm:gap-3 justify-center">
        {columns.map((columnPartners, colIndex) => (
          <div
            className="slider-column flex justify-center items-center"
            key={colIndex}
          >
            {columnPartners.map((partner, index) => (
              <Link
                target="_blank"
                href={partner.link}
                key={index}
                className={`slide ${
                  index === activeIndices[colIndex] ? "active" : ""
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
                  className="object-contain w-[150px] h-[100px] max-sm:w-[100px] max-sm:h-[100px]"
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
