import React from "react";
import ClientPage from "@/app/[lang]/research/scientific-ejournal/ClientPage";

export const metadata = {
  title: "Ilmiy elektron jurnal - Xalqaro Nordik Universiteti",
  description:
    "“Nordic” ilmiy-amaliy elektron jurnali Xalqaro Nordik Universiteti tomonidan chop etiladi. Jurnal o‘zbek, rus, ingliz va fin tillarida maqolalarni nashr etib, zamonaviy ilmiy tadqiqotlarning natijalarini e’lon qilish va ilmiy nufuzni oshirishga xizmat qiladi. Bir yilda 5 ta son nashr etiladi va ISSN-3030-3400 raqami orqali standart talablariga mos keladi.",
  keywords: [
    "Ilmiy elektron jurnal",
    "Nordic ilmiy jurnali",
    "ISSN 3030-3400",
    "Ilmiy maqolalar",
    "Elektron jurnal",
    "Xalqaro Nordik Universiteti",
    "Ilmiy tadqiqotlar",
    "Innovatsion tadqiqotlar",
    "Ilmiy maqola nashri",
    "O‘zbekiston jurnali",
    "O‘zbek, rus, ingliz, fin tillarida maqolalar",
    "Professor-o‘qituvchilar tadqiqotlari",
    "Talabalar uchun ilmiy resurslar",
    "Maqolalar topshirish",
    "Elektron nashr",
  ],
  openGraph: {
    title: "Ilmiy elektron jurnal - Xalqaro Nordik Universiteti",
    description:
      "“Nordic” ilmiy-amaliy elektron jurnali Xalqaro Nordik Universiteti tomonidan chop etiladi. Jurnal o‘zbek, rus, ingliz va fin tillarida maqolalarni nashr etib, zamonaviy ilmiy tadqiqotlarning natijalarini e’lon qilish va ilmiy nufuzni oshirishga xizmat qiladi. Bir yilda 5 ta son nashr etiladi va ISSN-3030-3400 raqami orqali standart talablariga mos keladi.",
    url: "https://nordicuniversity.org/research/scientific-ejournal",
    type: "website",
    images: [
      {
        url: "/public/images/research-images/journal.ppg",
        alt: "Ilmiy elektron jurnal sahifasi",
      },
    ],
  },
};

const getAllVolumes = async () => {
  try {
    const response = await fetch(
      `${process.env["NEXT_PUBLIC_URL_JOURNAL"]}/volume`,
      {
        next: { revalidate: 60 },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch volumes: ${response.statusText}`);
    }

    const json = await response.json();
    return json || [];
  } catch (error) {
    console.error("Error fetching volumes:", error);
    return [];
  }
};

const Page = async () => {
  const volumes = await getAllVolumes();
  return <ClientPage data={volumes} />;
};

export default Page;
