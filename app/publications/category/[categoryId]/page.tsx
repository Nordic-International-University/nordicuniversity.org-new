import React from "react";
import BigArticlesCard from "@/app/components/Cards/BigArticlesCard";
import RoundedSvg from "@/app/components/helpers/RoundeSvg";

export async function generateStaticParams() {
  const backend_url = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${backend_url}/category`);
  if (!res.ok) {
    throw new Error("Failed to fetch category IDs");
  }

  const categories = await res.json();

  return categories.map((category: { id: number }) => ({
    categoryId: String(category.id),
  }));
}

export const generateMetadata = async ({
  params,
}: {
  params: { categoryId: string };
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/article/user/category/${params.categoryId}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch category data");
  }

  const categoryData = await res.json();
  const categoryName = categoryData[0]?.category?.name || "Maqolalar";

  return {
    title: `${categoryName} | yo'nalishi`,
    description: `Bu sahifada ${categoryName} kategoriya ostidagi maqolalarni topishingiz mumkin.`,
    keywords: `maqolalar, ${categoryName}, ilmiy maqolalar, nashrlar`,
    openGraph: {
      title: `${categoryName} | Nashrlar`,
      description: `Maqolalar to'plami ${categoryName} kategoriya ostida.`,
      type: "article",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/publications/category/${params.categoryId}`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}${categoryData?.image?.file_path}`,
          width: 800,
          height: 600,
          alt: "Nordic Jurnali",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryName} | Nashrlar`,
      description: `Maqolalar to'plami ${categoryName} kategoriya ostida.`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}${categoryData?.image?.file_path}`,
          width: 800,
          height: 600,
          alt: "Nordic Jurnali",
        },
      ],
    },
  };
};

const PublicationPage = async ({
  params,
}: {
  params: { categoryId: string };
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/article/user/category/${params.categoryId}`,
    {
      cache: "no-cache",
    },
  );

  if (!res.ok) {
    return <div>Error loading data</div>;
  }

  const categoryData = await res.json();

  return (
    <div className="container">
      <RoundedSvg title={categoryData[0]?.category?.name} />

      <div className="grid grid-cols-4 gap-4 mt-6 max-sm:grid-cols-1 max-lg:grid-cols-2">
        {categoryData?.map((article: any, index: number) => (
          <BigArticlesCard
            key={index}
            views={article.viewsCount}
            title={article.title}
            date={article.createdAt}
            slug={article.slug}
            category={article.category.name}
            description={article.description}
            author={article.author.full_name}
            imageUrl={article?.image?.file_path || ""}
          />
        ))}
      </div>
    </div>
  );
};

export default PublicationPage;
