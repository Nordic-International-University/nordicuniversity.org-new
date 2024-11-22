import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "antd";
import { PiFilePdfDuotone } from "react-icons/pi";
import { gsap } from "gsap";
import NoDataComponent from "@/app/components/UI/no-data";

const ScholarshipsAndInternships = ({ props }: any) => {
  const listRef = useRef<HTMLDivElement>(null);

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
      <div className="flex flex-col gap-4" ref={listRef}>
        {props?.data.map((item: any, index: number) => (
          <div
            key={item.id || index}
            className={`p-3 rounded max-md:flex-col flex border-[1px] border-tertiary border-opacity-40 items-start gap-4`}
          >
            <Image
              width={1000}
              height={1000}
              src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${item.image.file_path}`}
              alt={item.name}
              className="max-lg:w-full object-cover w-[250px] h-[250px]"
            />
            <div>
              <h2 className="text-md max-sm:text-[16px] text-text_secondary font-semibold">
                {item.name}
              </h2>
              <p className="mt-3 text-brodCrumbColor max-sm:text-sm opacity-75 font-semibold">
                {item.description}
              </p>
              <Button
                className="text-white font-semibold text-lg max-sm:text-sm mt-14 py-5 bg-text_secondary rounded px-10"
                icon={<PiFilePdfDuotone className="text-xl" />}
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

export default ScholarshipsAndInternships;
