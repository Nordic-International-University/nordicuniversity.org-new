import { useTranslations } from "next-intl";
import { FaClock } from "react-icons/fa";
import React, { useEffect, useRef } from "react";
import { pressReleasesType } from "@/types/press-service/press-releases.types";
import { Button } from "antd";
import gsap from "gsap";
import Link from "next/link";

const Releases = ({ props }: { props: pressReleasesType[] }) => {
  const t = useTranslations("press-service");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
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
          <Link
            href={`/press-service/releases/${item.slug}`}
            key={index}
            className="flip-card w-full h-[200px]"
          >
            <div className="flip-card-inner relative w-full h-full">
              {/* Old tomoni */}
              <div className="flip-card-front absolute w-full h-full bg-[#789FCE21] rounded-md flex flex-col justify-between p-4 shadow-lg">
                <div>
                  <h2 className="max-sm:text-sm  line-clamp-1 font-semibold text-xl text-text_secondary">
                    {item.title}
                  </h2>
                  <p
                    className="text-sm mt-3 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: item.body }}
                  ></p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex text-[#7A98C1] items-center gap-2">
                    <FaClock />
                    <h2>{item.time}</h2>
                  </div>
                  <Button
                    className="px-8 max-sm:px-4 max-sm:text-sm rounded-sm text-white bg-[#5B7FAB]"
                    type="primary"
                  >
                    {t("news.button")}
                  </Button>
                </div>
              </div>
              <div className="flip-card-back absolute w-full h-full bg-[#5B7FAB] rounded-md flex flex-col justify-between p-4 text-white shadow-lg">
                <div>
                  <h2 className="font-semibold text-lg">{item.title}</h2>
                  <p
                    className="text-sm mt-2 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: item.body }}
                  ></p>
                </div>
                <div className="flex justify-end">
                  <Button
                    className="px-8 max-sm:px-4 max-sm:text-sm rounded-sm text-white bg-[#7A98C1]"
                    type="primary"
                  >
                    {t("news.button")}
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </article>
  );
};

export default Releases;
