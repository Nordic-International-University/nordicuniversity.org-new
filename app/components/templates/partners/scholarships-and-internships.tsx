import React from "react";
import Image from "next/image";
import Link from "next/link";
import NoDataComponent from "@/app/components/UI/no-data";
import { useTranslations } from "next-intl";
import { HiOutlineArrowRight } from "react-icons/hi";

const ScholarshipsAndInternships = ({
  props,
  path,
}: {
  props: any;
  path?: string;
}) => {
  const t = useTranslations("buttons");

  if (props.data.length === 0) {
    return <NoDataComponent />;
  }

  return (
    <article className="mt-8">
      <div className="flex flex-col gap-5">
        {props?.data.map((item: any, index: number) => (
          <Link
            key={item.id || index}
            href={`${path + item.slug}`}
            className="group flex flex-col sm:flex-row border border-gray-200 rounded-xl overflow-hidden bg-white
              hover:border-text_secondary/20 hover:shadow-sm transition-all duration-200"
          >
            <div className="w-full h-[220px] sm:w-[260px] sm:h-auto relative flex-shrink-0">
              <Image
                fill
                src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${item.image.file_path}`}
                alt={item.name}
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-between p-5 flex-1 gap-4">
              <div>
                <h2 className="text-lg md:text-xl text-text_secondary font-semibold line-clamp-2 leading-snug">
                  {item.name}
                </h2>
                <p className="mt-2.5 text-gray-500 text-sm md:text-base line-clamp-3 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <span className="inline-flex items-center gap-2 w-fit px-6 py-2.5
                bg-text_secondary text-white text-sm font-medium rounded-lg
                group-hover:bg-text_secondary/90 transition-colors">
                {t("see")}
                <HiOutlineArrowRight className="text-base" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </article>
  );
};

export default ScholarshipsAndInternships;
