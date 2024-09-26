import React from 'react';
import ClientPage from '@/app/article/[slug]/ClientPage';

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const response = await fetch(`https://journal2.nordicun.uz/article/user/slug/${params.slug}`);

    if (!response.ok) {
        return {
            title: "Default Title",
            description: "Default Description",
            keywords: "Default Keywords",
        };
    }

    const data = await response.json();
    const fileUrl = data.file?.file_path ? `https://journal2.nordicun.uz${data.file.file_path}` : '';
    const imageUrl = data.image?.file_path ? `https://journal2.nordicun.uz${data.image.file_path}` : 'https://default-image-path.png';

    return {
        title: data.title || "Default Title",
        description: data.abstract || data.description || "Default Description",
        keywords: data.keyword || "article, research, journal",
        openGraph: {
            title: data.title || "Default Title",
            description: data.description || "Default Description",
            url: `https://journal2.nordicun.uz/article/user/slug/${params.slug}`,
            type: 'article',
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
            card: 'summary_large_image',
            title: data.title || "Default Title",
            description: data.description || "Default Description",
            images: [imageUrl],
        },
        alternates: {
            canonical: `https://journal2.nordicun.uz/article/user/slug/${params.slug}`,
        },
        other: {
            'citation_title': data.title || "Default Title",
            'citation_author': data.author?.full_name || "Unknown Author",
            'citation_publication_date': data.publish_date?.split("T")[0] || "Unknown Date",
            'citation_journal_title': "Nordic Journal",
            'citation_pdf_url': fileUrl,
            'DC.title': data.title || "Default Title",
            'DC.creator': data.author?.full_name || "Unknown Author",
            'DC.subject': data.keyword || "Research, Article",
            'DC.description': data.abstract || data.description || "No description",
            'DC.publisher': "Nordic University",
            'DC.contributor': data.coAuthors?.map((author:any) => author.full_name).join(", ") || "No coAuthors",
            'DC.date': data.publish_date?.split("T")[0] || "Unknown Date",
            'DC.type': "Text",
            'DC.format': "text/html",
            'DC.identifier': `https://journal2.nordicun.uz/article/user/slug/${params.slug}`,
            'DC.language': "uz",
            'DC.coverage': "Global",
            'DC.rights': "Public Domain",
        },
    };
}


const ArticleDetail = async ({ params }: { params: { slug: string } }) => {
    const response = await fetch(`https://journal2.nordicun.uz/article/user/slug/${params.slug}`);
    const data = await response.json(); 

    return <ClientPage data={data} />;
};

export default ArticleDetail;
