import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Staff } from "@/types/templates/structure.types";

const iconMap: { [key: string]: React.ReactNode } = {
  instagram: <FaInstagram />,
  telegram: <FaTelegram />,
  facebook: <FaFacebook />,
  youtube: <FaYoutube />,
  twitter: <FaTwitter />,
};

const StaffUserCard = ({
  staff,
  imagePosition,
}: {
  staff: Staff;
  imagePosition: string;
}) => {
  return (
    <div className="border shadow-md border-opacity-40 border-gray-300 p-4 sm:p-6 rounded-sm">
      <div
        className={`${
          imagePosition === "right" ? "flex-row" : "flex-row-reverse"
        } flex  max-lg:flex-col-reverse justify-between items-center gap-6`}
      >
        {/* Text Section */}
        <div className="lg:w-3/5 max-lg:w-full text-center lg:text-left">
          <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#364E6B]">
            {staff.full_name}
          </h3>
          <p
            className="ql-editor text-sm sm:text-base text-[#46658BCC]"
            dangerouslySetInnerHTML={{
              __html: staff.description,
            }}
          ></p>
        </div>
        {/* Image Section */}
        <Image
          width={250}
          height={250}
          src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${staff.image.file_path}`}
          alt={staff.full_name}
          className="rounded-full max-lg:rounded-none mx-auto max-sm:w-28 max-sm:h-28 sm:w-36 sm:h-36 lg:w-48 lg:h-48"
        />
      </div>
      <div
        className={`${
          imagePosition === "left" ? "flex-row" : "flex-row-reverse"
        } mt-4 flex max-lg:flex-col items-center justify-between`}
      >
        <p className="text-xs sm:text-sm uppercase max-w-[299px] text-center block mx-auto font-semibold text-[#364E6B]">
          {staff.position}
        </p>
        <div className="flex items-center w-full max-lg:mt-6 max-sm:justify-between max-sm:gap-3 justify-center gap-4">
          <span className=" w-24  max-sm:w-full sm:w-[200px] bg-[#46658B] h-0.5"></span>
          <div className="flex justify-center gap-3 lg:gap-4">
            {Object.entries(staff.social_network_links || {}).map(
              ([platform, url]) =>
                url && (
                  <Link
                    href={url}
                    key={platform}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg sm:text-xl text-[#46658B] hover:text-[#7A98C1]"
                  >
                    {iconMap[platform] || null}
                  </Link>
                ),
            )}
          </div>
          <span className="w-24 max-sm:w-full sm:w-[200px] bg-[#46658B] h-0.5"></span>
        </div>
      </div>
    </div>
  );
};

export default StaffUserCard;
