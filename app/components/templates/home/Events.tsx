"use client";

import React, { useEffect, useRef } from "react";
import { EventsTypeProps } from "@/types/templates/events.types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Events = ({
  props,
  sectionTitle,
  sectionDescription,
}: EventsTypeProps) => {
  const dateRefs = useRef([]); // Array of refs for each date circle
  const titleRefs = useRef([]); // Array of refs for each title
  const descriptionRefs = useRef([]); // Array of refs for each description

  useEffect(() => {
    // Animation for date circles
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
            start: "top 90%", // Start animation when top of element is 90% in view
            toggleActions: "play none none none",
          },
        },
      );
    });

    // Animation for titles
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
            start: "top 90%", // Start animation when top of element is 90% in view
            toggleActions: "play none none none",
          },
        },
      );
    });

    // Animation for descriptions
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
            start: "top 90%", // Start animation when top of element is 90% in view
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
      <p className="text-text_secondary text-center text-opacity-80 text-lg font-medium">
        {sectionDescription}
      </p>
      <div className="grid mt-9 grid-cols-2 max-lg:grid-cols-1 justify-between place-items-center gap-10">
        {props.map((item, index) => (
          <div className="flex items-center max-w-[530px] gap-6" key={index}>
            <div
              ref={(el: any) => ((dateRefs as any).current[index] = el)}
              className="bg-text_secondary rounded-full w-16 h-16 flex items-center p-10 justify-center"
            >
              <h2 className="uppercase w-[50px] font-semibold text-center text-text_tertiary">
                {item.date}
              </h2>
            </div>
            <div>
              <h2
                ref={(el: any) => ((titleRefs as any).current[index] = el)}
                className="font-semibold text-tertiary"
              >
                {item.title}
              </h2>
              <p
                ref={(el: any) =>
                  ((descriptionRefs as any).current[index] = el)
                } // Reference for description
                className="text-text_secondary"
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
