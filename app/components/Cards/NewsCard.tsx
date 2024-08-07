import React from "react";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";
interface SmallCardProps {
  title: string;
  date: string;
  category: string;
  description: string;
  author: string;
  imageUrl: string;
}

const NewsCard = ({
  title,
  date,
  category,
  description,
  author,
  imageUrl,
}: SmallCardProps) => {
  return (
    <div>
      <Link href={"/"}>
        <div className="w-[400px]  flex  bg-[#f2f3f7] rounded-2xl p-1 min-h-[150px] overflow-hidden shadow-lg">
          <Image
            src={`https://journal2.nordicun.uz${imageUrl}`}
            alt={title}
            className="object-cover  rounded-tl-xl rounded-bl-xl"
            width={150}
            height={100}
          />
          <div className="ml-2 py-2 px-2">
            <div className="flex justify-between items-center">
              <p className="text-[11px]  text-[#478CCF] font-bold">
                {" "}
                {moment(date).utc().format("YYYY-MM-DD")}
              </p>
            </div>
            <p className="font-semibold text-[13px] mt-2 text-green-950 h-[70px]">
              {title}
            </p>
            <p className="text-[11px] mt-4 text-[#478CCF] font-bold">
              {" "}
              Read More...
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NewsCard;
