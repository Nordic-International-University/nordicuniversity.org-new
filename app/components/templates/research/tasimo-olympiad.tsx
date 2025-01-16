"use client";

import tasimo_home from "@/public/images/research-images/IMAGE 2024-08-20 12_11_26 1.jpg";
import statistics from "@/public/images/research-images/tasimo.png";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "antd";

const TasimoOlympiad = () => {
  const t = useTranslations("research.tasimoOlympiad");
  const button = useTranslations("buttons");

  return (
    <article>
      <div className="flex mt-4 gap-3 mb-10 items-start justify-between">
        <div className="w-1/2">
          <p className="text-text_secondary font-medium">
            {t("tasimo_olympiad.farmon")}
          </p>
          <Button
            size="large"
            href="https://olympiad.nordicuniversity.org"
            target="_blank"
            className="mt-8 bg-primary-gradient text-white"
          >
            {button("detail")}
          </Button>
        </div>
        <div className="relative w-full">
          <Image
            src={tasimo_home}
            className="w-full h-[300px] object-cover max-sm:object-contain max-sm:h-auto rounded-md"
            alt="tasimo_home"
          />
          <div
            style={{ boxShadow: "1px 1px 4px 0px rgba(0, 0, 0, 0.25)" }}
            className="absolute max-md:static text-tertiary font-semibold max-md:text-[5px] max-md:bg-transparent max-md:shadow-none max-md:w-full w-2/3 py-4 px-2.5 rounded max-md:translate-x-0 left-[50%] right-[50%] translate-x-[-50%] -bottom-[70px] bg-text_tertiary"
          >
            <p className="text-[18px]">{t("tasimo_olympiad.description")}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TasimoOlympiad;
