"use client";

import React, { useState } from "react";
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
  const [isPaused, setIsPaused] = useState(false);

  const firstRow = partners.slice(0, Math.ceil(partners.length / 2));
  const secondRow = partners.slice(Math.ceil(partners.length / 2));

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-box_color/20 to-transparent" />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-tertiary text-3xl max-lg:text-2xl max-sm:text-xl font-bold">
            {sectionTitle}
          </h2>
        </div>

        <div
          className="space-y-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* First Row */}
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div
              className={`flex gap-6 ${isPaused ? "[animation-play-state:paused]" : ""}`}
              style={{
                animation: "scrollLeft 35s linear infinite",
                width: "max-content",
              }}
            >
              {[...firstRow, ...firstRow, ...firstRow].map((partner, index) => (
                <Link
                  key={`row1-${index}`}
                  href={partner.link}
                  target="_blank"
                  className="group flex-shrink-0"
                >
                  <div className="w-[160px] h-[90px] max-sm:w-[120px] max-sm:h-[70px] bg-white rounded-xl border border-tertiary/10 flex items-center justify-center p-3 transition-all duration-300 hover:border-text_secondary/30 hover:shadow-lg">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${partner.image.file_path}`}
                      alt={partner.name}
                      width={140}
                      height={70}
                      className="object-contain w-full h-full grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Second Row */}
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div
              className={`flex gap-6 ${isPaused ? "[animation-play-state:paused]" : ""}`}
              style={{
                animation: "scrollRight 40s linear infinite",
                width: "max-content",
              }}
            >
              {[...secondRow, ...secondRow, ...secondRow].map((partner, index) => (
                <Link
                  key={`row2-${index}`}
                  href={partner.link}
                  target="_blank"
                  className="group flex-shrink-0"
                >
                  <div className="w-[160px] h-[90px] max-sm:w-[120px] max-sm:h-[70px] bg-white rounded-xl border border-tertiary/10 flex items-center justify-center p-3 transition-all duration-300 hover:border-text_secondary/30 hover:shadow-lg">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${partner.image.file_path}`}
                      alt={partner.name}
                      width={140}
                      height={70}
                      className="object-contain w-full h-full grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes scrollRight {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
};

export default PartnersSlider;
