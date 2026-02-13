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
import { getEventBySlug } from "@/app/[lang]/research/scientific-events/[slug]/getNewsBySlug";
import { getAllEvents } from "@/app/[lang]/research/scientific-events/getAllEvents";
import Link from "next/link";
import { ScientificEvent } from "@/types/research/scince_events";
import { headers } from "next/headers";
import SinglePageGallery from "@/app/components/UI/singlePageGallery";
import SocialLinks from "@/app/components/UI/SocialLinks";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string; lang: string };
}) => {
  const lang = params.lang;
  const event = await getEventBySlug(params.slug, lang);
  const baseUrl = "https://nordicuniversity.org";
  const pagePath = `/research/scientific-events/${params.slug}`;

  if (!event) {
    return {
      title: "Ilmiy tadbirlar - Xalqaro Nordik Universiteti",
      description:
        "Xalqaro Nordik Universiteti tomonidan o'tkazilgan ilmiy tadbirlar haqida to'liq ma'lumot.",
    };
  }

  return {
    title: `${event.name} - Ilmiy tadbir - Xalqaro Nordik Universiteti`,
    description:
      event.description ||
      "Mazkur ilmiy tadbir haqida batafsil ma'lumotni ko'ring.",
    openGraph: {
      title: `${event.name} - Ilmiy tadbir - Xalqaro Nordik Universiteti`,
      description:
        event.description ||
        "Mazkur ilmiy tadbir haqida batafsil ma'lumotni ko'ring.",
      url: `${baseUrl}/${lang}${pagePath}`,
      type: "article",
      images: [
        {
          url: process.env.NEXT_PUBLIC_URL_BACKEND + event.image.file_path,
          alt: event.name,
        },
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
};

const Page = async ({ params }: { params: { slug: string } }) => {
  const lang = await getCurrentLangServer();

  const requestHeaders = headers();
  const clientIpAddress = requestHeaders.get("x-forwarded-for") || "";

  const news: ScientificEvent = await getEventBySlug(
    params.slug,
    lang,
    clientIpAddress,
  );

  const allEvents: { data: ScientificEvent[] } = await getAllEvents(
    lang,
    "EVENTS",
    1,
    100,
    "past",
  );

  const t = await getTranslations("research");

  const brodCmbItems = [
    {
      url: "/research/scientific-events",
      name: t("scinceEvent.breadcrumb.event"),
    },
    {
      url: `/research/scientific-events/${params.slug}`,
      name: <p className="line-clamp-1">{news.name}</p>,
    },
  ];

  return (
    <article className="container mx-auto px-4 lg:px-8" id="printable">
      <div className="mt-8">
        <h2 className="text-text_secondary max-sm:text-center max-sm:text-lg text-2xl font-bold pb-3">
          {t("scinceEvent.breadcrumb.event")}
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
                process.env.NEXT_PUBLIC_URL_BACKEND + news?.image?.file_path
              }
              alt={news.name}
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

          {/* Social links */}
          {news.social_network_links && (
            <div className="mt-6 pt-5 border-t border-gray-200">
              <SocialLinks social_network_links={news.social_network_links} className="mt-0" />
            </div>
          )}

          {/* Gallery */}
          <SinglePageGallery images={news.images} />
        </div>

        {/* Sidebar */}
        <div className="w-[27%] max-lg:w-full sticky top-4">
          <ShareModal
            shareUrl={`https://nordicuniversity.org/${lang}/research/scientific-events/${params.slug}`}
          />

          {/* Latest events */}
          <div className="mt-4 border border-gray-200 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-gray-100 bg-gray-50">
              <span className="w-1.5 h-5 bg-text_secondary rounded-full block"></span>
              <h2 className="text-base font-semibold text-gray-800">
                {t("scinceEvent.breadcrumb.last")}
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {allEvents.data.map((item, index) => (
                <Link
                  key={index}
                  href={`/research/scientific-events/${item.slug}`}
                  className="flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-16 h-16 relative flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      fill
                      src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${item.image.file_path}`}
                      alt={item.name}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-gray-800 line-clamp-2 leading-snug">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-1 mt-1.5 text-gray-400">
                      <BiCalendar className="text-xs" />
                      <span className="text-xs">
                        {dayjs(item.time).format("DD.MM.YYYY")}
                      </span>
                    </div>
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
