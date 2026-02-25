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
import { headers } from "next/headers";
import SinglePageGallery from "@/app/components/UI/singlePageGallery";
import { buildBreadcrumbJsonLd } from "@/app/helpers/seoMetadata";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string; lang: string };
}) => {
  const lang = params.lang;
  const news: NewsItem = await getNewsBySlug(params.slug, lang);

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
        siteName: "Nordic International University",
        type: "website",
        images: [
          {
            url: `${baseUrl}/images/default-news.jpg`,
            alt: "Yangiliklar sahifasi",
          },
        ],
      },
      twitter: {
        card: "summary_large_image" as const,
        title: "Yangiliklar - Xalqaro Nordik Universiteti",
        description:
          "Xalqaro Nordik Universitetining yangiliklari haqida to'liq ma'lumot.",
        images: [`${baseUrl}/images/default-news.jpg`],
      },
      alternates: {
        languages: {
          uz: `${baseUrl}/uz/press-service/news`,
          en: `${baseUrl}/en/press-service/news`,
          ru: `${baseUrl}/ru/press-service/news`,
          "x-default": `${baseUrl}/uz/press-service/news`,
        },
        canonical: `${baseUrl}/${lang}/press-service/news`,
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
      news.keywords,
    ],
    openGraph: {
      title: `${news.title} - Xalqaro Nordik Universiteti`,
      description:
        news.description || "Yangilik haqida batafsil ma'lumot oling.",
      url: `${baseUrl}/${lang}/press-service/news/${params.slug}`,
      siteName: "Nordic International University",
      type: "article",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_URL_BACKEND}${news.image.file_path}`,
          alt: news.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${news.title} - Xalqaro Nordik Universiteti`,
      description:
        news.description || "Yangilik haqida batafsil ma'lumot oling.",
      images: [
        `${process.env.NEXT_PUBLIC_URL_BACKEND}${news.image.file_path}`,
      ],
    },
    alternates: {
      languages: {
        uz: `${baseUrl}/uz/press-service/news/${params.slug}`,
        en: `${baseUrl}/en/press-service/news/${params.slug}`,
        ru: `${baseUrl}/ru/press-service/news/${params.slug}`,
        "x-default": `${baseUrl}/uz/press-service/news/${params.slug}`,
      },
      canonical: `${baseUrl}/${lang}/press-service/news/${params.slug}`,
    },
  };
};

const Page = async ({ params }: { params: { slug: string; lang: string } }) => {
  const lang = await getCurrentLangServer();
  const requestHeaders = headers();

  const clientIpAddress = requestHeaders.get("x-forwarded-for") || "";

  const news: NewsItem = await getNewsBySlug(
    params.slug,
    lang,
    clientIpAddress,
  );

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

  const baseUrl = "https://nordicuniversity.org";

  const newsArticleJsonLd = news
    ? JSON.stringify({
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: news.title,
        description:
          news.description || "Yangilik haqida batafsil ma'lumot oling.",
        datePublished: news.createdAt,
        dateModified: news.updatedAt,
        author: {
          "@type": "Organization",
          name: "Nordic International University",
        },
        publisher: {
          "@type": "Organization",
          name: "Nordic International University",
          logo: {
            "@type": "ImageObject",
            url: `${baseUrl}/university_logo.svg`,
          },
        },
        image: `${process.env.NEXT_PUBLIC_URL_BACKEND}${news.image.file_path}`,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/${lang}/press-service/news/${params.slug}`,
        },
      })
    : null;

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(brodCmbItems, lang);

  return (
    <article className="container mx-auto px-4 lg:px-8" id="printable">
      {newsArticleJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: newsArticleJsonLd }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }}
      />
      <div className="mt-8">
        <h2 className="text-tertiary max-sm:text-center max-sm:text-lg text-2xl font-bold pb-3">
          {t("news.sectionTitle")}
        </h2>
        <BroadCamp items={[brodCmbItems]} />
      </div>

      <div className="flex items-start max-lg:flex-col mt-6 gap-6">
        <div className="w-[70%] max-lg:w-full">
          <div className="max-lg:h-auto rounded-md bg-gray-50">
            <div className="px-6 max-sm:px-0 pt-5 mb-3">
              <h1 className="text-xl max-lg:text-sm pb-5 font-semibold tracking-wide text-primary">
                {news.title}
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
              <h2 className="text-xl">{t("last_news")}</h2>
            </div>
            <div className="flex flex-col gap-1 mt-3">
              {news?.latestItems?.map((item: NewsItem, index: number) => (
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
