import { Metadata } from "next";
import React from "react";
import { FaClock } from "react-icons/fa";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";

interface ReleaseDetailProps {
  id: string;
  title: string;
  body: string;
  time: string;
  slug: string;
  createdAt: string;
}

async function getRelease(slug: string): Promise<ReleaseDetailProps> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/press/releases/${slug}?language=${await getCurrentLangServer()}`,
    {
      next: { revalidate: 60 },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch release data");
  }

  return res.json();
}
export default async function ReleasePage({
  params,
}: {
  params: { slug: string };
}) {
  const release = await getRelease(params.slug);

  return (
    <article className="container">
      <div className=" mx-auto mt-10 mb-10 p-5 w-full">
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold mb-4 text-[#5B7FAB]">
            {release.title}
          </h1>
          <div className="flex items-center text-gray-500 mb-4">
            <FaClock className="mr-2" />
            <span>{release.time}</span>
          </div>
          <p
            dangerouslySetInnerHTML={{ __html: release.body }}
            className="text-lg text-gray-700 leading-relaxed"
          ></p>
        </div>
      </div>
    </article>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; lang: string };
}): Promise<Metadata> {
  const release = await getRelease(params.slug);
  const baseUrl = "https://nordicuniversity.org";
  const pagePath = `/press-service/releases/${params.slug}`;

  return {
    title: release.title,
    description: release.body.slice(0, 160),
    alternates: {
      canonical: `${baseUrl}/${params.lang}${pagePath}`,
      languages: {
        uz: `${baseUrl}/uz${pagePath}`,
        en: `${baseUrl}/en${pagePath}`,
        ru: `${baseUrl}/ru${pagePath}`,
        "x-default": `${baseUrl}/uz${pagePath}`,
      },
    },
  };
}
