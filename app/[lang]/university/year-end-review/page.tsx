import React from "react";
import ClientPage from "@/app/[lang]/university/year-end-review/ClientPage";

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

const Page = async () => {
  return <ClientPage />;
};

export default Page;
