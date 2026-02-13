import React from "react";
import ClientPage from "@/app/[lang]/students/examination-procedures/ClientPage";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Imtihon jarayonlari - Xalqaro Nordik Universiteti",
    description:
      "Xalqaro Nordik Universiteti talabalari uchun imtihon jarayonlarini o'rganing. Bizning zamonaviy kompyuter xonalari, HEMIS platformasi va adolatli imtihon tizimi haqida batafsil ma'lumot.",
    lang: params.lang,
    path: "/students/examination-procedures",
  });
}

const getAllPhotos = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/students/exam-procedures-photos?page=1&limit=10`,
    {
      cache: "no-cache",
    },
  );
  return await response.json();
};

const Page = async () => {
  const photos = await getAllPhotos();

  return <ClientPage data={photos.data} />;
};

export default Page;
