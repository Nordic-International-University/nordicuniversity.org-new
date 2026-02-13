"use client";

import { useTranslations } from "next-intl";
import { FC } from "react";
import {
  FaGraduationCap,
  FaChalkboardTeacher,
  FaMoneyCheckAlt,
  FaCheckDouble,
} from "react-icons/fa";
import { BsGlobe } from "react-icons/bs";
import { MdWork } from "react-icons/md";

const icons = [
  FaGraduationCap,
  FaChalkboardTeacher,
  FaMoneyCheckAlt,
  BsGlobe,
  FaCheckDouble,
  MdWork,
];

const Advantages: FC = () => {
  const t = useTranslations("university.advantages").raw;

  return (
    <article className="mt-8">
      <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-4">
        {icons.map((Icon, index) => (
          <div
            key={index}
            className="group relative rounded-2xl bg-gray-50 p-6
              hover:bg-text_secondary transition-all duration-300 overflow-hidden"
          >
            {/* Background number */}
            <span className="absolute -right-1 -top-2 text-[85px] font-black leading-none
              text-gray-300 group-hover:text-white/20 transition-colors duration-300 select-none">
              {index + 1}
            </span>

            {/* Icon */}
            <div className="relative z-10 w-11 h-11 rounded-lg bg-white flex items-center justify-center
              shadow-sm group-hover:bg-white/20 transition-all duration-300">
              <Icon className="text-text_secondary text-lg group-hover:text-white transition-colors duration-300" />
            </div>

            {/* Text */}
            <div
              className="relative z-10 mt-4 text-gray-600 text-[15px] leading-relaxed
                group-hover:text-white/90 transition-colors duration-300"
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
