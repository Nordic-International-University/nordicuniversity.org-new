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
import { getAllEvents } from "@/app/[lang]/research/scientific-events/getAllEvents";
import { ScientificEvent } from "@/types/research/scince_events";
import Link from "next/link";
import { headers } from "next/headers";
import { getEventBySlug } from "@/app/[lang]/research/scientific-events/[slug]/getNewsBySlug";
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
  const pagePath = `/research/scientific-conferences/${params.slug}`;

  if (!event) {
    return {
      title: "Ilmiy Konferensiyalar - Xalqaro Nordik Universiteti",
      description:
        "Xalqaro Nordik Universitetining ilmiy konferensiyalari haqida to'liq ma'lumot.",
    };
  }

  return {
    title: `${event.name} - Xalqaro Nordik Universiteti`,
    description:
      event.description ||
      "Xalqaro Nordik Universitetining ilmiy konferensiyalari haqida batafsil ma'lumot oling.",
    openGraph: {
      title: `${event.name} - Xalqaro Nordik Universiteti`,
      description:
        event.description ||
        "Xalqaro Nordik Universitetining ilmiy konferensiyalari haqida batafsil ma'lumot oling.",
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

  const events: ScientificEvent = await getEventBySlug(
    params.slug,
    lang,
    clientIpAddress,
  );

  const allEvents: { data: ScientificEvent[] } = await getAllEvents(
    lang,
    "CONFERENCES",
    1,
    4,
    "past",
  );

  const t = await getTranslations("research");

  const brodCmbItems = [
    {
      url: "/research/scientific-conferences",
      name: (
        <p className="text-nowrap">
          {t("scienceConferences.breadcrumb.scientific_conferences")}
        </p>
      ),
    },
    {
      url: `/research/scientific-conferences/${params.slug}`,
      name: <p className="line-clamp-1">{events.name}</p>,
    },
  ];

  return (
    <article className="container mx-auto px-4 lg:px-8" id="printable">
      <div className="mt-8">
        <h2 className="text-text_secondary max-sm:text-center max-sm:text-lg text-2xl font-bold pb-3">
          {t("scienceConferences.breadcrumb.scientific_conferences")}
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
                process.env.NEXT_PUBLIC_URL_BACKEND + events?.image?.file_path
              }
              alt={events.name}
            />
          </div>

          {/* Title */}
          <h1 className="text-xl md:text-2xl font-bold text-text_secondary mt-6 leading-snug">
            {events.name}
          </h1>

          {/* Meta info */}
          <div className="flex items-center gap-5 mt-4 pb-5 border-b border-gray-200">
            <div className="flex items-center gap-1.5">
              <BiCalendar className="text-gray-400 text-base" />
              <span className="text-sm text-gray-500">
                {dayjs(events.time).format("MMMM DD, YYYY")}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <EyeIcon className="text-gray-400 text-base" />
              <span className="text-sm text-gray-500">
                {events.viewsCount}
              </span>
            </div>
          </div>

          {/* Description */}
          {events.description && (
            <p className="text-base leading-7 text-gray-700 mt-5">
              {events.description}
            </p>
          )}

          {/* Body */}
          <div
            className="mt-5 text-base leading-7 text-justify text-gray-700 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: events.body }}
          />

          {/* Social links */}
          {events.social_network_links && (
            <div className="mt-6 pt-5 border-t border-gray-200">
              <SocialLinks
                social_network_links={events.social_network_links}
                className="mt-0"
              />
            </div>
          )}

          {/* Gallery */}
          <SinglePageGallery images={events.images} />
        </div>

        {/* Sidebar */}
        <div className="w-[27%] max-lg:w-full sticky top-4">
          <ShareModal
            shareUrl={`https://nordicuniversity.org/${lang}/research/scientific-conferences/${params.slug}`}
          />

          {/* Latest conferences */}
          <div className="mt-4 border border-gray-200 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-gray-100 bg-gray-50">
              <span className="w-1.5 h-5 bg-text_secondary rounded-full block"></span>
              <h2 className="text-base font-semibold text-gray-800">
                {t("scienceConferences.breadcrumb.last")}
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {allEvents.data.map((item, index) => (
                <Link
                  key={index}
                  href={`/research/scientific-conferences/${item.slug}`}
                  className="flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-16 h-16 relative flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
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
