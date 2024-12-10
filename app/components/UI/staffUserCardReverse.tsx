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
import { TbFileCv } from "react-icons/tb";

const StaffUserCard = ({
  staff,
  imagePosition,
}: {
  staff: Staff;
  imagePosition: string;
}) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    instagram: <FaInstagram />,
    telegram: <FaTelegram />,
    facebook: <FaFacebook />,
    youtube: <FaYoutube />,
    twitter: <FaTwitter />,
  };

  return (
    <div className="border shadow-md max-sm:h-full h-[300px] max-lg:h-auto border-opacity-40 border-gray-300 p-4 sm:p-6 rounded-sm">
      <div
        className={`${
          imagePosition === "right" ? "flex-row" : "flex-row-reverse"
        } flex  max-lg:flex-col-reverse justify-between h-full items-center gap-6`}
      >
        <div className="flex flex-col max-lg:w-full w-3/4 justify-between h-full">
          <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#364E6B]">
            {staff.full_name}
          </h3>
          <p
            className="ql-editor text-sm sm:text-base text-[#46658BCC]"
            dangerouslySetInnerHTML={{
              __html: staff.description,
            }}
          ></p>
          <div className="flex items-center w-full max-lg:mt-6 max-sm:justify-between max-sm:gap-3 gap-4">
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
              <Link
                href={
                  process.env.NEXT_PUBLIC_URL_BACKEND +
                  staff.resume_file.file_path
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg sm:text-xl text-[#46658B] hover:text-[#7A98C1]"
              >
                <TbFileCv className="text-xl" />
              </Link>
            </div>
            <span className="w-24 max-sm:w-full sm:w-[200px] bg-[#46658B] h-0.5"></span>
          </div>
        </div>
        <div className="max-lg:w-full">
          <Image
            width={250}
            height={250}
            src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${staff.image.file_path}`}
            alt={staff.full_name}
            className="rounded-full max-sm:object-contain max-sm:h-auto object-cover max-lg:mb-4 max-lg:w-full max-lg:rounded-none h-52 w-52 mx-auto"
          />{" "}
          <p className="text-xs mt-3 sm:text-md uppercase max-w-[299px] text-center block mx-auto font-semibold text-[#364E6B]">
            {staff.position}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StaffUserCard;
