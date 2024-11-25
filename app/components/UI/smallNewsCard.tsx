import Image from "next/image";
import React from "react";
import Link from "next/link";

interface MinimalCardProps {
  image: {
    file_path: string;
  };
  title: string;
  url: string;
  subTitle: string;
  slug: string;
}

const MinimalCard: React.FC<MinimalCardProps> = ({
  image,
  url,
  title,
  subTitle,
  slug,
}) => {
  return (
    <Link
      href={`${url}/${slug}`}
      className="flex items-start gap-4 p-4 rounded-lg bg-transparent hover:shadow-lg transition-shadow duration-300"
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${image.file_path}`}
        alt={title}
        width={1000}
        height={1000}
        unoptimized
        className="object-cover w-20 h-20 rounded-xl"
      />
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold line-clamp-2 text-gray-800 hover:text-blue-500 transition">
          {title}
        </p>
        <p
          dangerouslySetInnerHTML={{ __html: subTitle }}
          className="line-clamp-2 text-xs text-gray-500"
        ></p>
      </div>
    </Link>
  );
};

export default MinimalCard;
