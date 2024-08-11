import React from "react";
import Image from "next/image";
import roundedImage from "@/public/Subtract.svg";
import { RoundedInterface } from "@/types/home.types";
const RoundedSvg = ({ title }: RoundedInterface) => {
  return (
    <div className="flex gap-2 items-center max-lg:mt-3">
      <Image src={roundedImage} alt="img" />
      <p className="text-xl font-bold leading-[25.16px] text-indigo-900">
        {title}
      </p>
    </div>
  );
};

export default RoundedSvg;
