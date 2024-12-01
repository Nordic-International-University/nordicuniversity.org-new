import React from "react";
import ClientPage from "@/app/[lang]/students/work-and-travel/ClientPage";

export const metadata = {
  title: "Work and Travel jarayoni - Xalqaro Nordik Universiteti",
  description:
    "Xalqaro Nordik Universiteti talabalari uchun Work and Travel dasturi haqida ma'lumot. Finlandiya kabi ilg'or mamlakatlarda o'qish va ishlash imkoniyatlari, amaliy tajriba va kasbiy ko'nikmalarni oshirish.",
  keywords: [
    "Work and Travel",
    "Work and Travel jarayoni",
    "Xalqaro Nordik Universiteti",
    "Finlandiya talabalari",
    "O'qish va ishlash",
    "Amaliy tajriba",
    "Kasbiy ko'nikmalar",
    "Yevropa tajribasi",
    "Dunyogarashni boyitish",
    "Talabalar uchun Work and Travel",
    "Finlandiyada o'qish",
    "Talabalar uchun imkoniyatlar",
    "Ilg'or mamlakatlarda ishlash",
    "Work and Travel dasturi",
    "Kasb-hunarni oshirish",
  ],
  openGraph: {
    title: "Work and Travel jarayoni - Xalqaro Nordik Universiteti",
    description:
      "Xalqaro Nordik Universiteti talabalari uchun Work and Travel dasturi haqida ma'lumot. Finlandiya kabi ilg'or mamlakatlarda o'qish va ishlash imkoniyatlari, amaliy tajriba va kasbiy ko'nikmalarni oshirish.",
    url: "https://nordicuniversity.org/students/work-and-travel",
    type: "website",
  },
};

const Page = async () => {
  return <ClientPage />;
};

export default Page;
