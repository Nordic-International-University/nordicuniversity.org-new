"use client";

import { FC, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import image from "@/public/images/admisssion-images/admission_process.png";
import Image from "next/image";
import { EducationLevels } from "@/types/education/educaation.types";

gsap.registerPlugin(ScrollTrigger);

const Level: FC<{ fieldCount: EducationLevels }> = ({ fieldCount }) => {
  const t = useTranslations("education.educationLevels");
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, y: -100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        lineRef.current,
        { width: "0%" },
        {
          width: "100%",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [t]);

  return (
    <article className="mt-12" ref={containerRef}>
      <div className="flex items-start max-md:flex-col-reverse gap-4 justify-between">
        <div ref={textRef}>
          <strong className="text-secondary text-[18px]">
            {t("overview.title")}
          </strong>
          <p className="text-brodCrumbColor opacity-70 mt-4 text-[18px]">
            {t("overview.description")}
          </p>

          {/* Education Levels */}
          <div className="flex flex-col font-medium mt-3 gap-1">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-white border-[2px] rounded-full border-tertiary"></span>
              <h2
                className="text-text_secondary text-[16px]"
                dangerouslySetInnerHTML={{
                  __html: t("overview.bachelor", {
                    count: fieldCount.bachelor.FULL_TIME,
                  }),
                }}
              ></h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-white border-[2px] rounded-full border-tertiary"></span>
              <h2
                className="text-text_secondary text-[16px]"
                dangerouslySetInnerHTML={{
                  __html: t("overview.master", {
                    count: fieldCount.master,
                  }),
                }}
              ></h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-white border-[2px] rounded-full border-tertiary"></span>
              <h2
                className="text-text_secondary text-[16px]"
                dangerouslySetInnerHTML={{
                  __html: t("overview.doctorate", {
                    count: fieldCount.doctorate,
                  }),
                }}
              ></h2>
            </div>
          </div>

          <p className="text-brodCrumbColor opacity-70 mt-4 text-[15px]">
            {t("overview.demand")}
          </p>
        </div>

        <Image
          className="h-72 w-auto max-md:w-full max-md:h-auto"
          src={image}
          alt="admission_image"
          ref={imageRef}
        />
      </div>

      <hr ref={lineRef} className="bg-[#7A98C1] h-[2px] mt-10 w-full" />
    </article>
  );
};

export default Level;
