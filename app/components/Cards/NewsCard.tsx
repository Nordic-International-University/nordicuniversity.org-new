import React from "react";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";
import arrowImage from "@/public/Arrow 1.svg";
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
  return (
    <div>
      <Link href={`/article/${slug}`} prefetch={false}>
        <div className="w-full  flex  bg-[#f2f3f7] rounded-md p-1 h-[153px] overflow-hidden shadow-[5px_5px_10px_0px_#D2DCE9CC] max-[400px]:h-[190px] hover:shadow-[1px_3px_10px_0px_#5B99C2] transition-shadow ">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`}
            alt={title}
            className="object-cover rounded-tl-md rounded-bl-md"
            width={150}
            height={100}
          />
          <div className="ml-2 py-2 px-2 w-full">
            <div className="flex justify-between items-center">
              <p className="text-[11px]  text-[#478CCF] font-bold">
                {" "}
                {moment(date).utc().format("YYYY-MM-DD")}
              </p>
            </div>
            <div className="text-ellipsis overflow-hidden">
              <p className="font-semibold text-[13px] mt-2 mb-2 text-green-950 h-[70px] tracking-wider max-[400px]:h-[100px] ">
                {title}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[11px] mt-4 text-[#478CCF] font-bold">
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
