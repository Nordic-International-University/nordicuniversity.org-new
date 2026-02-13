import React from "react";
import ClientPage from "@/app/[lang]/admission/faq/ClientPage";
import { getAllFaqsParameterTypes } from "@/types/api/apiTypes";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Ko'p Beriladigan Savollar (FAQ) - Xalqaro Nordik Universiteti",
    description:
      "Xalqaro Nordik Universitetiga qabul jarayoni bo'yicha eng ko'p beriladigan savollar va ularning javoblari. Savollaringizga tezkor javob toping va qabul jarayoni haqida to'liq ma'lumotga ega bo'ling.",
    lang: params.lang,
    path: "/admission/faq",
  });
}

const getAllFaqs = async ({ page, limit, lang }: getAllFaqsParameterTypes) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/core/faq/user?language=${lang}&page=${page}&limit=${limit}`,
    {
      cache: "no-store",
    },
  );
  const json = response.json();
  return json;
};

const Page = async () => {
  const faqs = await getAllFaqs({
    limit: "1000",
    page: "1",
    lang: await getCurrentLangServer(),
  });

  console.log(faqs);
  return <ClientPage data={faqs} />;
};

export default Page;
