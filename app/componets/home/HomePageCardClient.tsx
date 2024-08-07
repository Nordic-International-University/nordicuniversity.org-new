"use client"
import React, {useEffect} from 'react';
import ArticleCard from "@/app/componets/Cards/ArticleCard";

const HomePageCardClient = ({ data }: { data: any }) => {
    useEffect(() => {
        console.log(data);
    }, []);
    return (
        <div>
            <div className="grid grid-cols-3 gap-20">
                {data?.articles?.map((article: any, index: number) => (
                    <div key={index}>
                        <ArticleCard
                            title={article.title}
                            date={article.createdAt}
                            category={article.category.name}
                            description={article.description}
                            author={article.author.full_name}
                            imageUrl={article.image.file_path}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePageCardClient;