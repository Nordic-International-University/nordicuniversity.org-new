"use client";

import tasimo_home from "@/public/images/research-images/IMAGE 2024-08-20 12_11_26 1.jpg";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi";

const TasimoOlympiad = () => {
  const t = useTranslations("research.tasimoOlympiad");
  const button = useTranslations("buttons");

  return (
    <article className="mt-6">
      <div className="flex max-md:flex-col-reverse items-start gap-8">
        {/* Text content */}
        <div className="flex-1">
          <p className="text-gray-700 text-base leading-7 text-justify">
            {t("tasimo_olympiad.farmon")}
          </p>
          <Link
            href="https://olympiad.nordicuniversity.org"
            target="_blank"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-text_secondary text-white
              text-sm font-medium rounded-lg hover:bg-text_secondary/90 transition-colors"
          >
            {button("detail")}
            <HiOutlineArrowRight className="text-base" />
          </Link>
        </div>

        {/* Image with description overlay */}
        <div className="w-full max-w-[480px] max-md:max-w-full flex-shrink-0">
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="relative aspect-[16/10]">
              <Image
                fill
                src={tasimo_home}
                className="object-cover"
                alt="TASIMO Olympiad"
              />
            </div>
            <div className="px-5 py-4 bg-gray-50 border-t border-gray-100">
              <p className="text-sm font-medium text-text_secondary leading-snug">
                {t("tasimo_olympiad.description")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TasimoOlympiad;