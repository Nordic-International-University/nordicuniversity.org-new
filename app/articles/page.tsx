import React from "react";
import BigArticlesCard from "@/app/components/Cards/BigArticlesCard";
import RoundedSvg from "@/app/components/helpers/RoundeSvg";

const getAllArticles = async () => {
  const response = await fetch(`${process.env.BASE_URL}/article`, {
    cache: "no-store",
  });
  return response.json();
};

const Page = async () => {
  const articles = await getAllArticles();

  return (
    <section className="container">
      <div className="mt-4 mb-4">
        <RoundedSvg title="Maqolalar" />
      </div>
      <div className="grid grid-cols-4 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4">
        {articles.map((article: any, index: number) => (
          <BigArticlesCard
            key={index}
            title={article.title}
            date={article.publishedDate}
            category={article.category.name}
            description={article.description}
            slug={article.slug}
            author={article.author.full_name}
            imageUrl={article.image.file_path}
          />
        ))}
      </div>
    </section>
  );
};

export default Page;
