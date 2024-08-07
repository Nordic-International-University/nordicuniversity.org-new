import React from 'react';
import Image from "next/image";
import moment from "moment";
interface SmallCardProps {
    title: string;
    date: string;
    category: string;
    description: string;
    author: string;
    imageUrl: string;
}

const BigArticlesCard = ({
                         title,
                         date,
                         category,
                         description,
                         author,
                         imageUrl,
                     }:SmallCardProps) => {
    return (
        <div>
            <div className="w-[400px]  flex-col  bg-[#f2f3f7] rounded-2xl p-1 min-h-[150px] overflow-hidden">
                <Image
                    src={`https://journal2.nordicun.uz${imageUrl}`}
                    alt={title}
                    className="  rounded-xl w-full  mr-1 h-[220px]  "
width={1000}
                    height={200}
                />
                <div className="ml-2 py-2 px-2">
                    <div className="flex justify-between items-center">

                        <p className="border-[2px] rounded p-0.5 text-[9px] text-[#BEC2CF] font-bold">{category}</p>
                    </div>
                    <p className="font-semibold text-[13px] mt-2 text-green-950 h-[70px]">{title}</p>
                    <div className={"flex justify-between items-center"}>
                        <p className="text-[11px]  text-[#478CCF] font-bold"> {author}</p>
                        <p className="text-[11px]  text-[#BEC2CF] font-bold">     {moment(date).utc().format("YYYY-MM-DD")}</p>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default BigArticlesCard;