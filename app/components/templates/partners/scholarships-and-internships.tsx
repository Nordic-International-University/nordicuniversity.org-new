import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "antd";
import { gsap } from "gsap";
import NoDataComponent from "@/app/components/UI/no-data";
import { useTranslations } from "next-intl";

const ScholarshipsAndInternships = ({
  props,
  path,
}: {
  props: any;
  path?: string;
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("buttons");

  useEffect(() => {
    if (listRef.current) {
      gsap.fromTo(
        listRef.current.children as HTMLCollectionOf<HTMLElement>,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.6 },
      );
    }
  }, [props.data]);

  if (props.data.length === 0) {
    return <NoDataComponent />;
  }

  return (
    <article className="mt-10">
      <div className="flex flex-col gap-6" ref={listRef}>
        {props?.data.map((item: any, index: number) => (
          <div
            key={item.id || index}
            className="p-4 sm:p-5 rounded-lg h-[260px] max-sm:h-auto flex flex-col sm:flex-row border border-gray-200 shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white gap-4 mb-5"
          >
            <div className="w-full sm:w-1/3">
              <Image
                width={1000}
                height={1000}
                src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${item.image.file_path}`}
                alt={item.name}
                className="w-[230px] h-[230px] max-sm:w-full sm:h-full object-cover rounded-md"
              />
            </div>
            <div className="flex flex-col justify-between h-full gap-4 w-full">
              <div>
                <h2 className="text-base sm:text-lg md:text-xl text-text_secondary font-bold line-clamp-2">
                  {item.name}
                </h2>
                <p className="mt-2 text-gray-600 text-sm sm:text-base line-clamp-4 opacity-90 font-medium">
                  {item.description}
                </p>
              </div>
              <Button
                href={`${path + item.slug}`}
                className="text-white font-medium text-base md:text-lg mt-auto py-2 px-8 bg-gradient-to-r from-[#284B82] to-[#032E63] hover:from-[#3C5C94] hover:to-[#284B82] rounded-md flex items-center gap-2"
              >
                {t("see")}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

export default ScholarshipsAndInternships;
