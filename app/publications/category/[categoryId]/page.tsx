import React from "react";
import BigArticlesCard from "@/app/components/Cards/BigArticlesCard";
import RoundedSvg from "@/app/components/helpers/RoundeSvg";

const PublicationPage = async ({
                                   params,
                               }: {
    params: { categoryId: string };
}) => {
    const res = await fetch(
        `https://journal2.nordicun.uz/article/user/category/${params.categoryId}`,
        {
            cache: "no-cache",
        }
    );

    if (!res.ok) {
        return <div>Error loading data</div>;
    }

    const categoryData = await res.json();

    return (
        <div className="container">
            <RoundedSvg title={categoryData[0]?.category?.name}/>

            <div className="grid grid-cols-4 gap-4 mt-6 max-sm:grid-cols-1 max-lg:grid-cols-2">
                {categoryData?.map((article: any, index: number) => (
                    <BigArticlesCard
                        key={index}
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
