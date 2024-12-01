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
import MinimalCard from "@/app/components/UI/smallNewsCard";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { ScientificEvent } from "@/types/research/scince_events";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const lang = await getCurrentLangServer();
  const event = await getEventBySlug(params.slug, lang);

  if (!event) {
    return {
      title: "Ilmiy tadbirlar - Xalqaro Nordik Universiteti",
      description:
        "Xalqaro Nordik Universiteti tomonidan o'tkazilgan ilmiy tadbirlar haqida to‘liq ma’lumot. Ilmiy izlanishlar natijalarini baham ko‘rish uchun eng yaxshi maydon.",
      openGraph: {
        title: "Ilmiy tadbirlar - Xalqaro Nordik Universiteti",
        description:
          "Xalqaro Nordik Universiteti tomonidan o'tkazilgan ilmiy tadbirlar haqida to‘liq ma’lumot. Ilmiy izlanishlar natijalarini baham ko‘rish uchun eng yaxshi maydon.",
        url: `https://nordicuniversity.org/${lang}/research/scientific-events`,
        type: "website",
        images: [
          {
            url: "https://nordicuniversity.org/images/scientific-events.jpg",
            alt: "Ilmiy tadbir sahifasi",
          },
        ],
      },
    };
  }

  return {
    title: `${event.name} - Ilmiy tadbir - Xalqaro Nordik Universiteti`,
    description:
      event.description ||
      "Mazkur ilmiy tadbir haqida batafsil ma'lumotni ko'ring.",
    keywords: [
      "Ilmiy tadbir",
      "Xalqaro Nordik Universiteti",
      "Ilmiy izlanishlar",
      "Tadqiqot va rivojlanish",
      "Innovatsion tadbirlar",
      event.name,
    ],
    openGraph: {
      title: `${event.name} - Ilmiy tadbir - Xalqaro Nordik Universiteti`,
      description:
        event.description ||
        "Mazkur ilmiy tadbir haqida batafsil ma'lumotni ko'ring.",
      url: `https://nordicuniversity.org/${lang}/research/scientific-events/${params.slug}`,
      type: "article",
      images: [
        {
          url: process.env.NEXT_PUBLIC_URL_BACKEND + event.image.file_path,
          alt: event.name,
        },
      ],
    },
  };
};

const Page = async ({ params }: { params: { slug: string } }) => {
  const lang = await getCurrentLangServer();

  const news: ScientificEvent = await getEventBySlug(params.slug, lang);

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
        <h2 className="text-tertiary max-sm:text-center max-md:text-md capitalize max-sm:text-lg text-2xl font-bold pb-3">
          {t("scinceEvent.breadcrumb.event")}
        </h2>
        <BroadCamp items={[brodCmbItems]} />
      </div>

      <div className="flex items-start max-lg:flex-col mt-6 gap-6">
        <div className="w-[70%] max-lg:w-full">
          <div className="h-[474px] max-lg:h-auto rounded-md bg-gray-50">
            <div className="px-6 pt-5">
              <h1 className="text-xl pb-5 font-semibold max-sm:text-lg tracking-wide text-primary">
                {news.name}
              </h1>
              <Image
                width={890}
                className="mx-auto block object-cover h-[800px] max-lg:h-auto rounded-xl shadow-lg"
                height={369}
                src={process.env.NEXT_PUBLIC_URL_BACKEND + news.image.file_path}
                alt={news.name}
              />
            </div>
          </div>
          <div className="mt-[450px] max-lg:mt-6">
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

          <div
            className={`${news.social_network_links ? "bg-gray-100" : ""} py-3 px-2 rounded-md mt-3 flex justify-center`}
          >
            {news.social_network_links &&
              Object.entries(news.social_network_links).map(
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
        </div>
        <div className="w-[27%] max-lg:w-full sticky top-4">
          <ShareModal
            shareUrl={
              "https://nordicuniversity.org/" +
              lang +
              "/research/scientific-events/" +
              params.slug
            }
          />
          <div className="bg-gray-50 mt-3 rounded-md">
            <div className="flex items-center gap-1.5 pl-4 pt-3">
              <span className="w-2 h-3 bg-text_secondary rounded-3xl block"></span>
              <h2 className="text-xl">{t("scinceEvent.breadcrumb.last")}</h2>
            </div>
            <div className="flex flex-col gap-1 mt-3">
              {allEvents.data.map((item, index) => (
                <MinimalCard
                  url="/research/scientific-events"
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
