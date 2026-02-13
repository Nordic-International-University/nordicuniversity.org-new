import React from "react";
import ClientPage from "@/app/[lang]/admission/admission-process/ClientPage";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Qabul jarayonlari - Xalqaro Nordik Universiteti",
    description:
      "Cheksiz qiziqish va o'rganishga bo'lgan ishtiyoq bilan yo'g'rilgan, Xalqaro Nordik universiteti jamoasi chuqur tahliliy fikrlash, ixtirochilik, amaliy muammolarni hal qilish va yangiliklarga ochiqlikni qadrlaydi. Talabalar uchun ikkinchi uy bo'lgan, rag'batlantiruvchi va qo'llab-quvvatlovchi muhitni taqdim etadi.",
    lang: params.lang,
    path: "/admission/admission-process",
  });
}

const Page = async () => {
  return <ClientPage />;
};

export default Page;
