import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import BroadCamp from "@/app/components/UI/broadCump";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";
import { BiCalendar } from "react-icons/bi";
import dayjs from "dayjs";
import { EyeIcon } from "@nextui-org/shared-icons";
import ShareModal from "@/app/components/UI/shareSocialMediaModal";
import SocialMediaCard from "@/app/components/UI/socialCard";
import { getNewsBySlug } from "@/app/[lang]/press-service/news/[slug]/getNewsBySlug";
import { getAllNews } from "@/app/[lang]/press-service/news/getAllNews";
import MinimalCard from "@/app/components/UI/smallNewsCard";
import { NewsItem } from "@/types/templates/newsSlider.type";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const lang = await getCurrentLangServer();
  const news = await getNewsBySlug(params.slug, lang);

  if (!news) {
    return {
      title: "Yangiliklar - Xalqaro Nordik Universiteti",
      description:
        "Xalqaro Nordik Universitetining yangiliklari haqida to'liq ma'lumot.",
      openGraph: {
        title: "Yangiliklar - Xalqaro Nordik Universiteti",
        description:
          "Xalqaro Nordik Universitetining yangiliklari haqida to'liq ma'lumot.",
        url: `https://nordicuniversity.org/${lang}/press-service/news`,
        type: "website",
        images: [
          {
            url: "https://nordicuniversity.org/images/default-news.jpg", // Default image
            alt: "Yangiliklar sahifasi",
          },
        ],
      },
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Yangiliklar - Xalqaro Nordik Universiteti",
        description:
          "Xalqaro Nordik Universitetining yangiliklari haqida to'liq ma'lumot.",
      },
    };
  }

  return {
    title: `${news.title} - Xalqaro Nordik Universiteti`,
    description: news.description || "Yangilik haqida batafsil ma'lumot oling.",
    keywords: [
      "Yangiliklar",
      "Xalqaro Nordik Universiteti",
      news.title,
      "Tadqiqotlar",
      "Ilmiy yangiliklar",
    ],
    openGraph: {
      title: `${news.title} - Xalqaro Nordik Universiteti`,
      description:
        news.description || "Yangilik haqida batafsil ma'lumot oling.",
      url: `https://nordicuniversity.org/${lang}/press-service/news/${params.slug}`,
      type: "article",
      images: [
        {
          url: process.env.NEXT_PUBLIC_URL_BACKEND + news.image.file_path,
          alt: news.title,
        },
      ],
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: news.title,
      description: news.description,
      datePublished: news.createdAt,
      dateModified: news.updatedAt,
      author: {
        "@type": "Organization",
        name: "Xalqaro Nordik Universiteti",
      },
      publisher: {
        "@type": "Organization",
        name: "Xalqaro Nordik Universiteti",
        logo: {
          "@type": "ImageObject",
          url: "https://nordicuniversity.org/logo.png",
        },
      },
      image: process.env.NEXT_PUBLIC_URL_BACKEND + news.image.file_path,
    },
  };
};

const Page = async ({ params }: { params: { slug: string } }) => {
  const lang = await getCurrentLangServer();

  const news: NewsItem = await getNewsBySlug(params.slug, lang);

  const allNews: { data: NewsItem[] } = await getAllNews({
    lang,
    page: "1",
    limit: "4",
  });

  const t = await getTranslations("press-service");

  const brodCmbItems = [
    {
      url: "/press-service/news",
      name: t("title"),
    },
    {
      url: `/press-service/news/${params.slug}`,
      name: news.title,
    },
  ];

  return (
    <article className="container mx-auto px-4 lg:px-8" id="printable">
      <div className="mt-8">
        <h2 className="text-tertiary max-sm:text-center max-sm:text-lg text-2xl font-bold pb-3">
          {t("news.sectionTitle")}
        </h2>
        <BroadCamp items={[brodCmbItems]} />
      </div>

      <div className="flex items-start max-lg:flex-col mt-6 gap-6">
        <div className="w-[70%] max-lg:w-full">
          <div className=" h-[474px] max-lg:h-auto rounded-md bg-gray-50">
            <div className="px-6 max-sm:px-0 pt-5">
              <h1 className="text-xl max-lg:text-sm pb-5 font-semibold tracking-wide text-primary">
                {news.title}
              </h1>

              <Image
                width={890}
                className="mx-auto  block object-cover max-lg:h-auto h-[830px] rounded-xl shadow-lg"
                height={369}
                src={process.env.NEXT_PUBLIC_URL_BACKEND + news.image.file_path}
                alt={news.title}
              />
            </div>
          </div>
          <div className="mt-[450px] max-lg:mt-5">
            <div className="flex items-center gap-7 justify-center">
              <div className="flex items-center gap-1">
                <BiCalendar className="text-gray-400" />
                <p className="text-sm text-gray-500">
                  {dayjs(news.time).format("MMMM DD , YYYY")}
                </p>
              </div>
              <span className="text-gray-200">|</span>
              <div className="flex items-center gap-1">
                <EyeIcon className="text-gray-400" />
                <p className="text-sm text-gray-500">230</p>
              </div>
            </div>
            <div className="mt-5">
              <p className="text-lg leading-8 text-gray-800">
                {news.description}
              </p>
              <div
                className="mt-6 text-base leading-7 text-justify text-gray-700"
                dangerouslySetInnerHTML={{ __html: news.body }}
              ></div>
            </div>
          </div>
        </div>
        <div className="w-[27%] max-lg:w-full sticky top-4">
          <ShareModal
            shareUrl={
              "https://nordicuniversity.org/" +
              (await getCurrentLangServer()) +
              "/press-service/news/" +
              params.slug
            }
          />
          <div className="bg-gray-50 mt-3 rounded-md">
            <div className="flex items-center gap-1.5 pl-4 pt-3">
              <span className="w-2 h-3 bg-text_secondary rounded-3xl block"></span>
              <h2 className="text-xl">{t("last_news")}</h2>
            </div>
            <div className="flex flex-col gap-1 mt-3">
              {allNews.data.map((item: NewsItem, index: number) => (
                <MinimalCard
                  url="/press-service/news"
                  subTitle={item.body}
                  key={index}
                  image={item.image}
                  title={item.title}
                  slug={item.slug}
                />
              ))}
            </div>
          </div>
          <SocialMediaCard />
        </div>
      </div>
    </article>
  );
};

export default Page;
