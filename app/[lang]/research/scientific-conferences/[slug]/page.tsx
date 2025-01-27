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
import MinimalCard from "@/app/components/UI/smallNewsCard";
import { ScientificEvent } from "@/types/research/scince_events";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { headers } from "next/headers";
import { getEventBySlug } from "@/app/[lang]/research/scientific-events/[slug]/getNewsBySlug";
import SinglePageGallery from "@/app/components/UI/singlePageGallery";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const lang = await getCurrentLangServer();
  const event = await getEventBySlug(params.slug, lang);

  console.log(event);
  if (!event) {
    return {
      title: "Ilmiy Konferensiyalar - Xalqaro Nordik Universiteti",
      description:
        "Xalqaro Nordik Universitetining ilmiy konferensiyalari haqida to‘liq ma’lumot. Ilmiy izlanishlar va tadqiqotlar natijalarini taqdim etish uchun eng yaxshi platforma.",
      openGraph: {
        title: "Ilmiy Konferensiyalar - Xalqaro Nordik Universiteti",
        description:
          "Xalqaro Nordik Universitetining ilmiy konferensiyalari haqida to‘liq ma’lumot. Ilmiy izlanishlar va tadqiqotlar natijalarini taqdim etish uchun eng yaxshi platforma.",
        url: `https://nordicuniversity.org/${lang}/research/scientific-conferences`,
        type: "website",
        images: [
          {
            url: "https://nordicuniversity.org/images/scientific-conferences.jpg",
            alt: "Ilmiy Konferensiyalar sahifasi",
          },
        ],
      },
    };
  }

  return {
    title: `${event.name}`,
    description:
      event.description ||
      "Xalqaro Nordik Universitetining ilmiy konferensiyalari haqida batafsil ma’lumot oling.",
    keywords: [
      "Ilmiy konferensiyalar",
      "Xalqaro Nordik Universiteti",
      "Tadqiqot va izlanishlar",
      "Innovatsion loyihalar",
      event.name,
      "Ilmiy seminarlar",
      "Ilmiy yutuqlar",
    ],
    openGraph: {
      title: `${event.name}`,
      description:
        event.description ||
        "Xalqaro Nordik Universitetining ilmiy konferensiyalari haqida batafsil ma’lumot oling.",
      url: `https://nordicuniversity.org/${lang}/research/scientific-conferences/${params.slug}`,
      type: "article",
      images: [
        {
          url: process.env.NEXT_PUBLIC_URL_BACKEND + event.image.file_path,
          alt: event.name,
        },
      ],
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Event",
      name: event.name,
      description: event.description,
      startDate: event.time,
      location: {
        "@type": "Place",
        name: "Xalqaro Nordik Universiteti",
      },
      image: process.env.NEXT_PUBLIC_URL_BACKEND + event.image.file_path,
      organizer: {
        "@type": "Organization",
        name: "Xalqaro Nordik Universiteti",
        url: "https://nordicuniversity.org",
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
        <h2 className="text-tertiary max-sm:text-center max-md:text-md capitalize max-sm:text-lg text-2xl font-bold pb-3">
          {t("scienceConferences.breadcrumb.scientific_conferences")}
        </h2>
        <BroadCamp items={[brodCmbItems]} />
      </div>

      <div className="flex items-start max-lg:flex-col mt-6 gap-6">
        <div className="w-[70%] max-lg:w-full">
          <div className="max-lg:h-auto rounded-md bg-gray-50">
            <div className="px-6 pt-5">
              <h1 className="text-xl pb-5 font-semibold max-sm:text-lg tracking-wide text-primary">
                {events.name}
              </h1>
              <Image
                width={890}
                className="mx-auto block h-[800px] object-cover rounded-xl shadow-lg"
                height={369}
                src={
                  process.env.NEXT_PUBLIC_URL_BACKEND + events?.image?.file_path
                }
                alt={events.name}
              />
            </div>
          </div>
          <div className="mt-5 max-lg:mt-6">
            <div className="flex items-center gap-7 justify-center">
              <div className="flex items-center gap-1">
                <BiCalendar className="text-gray-400" />
                <p className="text-sm text-gray-500">
                  {dayjs(events.time).format("MMMM DD , YYYY")}
                </p>
              </div>
              <span className="text-gray-200">|</span>
              <div className="flex items-center gap-1">
                <EyeIcon className="text-gray-400" />
                <p className="text-sm text-gray-500">{events.viewsCount}</p>
              </div>
            </div>
            <div className="mt-5">
              <p className="text-lg leading-8 text-gray-800">
                {events.description}
              </p>
              <div
                className="mt-6 text-base leading-7 text-justify text-gray-700"
                dangerouslySetInnerHTML={{ __html: events.body }}
              ></div>
            </div>
          </div>

          <div
            className={`${events.social_network_links ? "bg-gray-100" : ""} py-3 px-2 rounded-md mt-3 flex justify-center`}
          >
            {events.social_network_links &&
              Object.entries(events.social_network_links).map(
                ([key, value]: any, idx) => (
                  <Link
                    key={idx}
                    href={value || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7A98C1] hover:text-secondary"
                    aria-label={key}
                  >
                    {key === "facebook" && <FaFacebook className="text-2xl" />}
                    {key === "telegram" && <FaTelegram className="text-2xl" />}
                    {key === "youtube" && <FaYoutube className="text-2xl" />}
                    {key === "instagram" && (
                      <FaInstagram className="text-2xl" />
                    )}
                    {key === "twitter" && <FaTwitter className="text-2xl" />}
                  </Link>
                ),
              )}
          </div>
          <SinglePageGallery images={events.images} />
        </div>
        <div className="w-[27%] max-lg:w-full sticky top-4">
          <ShareModal
            shareUrl={
              "https://nordicuniversity.org/" +
              lang +
              "/research/scientific-events" +
              params.slug
            }
          />
          <div className="bg-gray-50 mt-3 rounded-md">
            <div className="flex items-center gap-1.5 pl-4 pt-3">
              <span className="w-2 h-3 bg-text_secondary rounded-3xl block"></span>
              <h2 className="text-xl">
                {t("scienceConferences.breadcrumb.last")}
              </h2>
            </div>
            <div className="flex flex-col gap-1 mt-3">
              {allEvents.data.map((item, index) => (
                <MinimalCard
                  url="/research/scientific-conferences"
                  subTitle={item.body}
                  key={index}
                  image={item.image}
                  title={item.name}
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
