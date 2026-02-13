import React from "react";
import Image from "next/image";
import Link from "next/link";
import NoDataComponent from "@/app/components/UI/no-data";
import { useTranslations } from "next-intl";
import { HiOutlineArrowRight } from "react-icons/hi";

const PosterTemplate = ({ data, path }: { data: any; path: string }) => {
  const t = useTranslations("buttons");

  if (data.length === 0) {
    return <NoDataComponent />;
  }

  return (
    <article className="mt-8">
      <div className="flex flex-col gap-5">
        {data?.map((item: any, index: number) => (
          <div
            key={item.id || index}
            className="flex flex-col sm:flex-row border border-gray-200 rounded-xl overflow-hidden bg-white
              hover:border-text_secondary/20 hover:shadow-sm transition-all duration-200"
          >
            {/* Image */}
            <div className="w-full h-[220px] sm:w-[260px] sm:h-auto relative flex-shrink-0">
              <Image
                fill
                src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${item.image.file_path}`}
                alt={item.name}
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between p-5 flex-1 gap-4">
              <div>
                <h2 className="text-lg md:text-xl text-text_secondary font-semibold line-clamp-2 leading-snug">
                  {item.name}
                </h2>
                <p className="mt-2.5 text-gray-600 text-sm md:text-base line-clamp-3 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <Link
                href={`/dynamic/${item.slug}`}
                className="inline-flex items-center gap-2 w-fit px-6 py-2.5
                  bg-text_secondary text-white text-sm font-medium rounded-lg
                  hover:bg-text_secondary/90 transition-colors"
              >
                {t("see")}
                <HiOutlineArrowRight className="text-base" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

export default PosterTemplate;
