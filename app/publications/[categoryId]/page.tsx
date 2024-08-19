"use client"

import React, {useEffect} from 'react';
import {useGetByCategoryQuery} from "@/lib/query/article.query";
import ArticleCard from "@/app/components/Cards/ArticleCard";
import BigArticlesCard from "@/app/components/Cards/BigArticlesCard";

const Page = ({params}:{params:any}) => {
const {data}=useGetByCategoryQuery(params.categoryId);

    return (
        <section className="container">
            <div className="grid grid-cols-4 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4">
                {data?.map((article: any, index: number) => (

                    <BigArticlesCard
                        title={article.title}
                        slug={article.slug}
                        date={article.createdAt}
                        category={article.category.name}
                        description={article.description}
                        author={article.author.full_name}
                        imageUrl={article.image.file_path}/>

                ))}

            </div>
        </section>
    );
};

export default Page;