import React from "react";
import ClientPage from "@/app/[lang]/research/scientific-events/ClientPage";
import { getAllEvents } from "@/app/[lang]/research/scientific-events/getAllEvents";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ilmiy tadbirlar - Xalqaro Nordik Universiteti",
  description:
    "Xalqaro Nordik Universiteti tomonidan tashkil etilgan ilmiy tadbirlar haqida to‘liq ma’lumot: professorlar va talabalar uchun imkoniyatlar.",
  keywords: [
    "Ilmiy tadbirlar",
    "O‘tgan tadbirlar",
    "Kelgusi tadbirlar",
    "Ilmiy konferensiyalar",
    "Xalqaro tadbirlar",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Ilmiy tadbirlar - Xalqaro Nordik Universiteti",
    description:
      "Xalqaro Nordik Universiteti tomonidan tashkil etilgan ilmiy tadbirlar haqida to‘liq ma’lumot: professorlar va talabalar uchun imkoniyatlar.",
    url: "https://nordicuniversity.org/research/scientific-events",
    type: "website",
    images: [
      {
        url: "https://nordicuniversity.org/images/scientific-events.jpg",
        alt: "Ilmiy Tadbirlar",
      },
    ],
  },
  alternates: {
    languages: {
      uz: "https://nordicuniversity.org/uz/research/scientific-events",
      en: "https://nordicuniversity.org/en/research/scientific-events",
      ru: "https://nordicuniversity.org/ru/research/scientific-events",
    },
  },
  other: {
    canonical: "https://nordicuniversity.org/research/scientific-events",
    xDefault: "https://nordicuniversity.org/research/scientific-events",
  },
};

const Page = async () => {
  const lang = await getCurrentLangServer();
  const data = await getAllEvents(lang, "EVENTS", 1, 100, "past");
  return <ClientPage initialData={data} />;
};

export default Page;
