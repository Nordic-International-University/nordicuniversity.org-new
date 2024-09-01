import React from 'react';
import ClientPage from '@/app/article/[slug]/ClientPage';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const response = await fetch(
      `https://journal2.nordicun.uz/article/user/slug/${params.slug}`
  );

  if (!response.ok) {
    return {
      title: "Default Title",
      description: "Default Description",
    };
  }

  const data = await response.json();

  return {
    title: data?.title || "Default Title",
    description: data?.description || "Default Description",
  };
}

const ArticleDetail = async ({ params }: { params: { slug: string } }) => {
  const response = await fetch(
      `https://journal2.nordicun.uz/article/user/slug/${params.slug}`
  );

  if (!response.ok) {
    return <div>Article not found</div>;
  }

  const data = await response.json();

  return <ClientPage data={data} />;
};

export default ArticleDetail;
