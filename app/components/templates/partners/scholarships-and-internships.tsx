import React from "react";
import Image from "next/image";
import { Button } from "antd";
import { PiFilePdfDuotone } from "react-icons/pi";

const ScholarshipsAndInternships = ({ props }: any) => {
  return (
    <article className="mt-10">
      <div className="flex flex-col gap-4">
        {props?.data.map((item: any, index: number) => (
          <div className="p-3 rounded max-md:flex-col flex border-[1px] border-tertiary border-opacity-40 items-start gap-4">
            <Image
              width={300}
              height={300}
              src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${item.image.file_path}`}
              alt={item.name}
              className="max-lg:w-full h-[400px] w-[400px]"
            />
            <div>
              <h2 className="text-xl max-sm:text-[16px] text-text_secondary font-semibold">
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
