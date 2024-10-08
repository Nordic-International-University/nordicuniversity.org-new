import React from "react";
import AboutCLient from "@/app/about/aboutCLient";

export const metadata = {
  title: "“Nordic” Ilmiy-amaliy Elektron Jurnali - Tahririyat Hayati",
  description:
    "Nordic xalqaro universiteti tomonidan nashr etiladigan ilmiy-amaliy elektron jurnalda maqolalar o‘zbek tilida e'lon qilinadi. Jurnal tahririyat hayati, asosiy maqsadlari va ISSN raqami haqida ko'proq ma'lumot oling.",
  keywords:
    "Nordic universiteti, ilmiy jurnal, tahririyat hayati, ilmiy maqolalar, o‘zbek tili, rus tili, ingliz tili, fin tili",
  openGraph: {
    title: "“Nordic” Ilmiy-amaliy Elektron Jurnali - Tahririyat Hayati",
    description:
      "Nordic xalqaro universiteti tomonidan nashr etiladigan ilmiy-amaliy elektron jurnal haqida ma'lumot oling. Bu yerda tahririyat hayati, maqolalar va nashr etilish sanalari haqida batafsil ma'lumot mavjud.",
    type: "website",
    url: `${process.env["NEXT_PUBLIC_SITE_URL"]}/about`,
    images: [
      {
        url: "/public/abstrakt.d8a2d89523158d92ef74.jpg",
        width: 800,
        height: 600,
        alt: "Nordik jurnal rasmiy veb sahifasi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "“Nordic” Ilmiy-amaliy Elektron Jurnali - Tahririyat Hayati",
    description:
      "Nordic xalqaro universiteti ilmiy-amaliy elektron jurnali haqida ma'lumot oling.",
    images: [
      {
        url: "/public/abstrakt.d8a2d89523158d92ef74.jpg",
        width: 800,
        height: 600,
        alt: "Nordik jurnal rasmiy veb sahifasi",
      },
    ],
  },
};

const Page = () => {
  return <AboutCLient />;
};

export default Page;
