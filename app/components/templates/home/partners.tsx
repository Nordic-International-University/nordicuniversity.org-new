"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PartnersType } from "@/types/templates/partners.types";

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
    setActiveIndex(
      partners.map(() => Math.floor(Math.random() * partners.length)),
    );

    const intervalIds = partners.map((_, index) =>
      setInterval(
        () => {
          setActiveIndex((prev) => {
            const newIndices = [...prev];
            newIndices[index] = (newIndices[index] + 1) % partners.length;
            return newIndices;
          });
        },
        Math.random() * 4000 + 4000,
      ),
    );

    return () => {
      intervalIds.forEach(clearInterval);
    };
  }, [partners]);

  return (
    <section className="mt-16 block">
      <h2 className="text-center text-tertiary text-2xl font-semibold mb-16">
        {sectionTitle}
      </h2>
      <div className="slider-container place-items-center grid grid-cols-5  gap-4 max-lg:grid-cols-2 justify-center">
        {partners.slice(0, 5).map((_, colIndex) => (
          <div
            className="slider-column flex justify-center items-center"
            key={colIndex}
          >
            {partners.map((partner, index) => (
              <div
                key={index}
                className={`slide ${index === activeIndex[colIndex] ? "active" : ""}`}
              >
                <Image
                  src={
                    process.env.NEXT_PUBLIC_URL_BACKEND +
                    partner.image.file_path
                  }
                  alt={partner.name}
                  width={400}
                  height={400}
                  className="object-contain w-[150px] h-[100px]"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PartnersSlider;
