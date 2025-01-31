import React from "react";
import ClientPage from "@/app/[lang]/education/level/ClientPage";
import { EducationLevels } from "@/types/education/educaation.types";

export const metadata = {
  title: "Ta'lim darajalari - Xalqaro Nordik Universiteti",
  description:
    "Xalqaro Nordik Universitetida Bakalavr, Magistratura va Doktorantura bosqichlari bo‘yicha ta’lim dasturlari haqida to‘liq ma’lumot. Fakultetlar, kafedralar va departamentlarning o‘ziga xos afzalliklari va yo‘nalishlari bilan tanishing.",
  keywords: [
    "Ta'lim darajalari",
    "Bakalavr yo‘nalishlari",
    "Magistratura dasturlari",
    "Doktorantura fakultetlari",
    "Xalqaro Nordik Universiteti",
    "Kunduzgi ta'lim",
    "Sirtqi ta'lim",
    "Maxsus sirtqi dasturlar",
    "Fakultetlar",
    "Kafedralar",
    "Departamentlar",
    "Universitet yo‘nalishlari",
    "Akademik bosqichlar",
    "Oliy ta'lim",
    "Ta'limning afzalliklari",
    "Talab darajasidagi yo‘nalishlar",
    "O‘quv dasturlari",
    "Akademik rivojlanish",
    "Innovatsion ta'lim",
    "Bakalavr kunduzgi dastur",
    "Magistratura sirtqi dastur",
    "Doktorantura ilmiy dastur",
    "Xalqaro ta'lim tizimi",
    "Professional ta'lim",
    "O‘quv rejalar",
  ],
  openGraph: {
    title: "Ta'lim darajalari - Xalqaro Nordik Universiteti",
    description:
      "Xalqaro Nordik Universitetida Bakalavr, Magistratura va Doktorantura bosqichlari bo‘yicha ta’lim dasturlari haqida to‘liq ma’lumot. Fakultetlar, kafedralar va departamentlarning o‘ziga xos afzalliklari va yo‘nalishlari bilan tanishing.",
    url: "https://nordicuniversity.org/education/level",
    type: "website",
  },
};

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
