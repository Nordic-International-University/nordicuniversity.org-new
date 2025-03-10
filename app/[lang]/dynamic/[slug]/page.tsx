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
import MinimalCard from "@/app/components/UI/smallNewsCard";
import { NewsItem } from "@/types/templates/newsSlider.type";
import { headers } from "next/headers";
import SinglePageGallery from "@/app/components/UI/singlePageGallery";
import { getTemplateDataBySlug } from "@/app/[lang]/dynamic/[slug]/getNewsBySlug";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const lang = await getCurrentLangServer();
  const news: any = await getTemplateDataBySlug(params.slug, lang);

  const baseUrl = "https://nordicuniversity.org";

  if (!news) {
    return {
      title: "Yangiliklar - Xalqaro Nordik Universiteti",
      description:
        "Xalqaro Nordik Universitetining yangiliklari haqida to'liq ma'lumot.",
      openGraph: {
        title: "Yangiliklar - Xalqaro Nordik Universiteti",
        description:
          "Xalqaro Nordik Universitetining yangiliklari haqida to'liq ma'lumot.",
        url: `${baseUrl}/${lang}/press-service/news`,
        type: "website",
        images: [
          {
            url: `${baseUrl}/images/default-news.jpg`,
            alt: "Yangiliklar sahifasi",
          },
        ],
      },
      alternates: {
        languages: {
          uz: `${baseUrl}/uz/press-service/news`,
          en: `${baseUrl}/en/press-service/news`,
          ru: `${baseUrl}/ru/press-service/news`,
        },
        canonical: `${baseUrl}/press-service/news`,
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
    title: `${news.name} - Xalqaro Nordik Universiteti`,
    description: news.description || "Yangilik haqida batafsil ma'lumot oling.",
    keywords: [
      "Yangiliklar",
      "Xalqaro Nordik Universiteti",
      news.title,
      "Tadqiqotlar",
      "Ilmiy yangiliklar",
      news.keywords,
    ],
    openGraph: {
      title: `${news.title} - Xalqaro Nordik Universiteti`,
      description:
        news.description || "Yangilik haqida batafsil ma'lumot oling.",
      url: `${baseUrl}/${lang}/press-service/news/${params.slug}`,
      type: "article",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_URL_BACKEND}${news?.image?.file_path}`,
          alt: news.title,
        },
      ],
    },
    alternates: {
      languages: {
        uz: `${baseUrl}/uz/press-service/news/${params.slug}`,
        en: `${baseUrl}/en/press-service/news/${params.slug}`,
        ru: `${baseUrl}/ru/press-service/news/${params.slug}`,
      },
      canonical: `${baseUrl}/${lang}/press-service/news/${params.slug}`,
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: news.title,
      description:
        news.description || "Yangilik haqida batafsil ma'lumot oling.",
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
          url: `${baseUrl}/logo.png`,
        },
      },
      image: `${process.env.NEXT_PUBLIC_URL_BACKEND}${news.image.file_path}`,
    },
  };
};

const Page = async ({ params }: { params: { slug: string } }) => {
  const lang = await getCurrentLangServer();
  const requestHeaders = headers();

  const clientIpAddress = requestHeaders.get("x-forwarded-for") || "";

  const news: any = await getTemplateDataBySlug(
    params.slug,
    lang,
    clientIpAddress,
  );

  const last = await getTranslations("partners");

  const brodCmbItems = [
    {
      url: `/dynamic/${news.slug}`,
      name: <p className="line-clamp-1">{news.name}</p>,
    },
  ];

  console.log(news);

  return (
    <article className="container mx-auto px-4 lg:px-8" id="printable">
      <div className="mt-8">
        <h2 className="text-tertiary max-sm:text-center max-sm:text-lg text-2xl font-bold pb-3">
          {news.subPage_name}
        </h2>
        <BroadCamp items={[brodCmbItems]} />
      </div>

      <div className="flex items-start max-lg:flex-col mt-6 gap-6">
        <div className="w-[70%] max-lg:w-full">
          <div className="max-lg:h-auto rounded-md bg-gray-50">
            <div className="px-6 max-sm:px-0 pt-5 mb-3">
              <h1 className="text-xl max-lg:text-sm pb-5 font-semibold tracking-wide text-primary">
                {news.name}
              </h1>

              <Image
                width={890}
                className="mx-auto block object-contain max-lg:h-auto w-full h-full rounded-xl shadow-lg"
                height={369}
                src={process.env.NEXT_PUBLIC_URL_BACKEND + news.image.file_path}
                alt={news.title}
              />
            </div>
          </div>
          <div className="max-lg:mt-5">
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
                <p className="text-sm text-gray-500">{news.viewsCount}</p>
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
          {news?.file?.file_path && (
            <div className="mt-4">
              <iframe
                src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${news.file.file_path}`}
                width="100%"
                height="500px"
              />
            </div>
          )}
          <SinglePageGallery images={news.images} />
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
              <h2 className="text-xl">{last("connections.last")}</h2>
            </div>
            <div className="flex flex-col gap-1 mt-3">
              {news.latestItems.map((item: NewsItem, index: number) => (
                <MinimalCard
                  url="/dynamic"
                  subTitle={item.description}
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
