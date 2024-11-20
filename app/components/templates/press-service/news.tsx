import Image from "next/image";
import { Button } from "antd";
import { NewsItem } from "@/types/templates/newsSlider.type";
import { useTranslations } from "next-intl";
import { FaClock } from "react-icons/fa";
import React from "react";
import Link from "next/link";

const News = ({ props }: { props: NewsItem[] | any }) => {
  const t = useTranslations("press-service");

  return (
    <article className="mt-10 mb-10">
      <div className="flex flex-col max-sm:gap-8 gap-6 max-md:place-items-center">
        {props.map((item: NewsItem, index: number) => (
          <Link key={index} href={`/press-service/news/${item.slug}`}>
            <div className="w-full p-3 max-sm:border-none max-sm:p-0 max-sm:flex-col border-[2px]  border-text_secondary flex gap-3 items-stretch">
              <Image
                width={260}
                className="max-sm:w-full"
                height={300}
                src={process.env.NEXT_PUBLIC_URL_BACKEND + item.image.file_path}
                alt={item.title}
              />

              <div className="w-full flex flex-col">
                <div className="flex-grow">
                  <h2 className="max-sm:text-sm pb-4 text-xl text-text_secondary font-medium">
                    {item.title}
                  </h2>
                  <p className=""> {item.description}</p>
                  <div className="flex text-[#7A98C1] mt-3 pb-4 items-center gap-2">
                    <FaClock />
                    <h2>{item.time}</h2>
                  </div>
                </div>
                <div className="max-sm:justify-start flex justify-end max-sm:mt-0 mt-4">
                  <Button
                    className="px-8 max-sm:w-full max-sm:px-4 max-sm:text-sm rounded-sm text-xl text-white bg-text_secondary"
                    type="primary"
                  >
                    {t("news.button")}
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </article>
  );
};

export default News;
