"use client";

import React, { useState } from "react";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";
import { BsEye } from "react-icons/bs";

interface SmallCardProps {
  title: string;
  date: string;
  views: number;
  category: string;
  description: string;
  author: string;
  imageUrl: string;
  slug: string;
}

const NewsCard = ({
  title,
  date,
  category,
  description,
  views,
  slug,
  author,
  imageUrl,
}: SmallCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div>
      <Link href={`/article/${slug}`} prefetch={false}>
        <div className="w-full flex bg-[#f2f3f7] rounded-md p-1 h-[150px] shadow-[5px_5px_10px_0px_#D2DCE9CC] max-[400px]:h-[190px] hover:shadow-[1px_3px_10px_0px_#5B99C2] transition-shadow ">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`}
            alt={title}
            width={150}
            height={100}
            onLoad={() => setIsLoaded(true)}
            className={`object-cover rounded-tl-md rounded-bl-md h-full transition-all duration-1000 ${
              isLoaded ? "blur-0" : "blur-md"
            }`}
          />
          <div className="ml-2 py-2 px-2 w-full flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center">
                <p className="text-[11px] text-[#478CCF] font-bold">
                  {" "}
                  {moment(date).utc().format("DD.MM.YYYY")}
                </p>
              </div>
              <p className="text-ellipsis font-semibold line-clamp-3  text-[13px] mt-2 mb-2 text-green-950 tracking-wider max-[400px]:h-[100px] ">
                {title}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-[#478CCF] font-bold">
                {" "}
                Read More...
              </p>
              <div className="flex items-center gap-2">
                <BsEye className="text-sm" />
                <p className="font-normal text-[12px]">{views}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NewsCard;
