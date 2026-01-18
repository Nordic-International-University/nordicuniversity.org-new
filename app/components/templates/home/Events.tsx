"use client";

import React, { useEffect, useRef } from "react";
import { EventsTypeProps } from "@/types/templates/events.types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dayjs from "dayjs";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Events = ({ props, sectionTitle }: EventsTypeProps) => {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });
  }, []);

  return (
    <section className="py-16">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-tertiary text-3xl max-lg:text-2xl max-sm:text-xl font-bold">
            {sectionTitle}
          </h2>
        </div>

        {/* Events Grid - Equal Height Cards */}
        <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-5">
          {props.map((item, index) => (
            <Link
              href={`/partners/forum-and-projects/${item.slug}`}
              key={index}
              ref={(el: any) => (cardsRef.current[index] = el)}
              className="group"
            >
              <div className="h-full flex items-stretch bg-white rounded-2xl border border-tertiary/10 overflow-hidden hover:border-text_secondary/30 hover:shadow-lg transition-all duration-300">
                {/* Date Section */}
                <div className="flex-shrink-0 w-24 max-sm:w-20 bg-text_secondary flex flex-col items-center justify-center text-white p-4">
                  <span className="text-3xl max-sm:text-2xl font-bold">
                    {dayjs(item.time).isValid()
                      ? dayjs(item.time).format("DD")
                      : dayjs().format("DD")}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wide opacity-80">
                    {dayjs(item.time).isValid()
                      ? dayjs(item.time).format("MMM")
                      : dayjs().format("MMM")}
                  </span>
                  <span className="text-xs opacity-60 mt-1">
                    {dayjs(item.time).isValid()
                      ? dayjs(item.time).format("YYYY")
                      : dayjs().format("YYYY")}
                  </span>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-5 max-sm:p-4 flex flex-col justify-center min-w-0">
                  <h3 className="text-tertiary font-semibold text-base max-sm:text-sm line-clamp-1 mb-2 group-hover:text-text_secondary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-tertiary/50 text-sm max-sm:text-xs line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 flex items-center pr-5 max-sm:pr-3">
                  <ArrowRight className="w-5 h-5 max-sm:w-4 max-sm:h-4 text-tertiary/20 group-hover:text-text_secondary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
