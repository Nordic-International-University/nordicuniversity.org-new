import React from "react";
import { Metadata } from "next";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";
import { getAudioBookDetailBySlug } from "@/app/[lang]/press-service/audio-books/api";
import AudioBookClient from "./AudioBookClient";

export async function generateMetadata({
  params,
}: {
  params: { slug: string; lang: string };
}): Promise<Metadata> {
  try {
    const data = await getAudioBookDetailBySlug(params.slug, params.lang);
    const imageUrl = data?.image?.file_path
      ? `${process.env.NEXT_PUBLIC_URL_BACKEND}${data.image.file_path}`
      : undefined;

    return buildSeoMetadata({
      title: `${data.name} - Nordic International University`,
      description: `${data.name} — audio kitoblar, Nordic International University.`,
      lang: params.lang,
      path: `/press-service/audio-books/${params.slug}`,
      ...(imageUrl && { image: { url: imageUrl, alt: data.name } }),
    });
  } catch {
    return buildSeoMetadata({
      title: "Audio kitoblar - Nordic International University",
      description: "Nordic International University audio kitoblar to'plami.",
      lang: params.lang,
      path: `/press-service/audio-books/${params.slug}`,
    });
  }
}

const Page = () => {
  return <AudioBookClient />;
};

export default Page;
