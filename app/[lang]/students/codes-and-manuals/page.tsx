import React from "react";
import ClientPage from "@/app/[lang]/students/codes-and-manuals/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { getAllCodesAndManuals } from "@/app/[lang]/students/codes-and-manuals/getAllJournal";

export const metadata = {
  title: "Talabalar uchun kodeks va qo‘llanmalar - Xalqaro Nordik Universiteti",
  description:
    "Xalqaro Nordik Universiteti talabalari uchun kodekslar va qo‘llanmalar to‘plami. Talabalarimizga kerakli hujjatlar va qo‘llanmalarga oson kirish imkoniyatini taqdim etamiz.",
  keywords: [
    "Talabalar kodeksi",
    "Talabalar qo‘llanmasi",
    "Xalqaro universitet kodeksi",
    "Talabalar uchun qo‘llanmalar",
    "Xalqaro Nordik universiteti qo‘llanmasi",
    "Xalqaro universitet hujjatlari",
    "Universitet kodeksi va qo‘llanmalari",
    "Nordik universiteti talabalari",
  ],
  openGraph: {
    title:
      "Talabalar uchun kodeks va qo‘llanmalar - Xalqaro Nordik Universiteti",
    description:
      "Xalqaro Nordik Universiteti talabalari uchun kodekslar va qo‘llanmalar to‘plami. Talabalarimizga kerakli hujjatlar va qo‘llanmalarga oson kirish imkoniyatini taqdim etamiz.",
    url: "https://nordicuniversity.org/students/codes-and-manuals",
    type: "website",
  },
};

const Page = async () => {
  const data = await getAllCodesAndManuals({
    page: "1",
    limit: "1000",
    lang: await getCurrentLangServer(),
  });

  return <ClientPage props={data} />;
};

export default Page;
