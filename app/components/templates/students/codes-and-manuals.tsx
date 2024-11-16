import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "antd";
import { CodesAndManualsProps } from "@/types/templates/codes-and-manuals.types";
import { useTranslations } from "next-intl";
import { PiFilePdfDuotone } from "react-icons/pi";
import gsap from "gsap";

const CodesAndManuals = ({ props }: { props: CodesAndManualsProps[] }) => {
  const t = useTranslations("student.CodesAndManuals");

  const itemRefs = useRef<HTMLDivElement[]>([]);
  useEffect(() => {
    gsap.fromTo(
      itemRefs.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.4, ease: "power3.out" },
    );
  }, [props.length]);

  return (
    <article className="mt-10 mb-10">
      <div className="gridd grid-cols-3 max-md:grid-cols-2 gap-6 grid max-md:place-items-center">
        {props.map((item, index) => (
          <div
            className="max-w-[300px]"
            key={index}
            ref={(el: any) => (itemRefs.current[index] = el)}
          >
            <Image
              width={300}
              height={500}
              src={process.env.NEXT_PUBLIC_URL_BACKEND + item.image.file_path}
              alt={item.type}
            />
            <div className="flex mt-4 items-center justify-between">
              <h2 className="max-sm:text-sm text-xl text-text_secondary">
                {t(item.type)}
              </h2>
              <Button
                icon={<PiFilePdfDuotone />}
                className="px-8 max-sm:px-4 max-sm:text-sm rounded-sm text-xl text-white bg-text_secondary"
                type="primary"
              >
                PDF
              </Button>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

export default CodesAndManuals;
