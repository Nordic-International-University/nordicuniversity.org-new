"use client";

import statistics from "@/public/images/university-images/statistics.png";
import hand from "@/public/images/university-images/hand.png";
import search from "@/public/images/university-images/search.png";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Advantages: React.FC = () => {
  const t = useTranslations("university.advantages").raw;

  const images: any[] = [hand, statistics, search];

  // Ref for the container
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".advantage-card");

        cards.forEach((card, index) => {
          const image = card.querySelector<HTMLElement>(".advantage-image");
          const text = card.querySelector<HTMLElement>(".advantage-text");

          if (image && text) {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "top 60%",
                scrub: false,
              },
            });

            // Image animation
            tl.fromTo(
              image,
              { opacity: 0, y: -100 },
              { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
            )
              // Text animation
              .fromTo(
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
      <div ref={containerRef} className="flex flex-col gap-12">
        {images.map((image, index) => (
          <div
            key={index}
            className="advantage-card flex items-center max-sm:flex-col max-sm:items-center max-sm:justify-center gap-4"
          >
            {/* Image */}
            <div className="advantage-image bg-text_secondary flex items-center justify-center min-h-24 min-w-24 rounded-full shadow-lg">
              <Image className="m-auto block" src={image} alt="qo‘l" />
            </div>
            {/* Text */}
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
