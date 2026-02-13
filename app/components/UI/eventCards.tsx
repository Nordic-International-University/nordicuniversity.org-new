import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ScientificEvent } from "@/types/research/scince_events";
import SocialLinks from "@/app/components/UI/SocialLinks";
import { BiCalendar } from "react-icons/bi";

const EventCards = ({
  items,
  path,
}: {
  items: ScientificEvent;
  path: string;
}) => {
  if (!items) return null;

  return (
    <Link
      href={items?.slug ? `${path + items.slug}` : "#"}
      className="group flex items-start max-lg:flex-col gap-5 p-5"
    >
      <div className="w-full h-[220px] lg:w-[260px] lg:h-[200px] relative flex-shrink-0 rounded-lg overflow-hidden">
        <Image
          fill
          className="object-cover"
          src={
            items?.image?.file_path
              ? process.env.NEXT_PUBLIC_URL_BACKEND + items.image.file_path
              : "/default-image.jpg"
          }
          alt={items?.name || "Event"}
        />
      </div>
      <div className="flex-1">
        <h2 className="text-lg text-text_secondary font-semibold line-clamp-2 leading-snug">
          {items?.name}
        </h2>
        <p className="text-gray-500 text-sm mt-2 line-clamp-2 leading-relaxed">
          {items?.description}
        </p>
        <div className="flex items-center gap-1.5 text-gray-400 mt-3">
          <BiCalendar className="text-sm" />
          <span className="text-xs">{items?.time}</span>
        </div>
        {items?.speaker_name && (
          <p className="text-text_secondary text-sm font-semibold mt-3">
            SPIKER — {items.speaker_name}
          </p>
        )}
        <SocialLinks social_network_links={items?.social_network_links} />
      </div>
    </Link>
  );
};

export default EventCards;
