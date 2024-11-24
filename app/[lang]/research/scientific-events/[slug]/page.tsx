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

import { Event } from "@/types/templates/international-meeating";
import { getEventBySlug } from "@/app/[lang]/research/scientific-events/[slug]/getNewsBySlug";
import { getAllEvents } from "@/app/[lang]/research/scientific-events/getAllEvents";
import MinimalCard from "@/app/components/UI/smallNewsCard";

const Page = async ({ params }: { params: { slug: string } }) => {
  const lang = await getCurrentLangServer();

  const news: Event = await getEventBySlug(params.slug, lang);

  const allEvents: { data: Event[] } = await getAllEvents(
    lang,
    "EVENTS",
    1,
    100,
    "past",
  );

  const t = await getTranslations("research");

  const brodCmbItems = [
    {
      url: "/scientific-events",
      name: t("scinceEvent.breadcrumb.scientific_events"),
    },
    {
      url: `/scientific-events/news/${params.slug}`,
      name: news.name,
    },
  ];

  return (
    <article className="container mx-auto px-4 lg:px-8" id="printable">
      <div className="mt-8">
        <h2 className="text-tertiary capitalize max-sm:text-lg text-2xl font-bold pb-3">
          {t("scinceEvent.breadcrumb.event")}
        </h2>
        <BroadCamp items={[brodCmbItems]} />
      </div>

      <div className="flex items-start mt-6 gap-6">
        <div className="w-[70%]">
          <div className="relative h-[474px] rounded-md bg-gray-50">
            <div className="px-6 pt-5">
              <h1 className="text-xl pb-5 max-sm:text-xl font-semibold tracking-wide text-primary">
                {news.name}
              </h1>

              <Image
                width={890}
                className="mx-auto absolute block object-cover min-h-[800px] rounded-xl shadow-lg"
                height={369}
                src={process.env.NEXT_PUBLIC_URL_BACKEND + news.image.file_path}
                alt={news.name}
              />
            </div>
          </div>
          <div className="mt-[450px]">
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
        <div className="w-[27%] sticky top-4">
          <ShareModal
            shareUrl={
              "https://nordicuniversity.org/" +
              lang +
              "/press-service/news/" +
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
