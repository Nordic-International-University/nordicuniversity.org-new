"use client";

import { useTranslations } from "next-intl";
import { FC, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaGraduationCap,
  FaChalkboardTeacher,
  FaMoneyCheckAlt,
  FaCheckDouble,
} from "react-icons/fa";
import { BsGlobe } from "react-icons/bs";
import { MdWork } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

const Advantages: FC = () => {
  const t = useTranslations("university.advantages").raw;

  const icons: JSX.Element[] = [
    <FaGraduationCap size={50} className="text-white" />,
    <FaChalkboardTeacher size={50} className="text-white" />,
    <FaMoneyCheckAlt size={50} className="text-white" />,
    <BsGlobe size={50} className="text-white" />,
    <FaCheckDouble size={50} className="text-white" />,
    <MdWork size={50} className="text-white" />,
  ];

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".advantage-card");

        cards.forEach((card, index) => {
          const icon = card.querySelector<HTMLElement>(".advantage-icon");
          const text = card.querySelector<HTMLElement>(".advantage-text");

          if (icon && text) {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "top 60%",
                scrub: false,
              },
            });
            tl.fromTo(
              icon,
              { opacity: 0, scale: 0.5 },
              { opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
            ).fromTo(
              text,
              { opacity: 0, x: 100 },
              { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
              "-=0.5",
            );
          }
        });
      }, containerRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <article className="mt-12">
      <div
        ref={containerRef}
        className="grid max-lg:grid-cols-1 grid-cols-2 gap-5"
      >
        {icons.map((icon, index) => (
          <div
            key={index}
            className="advantage-card flex items-center max-sm:flex-col max-sm:items-center max-sm:justify-center gap-4"
          >
            <div className="advantage-icon bg-text_secondary flex items-center justify-center min-h-24 min-w-24 rounded-full shadow-lg">
              {icon}
            </div>
            <div
              className="advantage-text text-md max-sm:text-center text-gray-800"
              dangerouslySetInnerHTML={{
                __html: t(`cardTitle.${index}`),
              }}
            />
          </div>
        ))}
      </div>
    </article>
  );
};

export default Advantages;
