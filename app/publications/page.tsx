import React from "react";
import PublicationsClient from "./PublicationsClient";

async function getVolume() {
  const res = await fetch("https://journal2.nordicun.uz/volume");
  const data = await res.json();
  return data;
}

async function fetchCategoriesWithArticles() {
  const resCategories = await fetch("https://journal2.nordicun.uz/category");
  if (!resCategories.ok) {
    throw new Error("Failed to fetch categories");
  }
  const categories = await resCategories.json();

  const categoriesWithArticles = await Promise.all(
      categories?.map(async (category: any) => {
        const resArticles = await fetch(
            `https://journal2.nordicun.uz/article/user/category/${category.id}`
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

const PublicationsServer = async () => {
  const data = await fetchCategoriesWithArticles();
  const volume = await getVolume();

  return <PublicationsClient data={data} volume={volume} />;
};

export default PublicationsServer;
