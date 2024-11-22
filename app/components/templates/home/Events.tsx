"use client";

import React, { useEffect, useRef } from "react";
import { EventsTypeProps } from "@/types/templates/events.types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dayjs from "dayjs";

gsap.registerPlugin(ScrollTrigger);

const Events = ({ props, sectionTitle }: EventsTypeProps) => {
  const dateRefs = useRef([]);
  const titleRefs = useRef([]);
  const descriptionRefs = useRef([]);

  useEffect(() => {
    dateRefs.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );
    });

    titleRefs.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );
    });

    descriptionRefs.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );
    });
  }, []);

  return (
    <section className="container">
      <h2 className="text-center text-tertiary font-semibold text-2xl pt-12 pb-7">
        {sectionTitle}
      </h2>
      <div className="grid mt-9 grid-cols-2 max-lg:grid-cols-1 justify-between place-items-center gap-10">
        {props.map((item, index) => (
          <div className="flex items-center max-w-[530px] gap-6" key={index}>
            <div
              ref={(el: any) => ((dateRefs as any).current[index] = el)}
              className="bg-text_secondary rounded-full w-[105px] h-[105px] flex flex-col items-center justify-center shrink-0 max-sm:w-[100px] max-sm:h-[100px]"
            >
              <h2 className="uppercase font-bold text-center text-sm text-text_tertiary leading-relaxed tracking-wider">
                {dayjs(item.time).isValid()
                  ? dayjs(item.time).format("D") // Valid bo‘lsa original sana
                  : dayjs().format("D")}{" "}
                {/* Invalid bo‘lsa bugungi sana */}
              </h2>
              <h2 className="uppercase font-semibold text-center text-sm text-text_tertiary">
                {dayjs(item.time).isValid()
                  ? dayjs(item.time).format("MMMM") // Valid bo‘lsa original oy
                  : dayjs().format("MMMM")}{" "}
                {/* Invalid bo‘lsa bugungi oy */}
              </h2>
            </div>

            <div>
              <h2
                ref={(el: any) => ((titleRefs as any).current[index] = el)}
                className="font-semibold line-clamp-1 text-tertiary"
              >
                {item.name}
              </h2>
              <p
                ref={(el: any) =>
                  ((descriptionRefs as any).current[index] = el)
                }
                className="text-text_secondary line-clamp-2"
              >
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Events;
