import React from "react";
import PublicationsClient from "./PublicationsClient";

async function getVolume() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/volume`);
  const data = await res.json();
  return data;
}

async function fetchCategoriesWithArticles() {
  const resCategories = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`);
  if (!resCategories.ok) {
    throw new Error("Failed to fetch categories");
  }
  const categories = await resCategories.json();

  const categoriesWithArticles = await Promise.all(
      categories?.map(async (category: any) => {
        const resArticles = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/article/user/category/${category.id}`
        );
        const articles = await resArticles.json();
        return {
          ...category,
          articlesCount: articles.length,
        };
      })
  );

  return categoriesWithArticles;
}

export const metadata = {
    title: "Nashrlar | Ilmiy Maqolalar",
    description: "Nashrlar sahifasida ilmiy maqolalarning barcha nashrlarini topishingiz mumkin. Har bir nashr o'z vaqtida chop etilgan va yuklab olish uchun taqdim etilgan.",
    keywords: "ilmiy maqolalar, nashrlar, yuklab olish, ilm-fan, tahlil, tadqiqot",
    openGraph: {
        title: "Nashrlar | Ilmiy Maqolalar",
        description: "Ilmiy maqolalarning nashrlari va yuklab olish imkoniyati. Eng so'nggi ilmiy tadqiqotlarni kashf qiling.",
        type: "website",
        url: "https://sizning-saytingiz.com/publications",
        images: [
            {
                url: "/public/journal2.webp",
                width: 800,
                height: 600,
                alt: "Nordic Jurnali",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Nashrlar | Ilmiy Maqolalar",
        description: "Nashrlar sahifasida ilmiy maqolalarning barcha nashrlarini yuklab olish imkoniyati mavjud.",
        images: [
            {
                url: "/public/journal2.webp",
                width: 800,
                height: 600,
                alt: "Nordic Jurnali",
            },
        ],
    }
};


const PublicationsServer = async () => {
  const data = await fetchCategoriesWithArticles();
  const volume = await getVolume();

  return <PublicationsClient data={data} volume={volume} />;
};

export default PublicationsServer;
