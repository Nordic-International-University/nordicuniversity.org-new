"use client";

import React, { useMemo } from "react";
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
  const rows = useMemo(() => {
    const r: PartnersType[][] = [[], [], [], []];
    partners.forEach((p, i) => r[i % 4].push(p));
    return r;
  }, [partners]);

  const speeds = [22, 28, 19, 26];
  const dirs: ("left" | "right")[] = ["left", "right", "left", "right"];
  const tilts = [-1.3, 1, -0.7, 1.2];
  const waveDelays = [0, -1.2, -2.5, -3.8];

  return (
    <section className="py-14 max-sm:py-10 relative overflow-hidden bg-white">
      <div className="text-center mb-10 max-sm:mb-8 px-4">
        <h2 className="text-3xl max-lg:text-2xl max-sm:text-xl font-bold text-text_secondary">
          {sectionTitle}
        </h2>
      </div>

      {/* Serpentine flow */}
      <div className="flex flex-col gap-3 max-sm:gap-2">
        {rows.map((row, idx) => {
          if (row.length === 0) return null;
          const repeated = [...row, ...row, ...row, ...row];

          return (
            <div key={idx} className="relative overflow-hidden">
              {/* Edge fades */}
              <div
                className="absolute left-0 top-0 bottom-0 w-32 max-sm:w-16 z-10 pointer-events-none"
                style={{
                  background: "linear-gradient(to right, white, transparent)",
                }}
              />
              <div
                className="absolute right-0 top-0 bottom-0 w-32 max-sm:w-16 z-10 pointer-events-none"
                style={{
                  background: "linear-gradient(to left, white, transparent)",
                }}
              />

              {/* Wave motion */}
              <div
                style={{
                  animation: `snakeWave 5s ease-in-out ${waveDelays[idx]}s infinite`,
                }}
              >
                {/* Tilt */}
                <div style={{ transform: `rotate(${tilts[idx]}deg)` }}>
                  {/* Horizontal scroll */}
                  <div
                    className="flex gap-5 max-sm:gap-3 items-center py-1"
                    style={{
                      animation: `snake-${dirs[idx]} ${speeds[idx]}s linear infinite`,
                      width: "max-content",
                    }}
                  >
                    {repeated.map((partner, i) => (
                      <Link
                        key={`r${idx}-${i}`}
                        href={partner.link}
                        target="_blank"
                        className="flex-shrink-0 group"
                      >
                        <div className="w-[140px] h-[85px] max-sm:w-[105px] max-sm:h-[65px] rounded-2xl flex items-center justify-center p-4 max-sm:p-2.5 transition-transform duration-300 group-hover:scale-110 bg-white shadow-[0_2px_12px_rgba(11,64,117,0.06)]">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${partner.image.file_path}`}
                            alt={partner.name}
                            width={120}
                            height={65}
                            className="object-contain w-full h-full opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                          />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes snake-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }
        @keyframes snake-right {
          0% {
            transform: translateX(-25%);
          }
          100% {
            transform: translateX(0);
          }
        }
        @keyframes snakeWave {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
        }
      `}</style>
    </section>
  );
};

export default PartnersSlider;
