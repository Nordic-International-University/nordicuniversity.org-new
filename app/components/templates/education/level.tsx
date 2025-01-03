import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import image from "@/public/images/admisssion-images/admission_process.png";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const Level = () => {
  const t = useTranslations("education.educationLevels").raw;
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Typewriter Effect for Text (overview.title)
      gsap.fromTo(
        textRef.current,
        {
          opacity: 0,
          y: 50,
          text: "", // Clear initial text
        },
        {
          opacity: 1,
          y: 0,
          duration: 2,
          ease: "power3.out",
          text: t("overview.title"), // Add the full text here for the typewriter effect
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
          },
        },
      );

      // Slide-down effect for Image
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

      // Line animation from 0 to full width
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
          <div className="flex flex-col font-medium mt-3 gap-1">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-white border-[2px] rounded-full border-tertiary"></span>
              <h2
                className="text-text_secondary text-[16px]"
                dangerouslySetInnerHTML={{ __html: t("overview.bachelor") }}
              ></h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-white border-[2px] rounded-full border-tertiary"></span>
              <h2
                className="text-text_secondary text-[16px]"
                dangerouslySetInnerHTML={{ __html: t("overview.master") }}
              ></h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-white border-[2px] rounded-full border-tertiary"></span>
              <h2
                className="text-text_secondary text-[16px]"
                dangerouslySetInnerHTML={{ __html: t("overview.doctorate") }}
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

      {/* Line animation */}
      <hr ref={lineRef} className="bg-[#7A98C1] h-[2px] mt-10 w-full" />
    </article>
  );
};

export default Level;
