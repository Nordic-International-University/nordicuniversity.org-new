import React from "react";
import ClientPage from "@/app/[lang]/research/doctorate/ClientPage";
import {
  getAllDoctorate,
  getAllDoctorateCount,
} from "@/app/[lang]/research/doctorate/doctorate.api";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Nordik Xalqaro Universiteti - Doktorantura",
    description:
      "Nordik Xalqaro Universitetining doktorantura dasturlari haqida batafsil ma'lumot. Ilmiy izlanishlar va akademik rivojlanish uchun imkoniyatlar.",
    lang: params.lang,
    path: "/research/doctorate",
  });
}

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
