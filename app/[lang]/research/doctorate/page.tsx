import React from "react";
import ClientPage from "@/app/[lang]/research/doctorate/ClientPage";
import {
  getAllDoctorate,
  getAllDoctorateCount,
} from "@/app/[lang]/research/doctorate/doctorate.api";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nordik Xalqaro Universiteti - Doktorantura",
  description:
    "Nordik Xalqaro Universitetining doktorantura dasturlari haqida batafsil ma'lumot. Ilmiy izlanishlar va akademik rivojlanish uchun imkoniyatlar.",
  openGraph: {
    title: "Nordik Xalqaro Universiteti - Doktorantura",
    description:
      "Nordik Xalqaro Universitetining doktorantura dasturlari haqida batafsil ma'lumot. Ilmiy izlanishlar va akademik rivojlanish uchun imkoniyatlar.",
    url: "https://nordicuniversity.org/research/doctorate",
    siteName: "Nordik Xalqaro Universiteti",
    images: [
      {
        url: "/images/research-images/doctorate.jpg",
        width: 1200,
        height: 630,
        alt: "Doktorantura dasturlari",
      },
    ],
    locale: "uz_UZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nordik Xalqaro Universiteti - Doktorantura",
    description:
      "Nordik Xalqaro Universitetining doktorantura dasturlari haqida batafsil ma'lumot. Ilmiy izlanishlar va akademik rivojlanish uchun imkoniyatlar.",
    images: ["/images/research-images/doctorate.jpg"],
  },
};

const Page = async () => {
  const lang = await getCurrentLangServer();
  const allDoctorateField = await getAllDoctorate(lang);
  const allDoctorateCount = await getAllDoctorateCount(lang);

  return (
    <ClientPage
      allDoctorateCount={allDoctorateCount}
      allDDoctorateField={allDoctorateField}
    />
  );
};

export default Page;
