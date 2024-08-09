import React from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

interface SmallCardProps {
  title: string;
  date: string;
  category: string;
  description: string;
  author: string;
  imageUrl: string;
  slug: string;
}

const ArticleCard = ({
  title,
  date,
  category,
  description,
  author,
  imageUrl,
  slug,
}: SmallCardProps) => {
  return (
    <Link href={`/article/${slug}`}>
      <div className="cursor-pointer">
        <div className="w-full flex bg-[#f2f3f7] rounded-md p-1 min-h-[150px] overflow-hidden shadow-[5px_5px_10px_0px_#D2DCE9CC] max-sm:h-[170px] max-[400px]:h-[200px] hover:shadow-[1px_3px_10px_0px_#5B99C2] transition-shadow">
          <Image
            src={`https://journal2.nordicun.uz${imageUrl}`}
            alt={title}
            className="object-cover rounded-tl-md rounded-bl-md"
            width={150}
            height={100}
          />
          <div className="ml-2 py-2 px-2 w-full">
            <div className="flex justify-between items-center">
              <p className="text-[11px] text-[#478CCF] font-bold">
                {moment(date).utc().format("YYYY-MM-DD")}
              </p>
              <p className="border-[2px] rounded p-0.5 text-[9px] text-[#478CCF] font-bold">
                {category}
              </p>
            </div>
            <p className="font-semibold text-[13px] mt-2 text-green-950 h-[70px] max-sm:h-[70px] max-[400px]:h-[100px]">
              {title}
            </p>
            <p className="text-[11px] mt-4 text-[#478CCF] font-bold">
              {author}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
