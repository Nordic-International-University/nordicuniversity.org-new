import React from "react";
import DynamicSubPage from "@/app/components/layouts/dynamic/DynamicSubPage";
import { Metadata } from "next";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

async function getSubPageTitle(slug: string, lang: string): Promise<string> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/core/subpages/data/${slug}?language=${lang}&page=1&limit=1`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) return "Nordic International University";
    const data = await res.json();
    return data?.subPage_title || data?.subPage_name || "Nordic International University";
  } catch {
    return "Nordic International University";
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; lang: string };
}): Promise<Metadata> {
  const title = await getSubPageTitle(params.slug, params.lang);

  return buildSeoMetadata({
    title: `${title} - Nordic International University`,
    description: `${title} — Nordic International University matbuot xizmati.`,
    lang: params.lang,
    path: `/press-service/dynamic/${params.slug}`,
  });
}

const Page = () => {
  return (
    <DynamicSubPage
      transKey="press-service"
      broadCampTransKey="title"
      reduxSelector="pressServiceSidebarItems"
      pageSelector="press_service"
    />
  );
};

export default Page;
