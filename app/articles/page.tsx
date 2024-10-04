import React from "react";
import BigArticlesCard from "@/app/components/Cards/BigArticlesCard";
import RoundedSvg from "@/app/components/helpers/RoundeSvg";

const getAllArticles = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article`, {
            cache: "no-cache",
        });
        if (!response.ok) {
            throw new Error("Failed to fetch articles");
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching articles:", error);
        return [];
    }
};

export const revalidate = 60;

const Page = async () => {
    const articles = await getAllArticles();

    if (!articles || articles.length === 0) {
        return (
            <section className="container">
                <div className="mt-4 mb-4">
                    <RoundedSvg title="Maqolalar"/>
                </div>
                <p>Maqolalar topilmadi.</p>
            </section>
        );
    }

    return (
        <section className="container">
            <div className="mt-4 mb-4">
                <RoundedSvg title="Maqolalar"/>
            </div>
            <div className="grid grid-cols-4 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4">
                {articles?.map((article: any, index: number) => (
                    <BigArticlesCard
                        key={index}
                        title={article?.title}
                        date={article?.publishedDate}
                        category={article?.category.name}
                        description={article?.description}
                        slug={article?.slug}
                        author={article?.author?.full_name}
                        imageUrl={article?.image?.file_path || ""}
                    />
                ))}
            </div>
        </section>
    );
};

export default Page;
