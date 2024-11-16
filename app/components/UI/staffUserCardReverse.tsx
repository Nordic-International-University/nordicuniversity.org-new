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
const iconMap = {
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
    <div className="border border-opacity-40 border-[#7A98C1] p-6 rounded-sm">
      <div
        className={`${imagePosition === "right" ? "flex-row" : "flex-row-reverse"} justify-between flex items-start gap-3`}
      >
        <div className="w-3/5">
          <h3 className="text-lg font-semibold text-[#364E6B]">
            {staff.full_name}
          </h3>
          <p
            className="ql-editor text-lg text-[#46658BCC]"
            dangerouslySetInnerHTML={{
              __html: staff.description,
            }}
          ></p>
        </div>
        <Image
          width={250}
          height={250}
          src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${staff.image.file_path}`}
          alt={staff.full_name}
          className="rounded-full mx-auto"
        />
      </div>
      <div
        className={`${imagePosition === "left" ? "flex-row" : "flex-row-reverse"} mt-2 flex items-center justify-between`}
      >
        <p className="text-xl uppercase font-semibold text-center text-[#364E6B]">
          {staff.position}
        </p>
        <div className="flex items-center justify-start gap-6">
          <span className="w-[200px] bg-[#46658B] h-0.5"></span>
          <div className="flex justify-center gap-4">
            {(Object as any).entries(staff.social_network_links).map(
              ([platform, url]: any) =>
                url && (
                  <Link
                    href={url}
                    key={platform}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl text-[#46658B]"
                  >
                    {(iconMap as any)[platform]}
                  </Link>
                ),
            )}
          </div>
          <span className="w-[200px] bg-[#46658B] h-0.5"></span>
        </div>
      </div>
    </div>
  );
};

export default StaffUserCard;
