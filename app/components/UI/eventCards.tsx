import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaClock,
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { ScientificEvent } from "@/types/research/scince_events";
import SocialLinks from "@/app/components/UI/SocialLinks";

const EventCards = ({
  items,
  path,
}: {
  items: ScientificEvent;
  path: string;
}) => {
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    if (items) {
      setEvent(items);
    }
  }, [items]);

  if (!event) return null;

  return (
    <Link
      href={event?.slug ? `${path + event.slug}` : "#"}
      className="flex items-start max-lg:flex-col gap-5"
    >
      <Image
        width={405}
        height={303}
        className="max-lg:w-full object-cover min-w-[255px] h-[253px]"
        src={
          event?.image?.file_path
            ? process.env.NEXT_PUBLIC_URL_BACKEND + event.image.file_path
            : "/default-image.jpg"
        }
        alt={event?.name || "Default Name"}
      />
      <div className="max-sm:p-3">
        <div className="max-md:mb-5">
          <h2 className="text-secondary text-[18px] max-lg:pr-0 max-lg:text-left pr-40 mb-2 max-md:pb-0 font-semibold line-clamp-2">
            {event?.name}
          </h2>
        </div>
        <p className="text-[#7A98C1] max-lg:text-left text-md mb-2 line-clamp-2">
          {event?.description}
        </p>
        <div className="flex text-[#7A98C1] pb-4 items-center gap-2">
          <FaClock />
          <h2>{event?.time}</h2>
        </div>
        <h3 className="text-tertiary text-[17px] font-semibold">
          SPIKER-{event?.speaker_name}
        </h3>
        <SocialLinks social_network_links={event?.social_network_links} />
      </div>
    </Link>
  );
};

export default EventCards;
