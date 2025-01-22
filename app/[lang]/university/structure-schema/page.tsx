import React from "react";
import StructureSchema from "@/app/components/templates/university/structure.schema";
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

const getAllStructuresTree = async (lang: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/university/org-structures/tree?language=uz`,
    );
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

const Page = async () => {
  const data = await getAllStructuresTree(await getCurrentLangServer());
  console.log(data);
  return <StructureSchema data={data} />;
};

export default Page;
