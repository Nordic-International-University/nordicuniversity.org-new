import React from "react";
import ClientPage from "@/app/[lang]/university/year-end-review/ClientPage";
import { annualsItem } from "@/types/templates/annuals_and_review.types";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";

export const metadata = {
  title: "Rekvizitlar - Nordik Xalqaro Universiteti",
  description:
    "Nordik Xalqaro Universitetining rekvizitlari: bank rekvizitlari, rasmiy manzil, STIR, IFUT, MFO va boshqa muhim ma'lumotlar. Universitetimiz haqidagi barcha rekvizitlar ushbu sahifada mavjud.",
  alternates: {
    canonical: "https://nordicuniversity.org/uz/university/requisites",
  },
  openGraph: {
    title: "Rekvizitlar - Nordik Xalqaro Universiteti",
    description:
      "Nordik Xalqaro Universitetining rekvizitlari: bank rekvizitlari, rasmiy manzil, STIR, IFUT, MFO va boshqa muhim ma'lumotlar. Universitetimiz haqidagi barcha rekvizitlar ushbu sahifada mavjud.",
    url: "https://nordicuniversity.org/uz/university/requisites",
    siteName: "Nordik Xalqaro Universiteti",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rekvizitlar - Nordik Xalqaro Universiteti",
    description:
      "Nordik Xalqaro Universitetining rekvizitlari: bank rekvizitlari, rasmiy manzil, STIR, IFUT, MFO va boshqa muhim ma'lumotlar. Universitetimiz haqidagi barcha rekvizitlar ushbu sahifada mavjud.",
  },
};

const getAnnuals = async (): Promise<annualsItem[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/university/annual-review?language=${await getCurrentLangServer()}`,
  );
  return response.json();
};

const Page = async () => {
  const allAnnuals: annualsItem[] = await getAnnuals();

  return <ClientPage allAnnuals={allAnnuals} />;
};

export default Page;
