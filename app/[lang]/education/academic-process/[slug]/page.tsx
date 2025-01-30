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
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { Event } from "@/types/templates/international-meeating";
import { Metadata } from "next";
import "react-quill/dist/quill.snow.css";
import { headers } from "next/headers";
import SinglePageGallery from "@/app/components/UI/singlePageGallery";
import { getAcademicProcessBySLug } from "@/app/[lang]/education/academic-process/getAllAcademicProcces";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const lang = await getCurrentLangServer();
  const event: Event = await getAcademicProcessBySLug(lang, params.slug);

  return {
    title: event.name,
    description: event.description,
    openGraph: {
      title: event.name,
      description: event.description,
      url: `https://nordicuniversity.org/${lang}/education/academic-process/${params.slug}`,
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
      canonical: `https://nordicuniversity.org/${lang}/education/academic-process/${params.slug}`,
    },
    metadataBase: new URL("https://nordicuniversity.org"),
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
    <article className="container mx-auto px-4 lg:px-8" id="printable">
      <div className="mt-8">
        <h2 className="text-tertiary max-sm:text-center max-sm:text-lg text-2xl font-bold pb-3">
          {t("subItems.4")}
        </h2>
        <BroadCamp items={[brodCmbItems]} />
      </div>

      <div className="flex items-start max-lg:flex-col mt-6 gap-6">
        <div className="w-[70%] max-lg:w-full">
          <div className=" max-lg:h-auto rounded-md bg-gray-50">
            <div className="px-6 max-sm:px-0 pt-5">
              <h1 className="text-xl max-lg:text-sm pb-5 font-semibold tracking-wide text-primary">
                {news.name}
              </h1>
              <Image
                width={1000}
                className="mx-auto block object-contain max-lg:h-auto w-full h-full rounded-xl shadow-lg"
                height={1000}
                src={process.env.NEXT_PUBLIC_URL_BACKEND + news.image.file_path}
                alt={news.name}
              />
            </div>
          </div>
          <div className="mt-5">
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
            <p
              className="mt-6 ql-editor text-justifiy"
              dangerouslySetInnerHTML={{ __html: news.body }}
            ></p>
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
              "/education/academic-process/" +
              params.slug
            }
          />
          <div className="bg-gray-50 mt-3 rounded-md">
            <div className="flex items-center gap-1.5 pl-4 pt-3">
              <span className="w-2 h-3 bg-text_secondary rounded-3xl block"></span>
              <h2 className="text-xl">{partners("last")}</h2>
            </div>
            <div className="flex flex-col gap-1 mt-3">
              {news.latestItems.map((item: Event, index: number) => (
                <MinimalCard
                  url="/partners/connections"
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
