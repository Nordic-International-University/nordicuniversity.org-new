import React from "react";
import BigArticlesCard from "@/app/components/Cards/BigArticlesCard";
import { redirect } from "next/navigation";
import RoundedSvg from "@/app/components/helpers/RoundeSvg";

export async function generateMetadata({ params }: { params: { volumeId: string } }) {
  const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/volume/${params.volumeId}`,
      {
        cache: "no-store",
      }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch volume data: ${res.status}`);
  }

  const volumeData = await res.json();
  const articleCount = volumeData.length;

  return {
    title: `Nashr - ${volumeData?.title}`,
    description: `Nashrning tafsilotlari: ${volumeData[0]?.description}`,
    keywords: `${volumeData[0]?.title}, nashr, maqola, ${volumeData[0]?.category.name}, ${articleCount} ta maqola`,
    openGraph: {
      title: `Nashr - ${volumeData[0]?.title}`,
      description: volumeData[0]?.description,
      url: `${process.env.NEXT_PUBLIC_API_URL}/publications/volume/${params.volumeId}`,
      type: "article",
      images: [`${process.env.NEXT_PUBLIC_API_URL}${volumeData[0]?.image?.file_path}`],
    },
    twitter: {
      card: "summary_large_image",
      title: `Nashr - ${volumeData[0]?.title}`,
      description: volumeData[0]?.description
    },
  };
}


export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch categories: ${res.status}`);
  }

  const categories = await res.json();

  return categories?.map((category: any) => ({
    categoryId: category.id.toString(),
  }));
}

const PublicationPage = async ({
  params,
}: {
  params: { volumeId: string };
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/article/user/volume/${params.volumeId}`,
    {
      next: { revalidate: 1000 },
    },
  );

  if (!res.ok) {
    return <div>Error loading data</div>;
  }

  const categoryData = await res.json();

  if (!categoryData || categoryData.length === 0) {
    redirect("/publications/empty");
    return null;
  }

  const volume = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/volume/${params.volumeId}`,
      {
        cache: "no-store",
      }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch volume data: ${res.status}`);
  }

  const volumeData = await volume.json();


  return (
    <div className="container">
      <RoundedSvg title={volumeData?.title} />
      <div className="grid grid-cols-4 gap-4 mt-3 max-sm:grid-cols-1 max-lg:grid-cols-2">
        {categoryData?.map((article: any, index: number) => (
          <BigArticlesCard
            key={index}
            title={article.title}
            date={article.createdAt}
            slug={article.slug}
            category={article.category.name}
            description={article.description}
            author={article.author.full_name}
            imageUrl={article.image?.file_path || ""}
          />
        ))}
      </div>
    </div>
  );
};

export default PublicationPage;
