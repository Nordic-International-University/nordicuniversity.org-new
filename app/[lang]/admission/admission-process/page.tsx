import React from "react";
import ClientPage from "@/app/[lang]/admission/admission-process/ClientPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Qabul jarayonlari - Xalqaro Nordik Universiteti",
  description:
    "Cheksiz qiziqish va o‘rganishga bo‘lgan ishtiyoq bilan yo‘g‘rilgan, Xalqaro Nordik universiteti jamoasi chuqur tahliliy fikrlash, ixtirochilik, amaliy muammolarni hal qilish va yangiliklarga ochiqlikni qadrlaydi. Talabalar uchun ikkinchi uy bo‘lgan, rag‘batlantiruvchi va qo‘llab-quvvatlovchi muhitni taqdim etadi.",
  keywords: [
    "Qabul jarayonlari",
    "Xalqaro Nordik Universiteti",
    "Universitet qabul",
    "Talabalar uchun imkoniyatlar",
    "Rag‘batlantiruvchi muhit",
    "Tahliliy fikrlash",
    "Innovatsiyalar",
    "O‘quv jarayoni",
  ],
  openGraph: {
    title: "Qabul jarayonlari - Xalqaro Nordik Universiteti",
    description:
      "Cheksiz qiziqish va o‘rganishga bo‘lgan ishtiyoq bilan yo‘g‘rilgan, Xalqaro Nordik universiteti jamoasi chuqur tahliliy fikrlash, ixtirochilik, amaliy muammolarni hal qilish va yangiliklarga ochiqlikni qadrlaydi. Talabalar uchun ikkinchi uy bo‘lgan, rag‘batlantiruvchi va qo‘llab-quvvatlovchi muhitni taqdim etadi.",
    url: "https://nordicuniversity.org/admission/admission-process",
    type: "website",
    images: [
      {
        url: "public/images/admission-images/admission_process.ppg",
        alt: "Qabul jarayonlari - Xalqaro Nordik Universiteti",
      },
    ],
  },
};

const Page = async () => {
  return <ClientPage />;
};

export default Page;
