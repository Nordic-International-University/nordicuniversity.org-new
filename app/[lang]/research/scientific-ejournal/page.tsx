import React from "react";
import ClientPage from "@/app/[lang]/research/scientific-ejournal/ClientPage";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Ilmiy elektron jurnal - Xalqaro Nordik Universiteti",
    description:
      "“Nordic” ilmiy-amaliy elektron jurnali Xalqaro Nordik Universiteti tomonidan chop etiladi. Jurnal o‘zbek, rus, ingliz va fin tillarida maqolalarni nashr etib, zamonaviy ilmiy tadqiqotlarning natijalarini e’lon qilish va ilmiy nufuzni oshirishga xizmat qiladi. Bir yilda 5 ta son nashr etiladi va ISSN-3030-3400 raqami orqali standart talablariga mos keladi.",
    lang: params.lang,
    path: "/research/scientific-ejournal",
  });
}

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
