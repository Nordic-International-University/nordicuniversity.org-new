import React from "react";
import BigArticlesCard from "@/app/components/Cards/BigArticlesCard";
import { redirect } from "next/navigation";
import RoundedSvg from "@/app/components/helpers/RoundeSvg";

export async function generateMetadata({
  params,
}: {
  params: { volumeId: string };
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/volume/${params.volumeId}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch volume data: ${res.status}`);
  }

  const volumeData = await res.json();
  const articleCount = volumeData.length;

  return {
    title: `Nashr - ${volumeData?.title}`,
    description: `Nashrning tafsilotlari: ${volumeData?.description}`,
    keywords: `${volumeData?.title}, nashr, ${articleCount} ta maqola`,
    openGraph: {
      title: `Nashr - ${volumeData?.title}`,
      description: volumeData?.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/publications/volume/${params.volumeId}`,
      type: "article",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_API_URL}${volumeData?.image?.file_path}`,
          width: 1200,
          height: 630,
          alt: volumeData?.title || "Nashr rasm",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Nashr - ${volumeData?.title}`,
      description: volumeData?.description,
    },
  };
}

async function fetchVolumeAndArticles(volumeId: string) {
  try {
    const articleRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/article/user/volume/${volumeId}`,
      { next: { revalidate: 1000 } },
    );

    if (!articleRes.ok) {
      console.error(`Failed to fetch articles: ${articleRes.status}`);
      return { articles: null, volume: null };
    }

    const articles = await articleRes.json();

    if (!articles || articles.length === 0) {
      return { articles: null, volume: null };
    }

    const volumeRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/volume/${volumeId}`,
      { cache: "no-store" },
    );

    if (!volumeRes.ok) {
      console.error(`Failed to fetch volume data: ${volumeRes.status}`);
      return { articles: null, volume: null };
    }

    const volume = await volumeRes.json();

    return { articles, volume };
  } catch (error) {
    console.error("Error fetching volume and articles:", error);
    return { articles: null, volume: null };
  }
}

const PublicationPage = async ({
  params,
}: {
  params: { volumeId: string };
}) => {
  const { articles: categoryData, volume: volumeData } =
    await fetchVolumeAndArticles(params.volumeId);

  if (!categoryData || categoryData.length === 0) {
    redirect("/publications/empty");
    return null;
  }

  return (
    <div className="container">
      <RoundedSvg title={volumeData?.title} />
      <div className="grid grid-cols-4 gap-4 mt-3 max-sm:grid-cols-1 max-lg:grid-cols-2">
        {categoryData?.map((article: any, index: number) => (
          <BigArticlesCard
            views={article.viewsCount}
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
