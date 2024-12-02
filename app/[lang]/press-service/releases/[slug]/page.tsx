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

// Serverda ma'lumot olish funksiyasi
async function getRelease(slug: string): Promise<ReleaseDetailProps> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/press/releases/${slug}?language=${await getCurrentLangServer()}`,
    {
      next: { revalidate: 60 }, // SSR va ISR uchun revalidatsiya
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch release data");
  }

  return res.json();
}

// Sahifa Componenti
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
          <p className="text-lg text-gray-700 leading-relaxed">
            {release.body}
          </p>
        </div>
      </div>
    </article>
  );
}

// Metadata uchun funksiyalar
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const release = await getRelease(params.slug);

  return {
    title: release.title,
    description: release.body.slice(0, 160),
  };
}
