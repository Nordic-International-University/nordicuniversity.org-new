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
import { NewsItem } from "@/types/templates/newsSlider.type";
import { headers } from "next/headers";
import SinglePageGallery from "@/app/components/UI/singlePageGallery";
import { getTemplateDataBySlug } from "@/app/[lang]/dynamic/[slug]/getNewsBySlug";
import AboutTemplate from "@/app/[lang]/(templates)/aboutTemplate";
import Link from "next/link";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string; lang: string };
}) => {
  const lang = params.lang;
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
        url: `${baseUrl}/${lang}/press-service`,
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
    };
  }

  if (news.template_type === "aboutTemplate") {
    return {
      title: `${news.subPage_name || "About"} - Xalqaro Nordik Universiteti`,
      description: "Xalqaro Nordik Universiteti",
    };
  }

  return {
    title: `${news.name} - Xalqaro Nordik Universiteti`,
    description:
      news.description || "Yangilik haqida batafsil ma'lumot oling.",
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
      url: `${baseUrl}/${lang}/dynamic/${params.slug}`,
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
        uz: `${baseUrl}/uz/dynamic/${params.slug}`,
        en: `${baseUrl}/en/dynamic/${params.slug}`,
        ru: `${baseUrl}/ru/dynamic/${params.slug}`,
      },
      canonical: `${baseUrl}/${lang}/dynamic/${params.slug}`,
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

  if (!news) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
          <span className="text-2xl text-gray-400">?</span>
        </div>
        <h1 className="text-xl font-semibold text-gray-800 mb-2">
          Sahifa topilmadi
        </h1>
        <p className="text-gray-500 text-sm">
          So'ralgan sahifa mavjud emas yoki server xatosi yuz berdi.
        </p>
      </div>
    );
  }

  const last = await getTranslations("partners");

  const brodCmbItems = [
    {
      url: `/dynamic/${news.slug}`,
      name: <p className="line-clamp-1">{news.name}</p>,
    },
  ];

  if (news?.template_type === "aboutTemplate") {
    return <AboutTemplate data={news} />;
  }

  return (
    <article className="container mx-auto px-4 lg:px-8" id="printable">
      <div className="mt-8">
        <h2 className="text-text_secondary max-sm:text-center max-sm:text-lg text-2xl font-bold pb-3">
          {news.subPage_name}
        </h2>
        <BroadCamp items={[brodCmbItems]} />
      </div>

      <div className="flex items-start max-lg:flex-col mt-8 gap-8">
        {/* Main content */}
        <div className="w-[70%] max-lg:w-full">
          {/* Hero image */}
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
            <Image
              fill
              className="object-cover"
              src={
                process.env.NEXT_PUBLIC_URL_BACKEND + news.image.file_path
              }
              alt={news.title}
            />
          </div>

          {/* Title */}
          <h1 className="text-xl md:text-2xl font-bold text-text_secondary mt-6 leading-snug">
            {news.name}
          </h1>

          {/* Meta info */}
          <div className="flex items-center gap-5 mt-4 pb-5 border-b border-gray-200">
            <div className="flex items-center gap-1.5">
              <BiCalendar className="text-gray-400 text-base" />
              <span className="text-sm text-gray-500">
                {dayjs(news.time).format("MMMM DD, YYYY")}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <EyeIcon className="text-gray-400 text-base" />
              <span className="text-sm text-gray-500">{news.viewsCount}</span>
            </div>
          </div>

          {/* Description */}
          {news.description && (
            <p className="text-base leading-7 text-gray-700 mt-5">
              {news.description}
            </p>
          )}

          {/* Body */}
          <div
            className="mt-5 text-base leading-7 text-justify text-gray-700 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: news.body }}
          />

          {/* File embed */}
          {news?.file?.file_path && (
            <div className="mt-6 rounded-xl overflow-hidden border border-gray-200">
              <iframe
                src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${news.file.file_path}`}
                width="100%"
                height="500px"
              />
            </div>
          )}

          {/* Gallery */}
          <SinglePageGallery images={news.images} />
        </div>

        {/* Sidebar */}
        <div className="w-[27%] max-lg:w-full sticky top-4">
          <ShareModal
            shareUrl={`https://nordicuniversity.org/${lang}/dynamic/${params.slug}`}
          />

          {/* Latest items */}
          <div className="mt-4 border border-gray-200 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-gray-100 bg-gray-50">
              <span className="w-1.5 h-5 bg-text_secondary rounded-full block"></span>
              <h2 className="text-base font-semibold text-gray-800">
                {last("connections.last")}
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {news.latestItems.map((item: NewsItem, index: number) => (
                <Link
                  key={index}
                  href={`/dynamic/${item.slug}`}
                  className="flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-16 h-16 relative flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      fill
                      src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${item.image.file_path}`}
                      alt={item.title}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-gray-800 line-clamp-2 leading-snug">
                      {item.title}
                    </p>
                    <p
                      dangerouslySetInnerHTML={{ __html: item.description }}
                      className="text-xs text-gray-400 line-clamp-1 mt-1"
                    />
                  </div>
                </Link>
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
