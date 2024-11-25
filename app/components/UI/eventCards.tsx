import React from "react";
import {
  FaClock,
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const EventCards = ({ items }: { items: any }) => {
  return (
    <div className="flex items-start max-lg:flex-col gap-5">
      <Image
        width={405}
        height={303}
        className="max-lg:w-full object-cover h-full min-w-[255px] h-[273px]"
        src={process.env.NEXT_PUBLIC_URL_BACKEND + items.image.file_path}
        alt={items.name}
      />
      <div>
        <div className="max-md:mb-5">
          <h2 className="text-secondary text-[18px] max-lg:pr-0 max-lg:text-left pr-40 pb-3 max-md:pb-0 font-semibold line-clamp-2">
            {items.name}
          </h2>
        </div>

        <p className="text-[#7A98C1] max-lg:text-left text-md mb-2 line-clamp-2">
          {items.description}
        </p>
        <div className="flex text-[#7A98C1] pb-4 items-center gap-2">
          <FaClock />
          <h2>{items.time}</h2>
        </div>
        <h3 className="text-tertiary text-[17px] font-semibold">
          SPIKER-{items.speaker_name}
        </h3>
        <div className="flex items-center mt-6 gap-2">
          {Object.entries(items.social_network_links).map(
            ([key, value]: any, idx) => {
              return (
                <Link
                  key={idx}
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7A98C1] hover:text-secondary"
                  aria-label={key}
                >
                  {key === "facebook" && <FaFacebook className="text-2xl" />}
                  {key === "telegram" && <FaTelegram className="text-2xl" />}
                  {key === "youtube" && <FaYoutube className="text-2xl" />}
                  {key === "instagram" && <FaInstagram className="text-2xl" />}
                  {key === "twitter" && <FaTwitter className="text-2xl" />}
                </Link>
              );
            },
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCards;
