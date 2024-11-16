import { useTranslations } from "next-intl";
import { FaClock } from "react-icons/fa";
import React, { useEffect, useRef } from "react";
import { pressReleasesType } from "@/types/press-service/press-releases.types";
import { Button } from "antd";
import gsap from "gsap";

const Releases = ({ props }: { props: pressReleasesType[] }) => {
  const t = useTranslations("press-service");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Animate all items from scale 0 to 1 with staggered effect
      gsap.fromTo(
        containerRef.current.children,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
      );

      // Animate text and inner elements
      gsap.fromTo(
        ".inner-content",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.3,
          stagger: 0.1,
        },
      );
    }
  }, [props.length]);

  return (
    <article className="mt-10 mb-10" ref={containerRef}>
      <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-7">
        {props.map((item, index) => (
          <div
            key={index}
            className="w-full h-[160px] p-3 flex rounded-md flex-col bg-[#789FCE21] justify-between x-flip-hover"
          >
            <div className="flex-grow inner-content">
              <h2 className="max-sm:text-sm mb-2 line-clamp-1 font-semibold text-xl text-text_secondary">
                {item.title}
              </h2>
              <p className="text-[#7A98C1]">{item.body}</p>
            </div>
            <div className="flex items-center justify-between inner-content">
              <div className="flex text-[#7A98C1] items-center gap-2">
                <FaClock />
                <h2>{item.time}</h2>
              </div>
              <Button
                className="px-8 max-sm:px-4 max-sm:text-sm rounded-sm text-xl text-white bg-[#5B7FAB]"
                type="primary"
              >
                {t("news.button")}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

export default Releases;
