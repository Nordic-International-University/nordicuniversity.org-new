import React from "react";
import ClientPage from "@/app/[lang]/admission/faq/ClientPage";
import { getAllFaqsParameterTypes } from "@/types/api/apiTypes";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";

export const metadata = {
  title: "Ko‘p Beriladigan Savollar (FAQ) - Xalqaro Nordik Universiteti",
  description:
    "Xalqaro Nordik Universitetiga qabul jarayoni bo‘yicha eng ko‘p beriladigan savollar va ularning javoblari. Savollaringizga tezkor javob toping va qabul jarayoni haqida to‘liq ma’lumotga ega bo‘ling.",
  keywords: [
    "Ko‘p beriladigan savollar",
    "FAQ",
    "Xalqaro Nordik Universiteti",
    "Qabul jarayoni savollari",
    "Universitetga qabul",
    "Talabalar uchun ma’lumotlar",
    "Savol-javob",
    "Universitet haqida savollar",
  ],
  openGraph: {
    title: "Ko‘p Beriladigan Savollar (FAQ) - Xalqaro Nordik Universiteti",
    description:
      "Xalqaro Nordik Universitetiga qabul jarayoni bo‘yicha eng ko‘p beriladigan savollar va ularning javoblari. Savollaringizga tezkor javob toping va qabul jarayoni haqida to‘liq ma’lumotga ega bo‘ling.",
    url: "https://nordicuniversity.org/admission/faq",
    type: "website",
    images: [
      {
        url: "/public/images/admission-images/faq.jpg",
        alt: "Ko‘p Beriladigan Savollar - Xalqaro Nordik Universiteti",
      },
    ],
  },
};

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
