import React from "react";
import ClientPage from "@/app/[lang]/students/work-and-travel/ClientPage";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Work and Travel jarayoni - Xalqaro Nordik Universiteti",
    description:
      "Xalqaro Nordik Universiteti talabalari uchun Work and Travel dasturi haqida ma'lumot. Finlandiya kabi ilg'or mamlakatlarda o'qish va ishlash imkoniyatlari, amaliy tajriba va kasbiy ko'nikmalarni oshirish.",
    lang: params.lang,
    path: "/students/work-and-travel",
  });
}

const Page = async () => {
  return <ClientPage />;
};

export default Page;
