import React from "react";
import ClientPage from "@/app/[lang]/students/examination-procedures/ClientPage";

export const metadata = {
  title: "Imtihon jarayonlari - Xalqaro Nordik Universiteti",
  description:
    "Xalqaro Nordik Universiteti talabalari uchun imtihon jarayonlarini o‘rganing. Bizning zamonaviy kompyuter xonalari, HEMIS platformasi va adolatli imtihon tizimi haqida batafsil ma'lumot.",
  keywords: [
    "Imtihon jarayonlari",
    "Xalqaro Nordik Universiteti imtihonlari",
    "HEMIS platformasi",
    "Kompyuter xonalari",
    "Talabalar imtihonlari",
    "Adolatli imtihon tizimi",
    "Imtihon natijalari",
    "Imtihon jarayoni",
    "Kompyuter texnologiyalari",
    "Talaba imtihonlari",
    "Zamonaviy imtihon tizimi",
    "Maxsus ishchi guruhlari",
    "Imtihon nazoratchilari",
    "Imtihon xonalarida qulay muhit",
    "Talabalar uchun qulay imtihon",
  ],
  openGraph: {
    title: "Imtihon jarayonlari - Xalqaro Nordik Universiteti",
    description:
      "Xalqaro Nordik Universiteti talabalari uchun imtihon jarayonlarini o‘rganing. Bizning zamonaviy kompyuter xonalari, HEMIS platformasi va adolatli imtihon tizimi haqida batafsil ma'lumot.",
    url: "https://nordicuniversity.org/students/examination-procedures",
    type: "website",
  },
};

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
