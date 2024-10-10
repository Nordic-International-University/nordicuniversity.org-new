"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { BsEye } from "react-icons/bs";

interface SmallCardProps {
  title: string;
  date: string;
  category: string;
  views: number;
  description: string;
  author: string;
  imageUrl: string;
  width: string;
  slug: string;
}

const ArticleCard = ({
  title,
  date,
  category,
  author,
  views,
  imageUrl,
  slug,
  width,
}: SmallCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Link href={`/article/${slug}`} prefetch={true}>
      <div className="cursor-pointer">
        <div
          className={`w-[${width ? width + "px" : "100%"}] flex bg-[#f2f3f7] rounded-md p-1 min-h-[150px] overflow-hidden shadow-[5px_5px_10px_0px_#D2DCE9CC] max-sm:h-[170px]hover:shadow-[1px_3px_10px_0px_#5B99C2] transition-shadow`}
        >
          <div className="min-w-[150px] h-[150px]">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`}
              alt={title}
              className={`object-cover rounded-tl-md rounded-bl-md  h-full transition-all duration-1000 ${
                isLoaded ? "blur-0" : "blur-md"
              }`}
              width={150}
              onLoad={() => setIsLoaded(true)}
              height={150}
            />
          </div>
          <div className="ml-2 py-2 px-2 w-full flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center">
                <p className="text-[11px] text-[#478CCF] font-bold">
                  {moment(date).utc().format("DD.MM.YYYY")}
                </p>
                <p className="border-[2px] max-sm:hidden block rounded p-0.5 text-[9px] text-[#478CCF] font-bold">
                  {category}
                </p>
              </div>
              <p className="font-semibold line-clamp-3 text-[13px] mt-2 text-ellipsis text-green-950">
                {title}
              </p>
            </div>
            <div className="flex mt-4 items-center justify-between">
              <p className="text-[11px] text-[#478CCF] font-bold truncate w-full max-w-[100px] sm:max-w-[150px] md:max-w-[200px] lg:max-w-[250px]">
                {author.length > 15 ? `${author.slice(0, 15)}...` : author}
              </p>
              <div className="flex items-center gap-2">
                <BsEye className="text-sm" />
                <p className="font-normal text-[12px]">{views}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
