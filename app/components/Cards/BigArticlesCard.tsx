"use client"

import React from "react";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";
import {useState} from "react";

interface SmallCardProps {
    title: string;
    date: string;
    category: string;
    description: string;
    slug: string;
    author: string;
    imageUrl: string;
}

const BigArticlesCard = ({
                             title,
                             date,
                             category,
                             description,
                             author,
                             slug,
                             imageUrl,
                         }: SmallCardProps) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <Link href={`/article/${slug}`} prefetch={false}>
            <div
                className="w-full flex-col bg-[#f2f3f7] rounded-md p-1 min-h-[150px]
        overflow-hidden shadow-[5px_5px_10px_0px_#D2DCE9CC] hover:shadow-[1px_3px_10px_0px_#5B99C2]
        transition-shadow"
            >
                <div className="relative w-full h-[220px]">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`}
                        alt={title}
                        className={`w-full object-cover rounded-md  h-full transition-all duration-1000 ${
                            isLoaded ? 'blur-0' : 'blur-md'
                        }`}
                        width={330}
                        height={200}
                        onLoad={() => setIsLoaded(true)}
                    />
                </div>
                <div className="ml-2 py-2 px-2">
                    <div className="flex justify-between items-center">
                        <p className="border-[2px] rounded p-0.5 text-[9px] text-[#478CCF] font-bold">
                            {category}
                        </p>
                    </div>
                    <p className="font-semibold text-[13px] mt-2 text-green-950 h-[70px]">
                        {title}
                    </p>
                    <div className="flex justify-between items-center">
                        <p className="text-[11px] text-[#478CCF] font-bold">{author}</p>
                        <p className="text-[11px] text-[#478CCF] font-bold">
                            {moment(date).utc().format("YYYY-MM-DD")}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BigArticlesCard;
