import React from "react";
import ClientPage from "@/app/[lang]/partners/connections/ClientPage";
import { getAllMeeting } from "./getAllMeeting";
import { meetingType, timeFilter } from "@/types/api/apiTypes";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xalqaro Nordik Universiteti - Hamkorlik Aloqalari",
  description:
    "Xalqaro Nordik Universitetining xalqaro hamkorlik aloqalari haqida batafsil ma'lumot. Hamkor universitetlar va o'quv dasturlari haqida bilib oling.",
  keywords:
    "hamkorlik, xalqaro aloqalar, universitet hamkorligi, ta'lim hamkorligi",
  openGraph: {
    title: "Xalqaro Nordik Universiteti - Hamkorlik Aloqalari",
    description:
      "Xalqaro Nordik Universitetining xalqaro hamkorlik aloqalari haqida batafsil ma'lumot.",
    url: "https://nordicuniversity.org/uz/partners/connections",
    type: "website",
    images: [
      {
        url: "/public/seo/b835e3f5732864ec87f6e171a6ae53bd.jpg",
        alt: "Hamkorlik Aloqalari",
      },
    ],
  },
  alternates: {
    languages: {
      uz: "https://nordicuniversity.org/uz/partners/connections",
      en: "https://nordicuniversity.org/en/partners/connections",
      ru: "https://nordicuniversity.org/ru/partners/connections",
    },
    canonical: "https://nordicuniversity.org/uz/partners/connections",
  },
  robots: "index, follow",
};

const Page = async () => {
  const initialData = await getAllMeeting({
    time: timeFilter.future,
    type: meetingType.CONNECTIONS,
    page: 1,
    limit: 2,
    lang: await getCurrentLangServer(),
  });

  return <ClientPage initialData={initialData} />;
};

export default Page;
