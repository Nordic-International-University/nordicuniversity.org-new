import React from 'react';
import Image from "next/image";

interface SmallCardProps {
    title: string;
    date: string;
    category: string;
    description: string;
    author: string;
    imageUrl: string;
}

const ArticleCard = ({
                         title,
                         date,
                         category,
                         description,
                         author,
                         imageUrl,
                     }:SmallCardProps) => {
    return (
        <div>
            <div className="w-[367px] flex  bg-[#D2DCE9CC] rounded-2xl p-4">
                <Image
                    src={`https://journal2.nordicun.uz${imageUrl}`}
                    alt={title}
                    className="object-cover w-1/2 rounded-b"
                    width={100}
                    height={100}
                />
                <div className="ml-4">
                    <div className="flex justify-between">
                        <p className="text-[11px] text-yellow-800">{date}</p>
                        <p className="border-4 p-1 text-[11px]">{category}</p>
                    </div>
                    <p className="font-semibold mt-2 text-green-950">{title}</p>
                    <p className="text-[11px] mt-4">By {author}</p>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;