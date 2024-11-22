"use client";

import tasimo_home from "@/public/images/research-images/IMAGE 2024-08-20 12_11_26 1.png";
import statistics from "@/public/images/research-images/tasimo.png";
import Image from "next/image";
import { useTranslations } from "next-intl";

const TasimoOlympiad = () => {
  const t = useTranslations("research.tasimoOlympiad");

  return (
    <article>
      <div className="relative mt-7 w-full">
        <Image src={tasimo_home} className="w-full" alt="tasimo_home" />
        <div
          style={{ boxShadow: "1px 1px 4px 0px rgba(0, 0, 0, 0.25)" }}
          className="absolute max-md:static text-tertiary font-semibold max-md:text-[5px] max-md:bg-transparent max-md:shadow-none max-md:w-full w-2/3 py-4 px-2.5 rounded max-md:translate-x-0 max-md:mt-4 left-[50%] right-[50%] translate-x-[-50%] -bottom-[70px] bg-text_tertiary"
        >
          <p className="text-[18px]">{t("tasimo_olympiad.description")}</p>
        </div>
      </div>
      <Image
        width={1000}
        height={1000}
        className="w-full max-md:mt-10 mt-28"
        src={statistics}
        alt="statistics"
      />
    </article>
  );
};

export default TasimoOlympiad;
