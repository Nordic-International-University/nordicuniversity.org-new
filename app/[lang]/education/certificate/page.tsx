import React from "react";
import ClientPage from "@/app/[lang]/education/certificate/ClientPage";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Xorijiy tillarni bilish sertifikati - Xalqaro Nordik Universiteti",
    description:
      "Magistratura va oliy ta'limdan keyingi ta'lim ixtisosliklariga talab etiladigan xorijiy tillarni bilish darajasini baholovchi milliy va xalqaro tan olingan sertifikatlar ro'yxati. IELTS, TOEFL, CEFR va boshqa til imtihonlari haqida batafsil ma'lumot.",
    lang: params.lang,
    path: "/education/certificate",
  });
}

const Page = async () => {
  return <ClientPage />;
};

export default Page;
