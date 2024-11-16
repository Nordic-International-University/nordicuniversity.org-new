import { getNewsBySlug } from "@/app/[lang]/press-service/news/[slug]/getNewsBySlug";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { NewsItem } from "@/types/templates/newsSlider.type";
import BroadCamp from "@/app/components/UI/broadCump";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";

const Page = async ({ params }: { params: { slug: string } }) => {
  const news: NewsItem = await getNewsBySlug(
    params.slug,
    await getCurrentLangServer(),
  );
  const t = await getTranslations("press-service");

  const brodCmbItems = [
    {
      url: "",
      name: t("title"),
    },
    {
      url: "/university/documents",
      name: params.slug,
    },
  ];

  return (
    <article className="container">
      <div className="mt-8">
        <h2 className="text-tertiary max-sm:text-center max-sm:text-lg text-2xl font-semibold pb-3">
          {t("news.sectionTitle")}
        </h2>
        <BroadCamp items={[brodCmbItems]} />
      </div>
      <div className="mt-5 relative">
        <Image
          width={857}
          className="max-sm:w-full object-cover h-[360px]"
          height={369}
          src={process.env.NEXT_PUBLIC_URL_BACKEND + news.image.file_path}
          alt={news.title}
        />
        <p className="text-[18px]">{news.title}</p>
      </div>
    </article>
  );
};

export default Page;
