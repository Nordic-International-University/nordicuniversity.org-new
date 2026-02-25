import BroadCamp from "@/app/components/UI/broadCump";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";
import { BiCalendar } from "react-icons/bi";
import dayjs from "dayjs";
import { EyeIcon } from "@nextui-org/shared-icons";
import ShareModal from "@/app/components/UI/shareSocialMediaModal";
import SocialMediaCard from "@/app/components/UI/socialCard";
import Link from "next/link";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { Event } from "@/types/templates/international-meeating";
import { Metadata } from "next";
import "react-quill/dist/quill.snow.css";
import { headers } from "next/headers";
import SinglePageGallery from "@/app/components/UI/singlePageGallery";
import { getAcademicProcessBySLug } from "@/app/[lang]/education/academic-process/getAllAcademicProcces";


export async function generateMetadata({
  params,
}: {
  params: { slug: string; lang: string };
}): Promise<Metadata> {
  const lang = params.lang;
  const event: Event = await getAcademicProcessBySLug(lang, params.slug);
  const baseUrl = "https://nordicuniversity.org";
  const pagePath = `/education/academic-process/${params.slug}`;

  return {
    title: event.name,
    description: event.description,
    openGraph: {
      title: event.name,
      description: event.description,
      url: `${baseUrl}/${lang}${pagePath}`,
      siteName: "Nordic International University",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_URL_BACKEND}${event.image.file_path}`,
          alt: event.name,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: event.name,
      description: event.description,
      images: [
        `${process.env.NEXT_PUBLIC_URL_BACKEND}${event.image.file_path}`,
      ],
    },
    alternates: {
      canonical: `${baseUrl}/${lang}${pagePath}`,
      languages: {
        uz: `${baseUrl}/uz${pagePath}`,
        en: `${baseUrl}/en${pagePath}`,
        ru: `${baseUrl}/ru${pagePath}`,
        "x-default": `${baseUrl}/uz${pagePath}`,
      },
    },
  };
}

const Page = async ({ params }: { params: { slug: string } }) => {
  const lang = await getCurrentLangServer();
  const requestHeaders = headers();
  const clientIpAddress = requestHeaders.get("x-forwarded-for") || "";

  const news: any = await getAcademicProcessBySLug(
    lang,
    params.slug,
    clientIpAddress,
  );
  const t = await getTranslations("education");
  const partners = await getTranslations("partners.connections");

  const brodCmbItems = [
    {
      url: "/education/academic-process",
      name: t("subItems.4"),
    },
    {
      url: `/education/academic-process/${params.slug}`,
      name: news.name.slice(0, 100) + "...",
    },
  ];

  return (
    <article className="container mx-auto" id="printable">
      {/* Header */}
      <div className="mt-8 mb-6">
        <h2 className="text-text_secondary text-2xl max-sm:text-lg font-bold">
          {t("subItems.4")}
        </h2>
        <div className="mt-3">
          <BroadCamp items={[brodCmbItems]} />
        </div>
      </div>

      <div className="flex items-start max-lg:flex-col gap-8">
        {/* Main Content */}
        <div className="w-[70%] max-lg:w-full">
          {/* Title */}
          <h1 className="text-text_secondary text-xl max-sm:text-base font-bold leading-snug">
            {news.name}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center gap-5 mt-4 pb-5 border-b border-gray-200">
            <div className="flex items-center gap-1.5">
              <BiCalendar className="text-gray-400 text-base" />
              <span className="text-sm text-gray-500">
                {dayjs(news.time).format("MMMM DD, YYYY")}
              </span>
            </div>
            <div className="w-1 h-1 rounded-full bg-gray-300" />
            <div className="flex items-center gap-1.5">
              <EyeIcon className="text-gray-400 text-base" />
              <span className="text-sm text-gray-500">{news.viewsCount}</span>
            </div>
          </div>

          {/* Image */}
          <div className="mt-6 rounded-xl overflow-hidden border border-gray-200">
            <Image
              width={1000}
              height={600}
              className="w-full h-auto object-cover"
              src={process.env.NEXT_PUBLIC_URL_BACKEND + news.image.file_path}
              alt={news.name}
            />
          </div>

          {/* Body */}
          <div
            className="mt-8 ql-editor text-gray-600 text-[16px] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: news.body }}
          />

          {/* File */}
          {news?.file?.file_path && (
            <div className="mt-6 rounded-xl overflow-hidden border border-gray-200">
              <iframe
                src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${news.file.file_path}`}
                width="100%"
                height="500px"
              />
            </div>
          )}

          <SinglePageGallery images={news.images} />
        </div>

        {/* Sidebar */}
        <div className="w-[30%] max-lg:w-full sticky top-4 flex flex-col gap-4">
          <ShareModal
            shareUrl={
              "https://nordicuniversity.org/" +
              (await getCurrentLangServer()) +
              "/education/academic-process/" +
              params.slug
            }
          />

          {/* Latest Items */}
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
              <span className="w-1.5 h-5 bg-text_secondary rounded-full block" />
              <h2 className="text-text_secondary text-base font-bold">
                {partners("last")}
              </h2>
            </div>
            <div className="flex flex-col divide-y divide-gray-100">
              {news.latestItems.map((item: Event, index: number) => (
                <Link
                  href={`/education/academic-process/${item.slug}`}
                  key={index}
                  className="flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 relative">
                    <Image
                      fill
                      src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${item.image.file_path}`}
                      alt={item.name}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-800 text-[13px] font-semibold line-clamp-2 leading-snug">
                      {item.name}
                    </h3>
                    <p
                      dangerouslySetInnerHTML={{ __html: item.body }}
                      className="text-gray-400 text-xs line-clamp-1 mt-1.5"
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
