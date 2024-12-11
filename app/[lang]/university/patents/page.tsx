import React from "react";
import ClientPage from "@/app/[lang]/university/patents/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";

export const metadata = {
  title: "Xalqaro Nordic Universiteti - Meyoriy Hujjatlar",
  description:
    "Xalqaro Nordic Universiteti uchun barcha meyoriy hujjatlar: Nizom, Litsenziya, Sertifikat va boshqalar.",
  keywords:
    "meyoriy hujjatlar, nizom, litsenziya, sertifikat, universitet hujjatlari, hujjatlar, rasmiy hujjatlar, talaba hujjatlari, universitetni tasdiqlovchi hujjatlar, o‘quv hujjatlari, universitet nizomi, universitet litsenziyasi, sertifikat, talabalar uchun hujjatlar, o‘quv hujjatlari",
  openGraph: {
    title: "Xalqaro Nordic Universiteti - Meyoriy Hujjatlar",
    description:
      "Nordik universiteti talabalariga kerakli meyoriy hujjatlar: Nizom, Litsenziya, Sertifikat va boshqa muhim hujjatlar.",
    url: "https://nordicuniversity.org/university/documents",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xalqaro Nordic Universiteti - Meyoriy Hujjatlar",
    description:
      "Nordik universiteti talabalari uchun barcha meyoriy hujjatlar: Nizom, Litsenziya, Sertifikat va boshqa muhim hujjatlar.",
  },
};

const getHome = async (lang: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/core/home-page?language=${lang}`,
  );
  return await response.json();
};

const Page = async () => {
  const { sections } = await getHome(await getCurrentLangServer());
  return <ClientPage props={sections} />;
};

export default Page;
