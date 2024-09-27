import React from 'react';
import ClientPage from '@/app/profile/[slug]/ClientPage';
import {cookies} from "next/headers";

export async function generateMetadata({params}: { params: { slug: string } }) {
    const token = cookies().get('access_token')?.value;

    const headers: HeadersInit = token ? {"Authorization": `${token}`} : {};

    const response = await fetch(`https://journal2.nordicun.uz/article/user/slug/${params.slug}`, {
        headers
    });
    if (!response.ok) {
        return {
            title: "Default Title",
            description: "Default Description",
            keywords: "Default Keywords",
        };
    }

    const data = await response.json();
    return {
        title: data.title || "Default Title",
        description: data.abstract || data.description || "Default Description",
        openGraph: {
            title: data.title || "Default Title",
            description: data.description || "Default Description",
            url: `https://journal2.nordicun.uz/article/user/slug/${params.slug}`,
            type: 'article',
            images: [
                {
                    url: `https://journal2.nordicun.uz${data.image?.file_path}`,
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
            images: [`https://journal2.nordicun.uz${data.image?.file_path}`],
        },
        alternates: {
            canonical: `https://journal2.nordicun.uz/article/user/slug/${params.slug}`,
        },
        other: {
            'citation_title': data.title || "Default Title",
            'citation_author': data.author?.full_name || "Unknown Author",
            'citation_publication_date': data.publish_date?.split("T")[0] || "Unknown Date",
            'citation_journal_title': "Nordic Journal",
            'citation_pdf_url': `https://journal2.nordicun.uz${data.file?.file_path}` || '',
        },
    };
}


const ArticleDetail = async ({params}: { params: { slug: string } }) => {
    const token = cookies().get('access_token')?.value;
    const headers: HeadersInit = token ? {"Authorization": `${token}`} : {};

    const response = await fetch(`https://journal2.nordicun.uz/article/user/slug/${params.slug}`, {
        headers
    });

    const data = await response.json();

    return <ClientPage data={data}/>;
};
export default ArticleDetail;
