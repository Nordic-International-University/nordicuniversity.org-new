import React from "react";
import ClientPage from "@/app/[lang]/university/requisites/ClientPage";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Rekvizitlar - Nordik Xalqaro Universiteti",
    description:
      "Nordik Xalqaro Universitetining rekvizitlari: bank rekvizitlari, rasmiy manzil, STIR, IFUT, MFO va boshqa muhim ma'lumotlar. Universitetimiz haqidagi barcha rekvizitlar ushbu sahifada mavjud.",
    lang: params.lang,
    path: "/university/requisites",
  });
}

const Page = async () => {
  return <ClientPage />;
};

export default Page;
