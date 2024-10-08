import React from "react";
import VolumeClient from "@/app/volumes/[data]/VolumeClient";

async function getCategory() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`);
  const data = await res.json();

  return data;
}

export const metadata = {
  title: "Asosiy Yo'nalishlar - Kategoriyalar",
  description:
    "O'zbekistondagi asosiy yo'nalishlar bo'yicha nashrlar va kategoriyalar. Har bir yo'nalishda mavjud bo'lgan kitoblar, maqolalar va ilmiy ishlarni o'rganing.",
  keywords:
    "ilmiy nashrlar, kategoriyalar, o'zbek nashrlari, yo'nalishlar, ilmiy ishlar, maqolalar",
  openGraph: {
    title: "Asosiy Yo'nalishlar - Nashrlar va Kategoriyalar",
    description:
      "O'zbekistondagi asosiy yo'nalishlar bo'yicha nashrlar va kategoriyalar haqida ma'lumot oling.",
    images: [
      {
        url: `/public/category.jpg`,
        width: 1200,
        height: 630,
        alt: "Asosiy Yo'nalishlar - Nashrlar va Kategoriyalar",
        type: "image/jpeg",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asosiy Yo'nalishlar - Nashrlar va Kategoriyalar",
    description:
      "O'zbekistondagi asosiy yo'nalishlar bo'yicha nashrlar va kategoriyalar haqida ma'lumot oling.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_API_URL}/category.jpg`,
        width: 1200,
        height: 630,
        alt: "Asosiy Yo'nalishlar - Nashrlar va Kategoriyalar",
        type: "image/jpeg",
      },
    ],
  },
};

const Page = async () => {
  const data = await getCategory();
  return (
    <div>
      <VolumeClient data={data} />
    </div>
  );
};

export default Page;
