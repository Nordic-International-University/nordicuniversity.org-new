import React from "react";
import ClientPage from "@/app/article/[slug]/ClientPage";
import Script from "next/script";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/article/user/slug/${params.slug}`,
  );
  const data = await response.json();
  const fileUrl = data.file?.file_path
    ? `${process.env.NEXT_PUBLIC_API_URL}${data?.file?.file_path}`
    : "";
  const imageUrl = data.image?.file_path
    ? `${process.env.NEXT_PUBLIC_API_URL}${data?.image?.file_path}`
    : "/public/noUser.webp";

  if (!response.ok) {
    return {
      title: "Default Title",
      description: "Default Description",
      keywords: "Default Keywords",
      openGraph: {
        title: "Default Title",
        description: "Default Description",
        url: `${process.env.NEXT_PUBLIC_API_URL}/article/${params.slug}`,
        type: "article",
        images: [
          {
            url: "https://default-image-path.png",
            width: 800,
            height: 600,
            alt: "Default Image",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Default Title",
        description: "Default Description",
        images: ["https://default-image-path.png"],
      },
      other: {
        citation_title: "Default Title",
        citation_author: "Unknown Author",
        citation_publication_date: "Unknown Date",
        citation_issn: "3030-3400",
        citation_journal_title: "Nordic Journal",
        citation_pdf_url: fileUrl,
        "DC.title": "Default Title",
        "DC.creator": "Unknown Author",
        "DC.subject": "Research, Article",
        "DC.description": "No description",
        "DC.publisher": "Nordic University",
        "DC.contributor": "No coAuthors",
        "DC.date": "Unknown Date",
        "DC.type": "Text",
        "DC.format": "text/html",
        "DC.identifier": `${process.env.NEXT_PUBLIC_API_URL}/article/${params.slug}`,
        "DC.language": "uz",
        "DC.coverage": "Global",
        "DC.Identifier.ISSN": "3030-3400",
        "DC.rights": "Public Domain",
      },
    };
  }

  return {
    title: data.title || "Default Title",
    description: data.abstract || data.description || "Default Description",
    keywords: data.keyword || "article, research, journal",
    openGraph: {
      title: data.title || "Default Title",
      description: data.description || "Default Description",
      url: `${process.env["NEXT_PUBLIC_SITE_URL"]}/article/${params.slug}`,
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: data.title || "Article Image",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data.title || "Default Title",
      description: data.description || "Default Description",
      images: [imageUrl],
    },
    other: {
      author: data.author?.full_name || "Unknown Author",
      citation_title: data.title || "Default Title",
      citation_author: data.author?.full_name || "Unknown Author",
      citation_publication_date:
        data.publish_date?.split("T")[0] || "Unknown Date",
      citation_pdf_url: fileUrl,
      citation_journal_title: "Nordik ilmiy-amaliy elektron jurnali",
      citation_journal_abbrev: "NJ",
      citation_issn: "3030-3400",
      "DC.title": data.title || "Default Title",
      "DC.creator": data.author?.full_name || "Unknown Author",
      "DC.subject": data.keyword || "Research, Article",
      "DC.description": data.abstract || data.description || "No description",
      "DC.publisher": "Nordik ilmiy-amaliy elektron jurnali",
      "DC.contributor":
        data.coAuthors?.map((author: any) => author.full_name).join(", ") ||
        "No coAuthors",
      "DC.date": data.publish_date?.split("T")[0] || "Unknown Date",
      "DC.type": "Text",
      "DC.format": "text/html",
      "DC.identifier": data?.doi
        ? data.doi
        : `${process.env.NEXT_PUBLIC_API_URL}/article/${params.slug}`,
      "DC.language": "uz",
      "DC.coverage": "Global",
      "DC.Identifier.ISSN": "3030-3400",
      "DC.rights": "All Rights Reserved",
    },
  };
}

const ArticleDetail = async ({ params }: { params: { slug: string } }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/article/user/slug/${params.slug}`,
    {
      cache: "no-cache",
    },
  );
  const data = await response.json();

  return (
    <>
      <ClientPage data={data} />
    </>
  );
};

export default ArticleDetail;
