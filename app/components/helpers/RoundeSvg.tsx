import React from "react";
import Image from "next/image";
import roundedImage from "@/public/Subtract.svg";
import { RoundedInterface } from "@/types/home.types";

const RoundedSvg = ({ title, className }: RoundedInterface) => {
  return (
    <div className={`${className} flex gap-2 items-center mt-2`}>
      <Image src={roundedImage} alt="img" />
      <h1 className="text-xl max-sm:text-lg font-bold leading-[25.16px] text-indigo-900">
        {title}
      </h1>
    </div>
  );
};

export default RoundedSvg;
