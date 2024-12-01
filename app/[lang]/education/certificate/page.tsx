import React from "react";
import ClientPage from "@/app/[lang]/education/certificate/ClientPage";

export const metadata = {
  title: "Xorijiy tillarni bilish sertifikati - Xalqaro Nordik Universiteti",
  description:
    "Magistratura va oliy ta’limdan keyingi ta’lim ixtisosliklariga talab etiladigan xorijiy tillarni bilish darajasini baholovchi milliy va xalqaro tan olingan sertifikatlar ro‘yxati. IELTS, TOEFL, CEFR va boshqa til imtihonlari haqida batafsil ma’lumot.",
  keywords: [
    "Xorijiy tillarni bilish sertifikati",
    "Til darajalari",
    "IELTS",
    "TOEFL iBT",
    "TOEFL ITP",
    "Cambridge Assessment English Linguaskill",
    "CEFR",
    "B2 daraja",
    "C1 daraja",
    "C2 daraja",
    "Til sertifikati",
    "Nemis tili sertifikati",
    "Fransuz tili sertifikati",
    "GOETHE-ZERTIFIKAT",
    "Deutsches Sprachdiplom (DSD II)",
    "DELF",
    "DALF",
    "TCF",
    "Tilni baholash tizimlari",
    "Xalqaro sertifikatlar",
    "Magistratura talablari",
    "Oliy ta’limdan keyingi ta’lim",
    "Xorijiy til imtihonlari",
    "Xalqaro tan olingan sertifikatlar",
  ],
  openGraph: {
    title: "Xorijiy tillarni bilish sertifikati - Xalqaro Nordik Universiteti",
    description:
      "Magistratura va oliy ta’limdan keyingi ta’lim ixtisosliklariga talab etiladigan xorijiy tillarni bilish darajasini baholovchi milliy va xalqaro tan olingan sertifikatlar ro‘yxati. IELTS, TOEFL, CEFR va boshqa til imtihonlari haqida batafsil ma’lumot.",
    url: "https://nordicuniversity.org/education/certificate",
    type: "website",
  },
};

const Page = async () => {
  return <ClientPage />;
};

export default Page;
