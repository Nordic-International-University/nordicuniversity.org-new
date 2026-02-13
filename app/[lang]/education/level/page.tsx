import React from "react";
import ClientPage from "@/app/[lang]/education/level/ClientPage";
import { EducationLevels } from "@/types/education/educaation.types";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Ta'lim darajalari - Xalqaro Nordik Universiteti",
    description:
      "Xalqaro Nordik Universitetida Bakalavr, Magistratura va Doktorantura bosqichlari bo'yicha ta'lim dasturlari haqida to'liq ma'lumot. Fakultetlar, kafedralar va departamentlarning o'ziga xos afzalliklari va yo'nalishlari bilan tanishing.",
    lang: params.lang,
    path: "/education/level",
  });
}

const getAllFieldCount = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/core/fields-count`,
    );
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

const Page = async () => {
  const fieldCount: EducationLevels = await getAllFieldCount();

  return <ClientPage data={fieldCount} />;
};

export default Page;
