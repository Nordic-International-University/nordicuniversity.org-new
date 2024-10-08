import React from "react";
import SearchClient from "@/app/search/searchClient";

export const metadata = {
  title: " Qidiruv sahifasi",
  description:
    "Turli maqolalarni turli mezonlar bo‘yicha saralash va qidirish imkoniyatlari.",
  keywords: [
    "maqolalar",
    "saralash",
    "mualliflar",
    "kategoriyalar",
    "sana bo‘yicha",
  ],
  openGraph: {
    title: " Qidiruv sahifasi",
    description:
      "Turli maqolalarni turli mezonlar bo‘yicha saralash va qidirish imkoniyatlari.",
    url: `${process.env["NEXT_PUBLIC_API_URL"]}/saerch`,
    type: "website",
    images: [
      {
        url: "https://www.8ways.ch/application/files/7216/7627/9058/SEO_EWM_SA_Digital_Agency_Geneva.jpg",
        width: 1200,
        height: 630,
        alt: "Maqolalar Saralash Sahifasi",
      },
    ],
  },
};

const Page = () => {
  return <SearchClient />;
};

export default Page;
