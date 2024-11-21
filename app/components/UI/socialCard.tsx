"use client";

import { useState } from "react";
import { Facebook, Linkedin, MessageCircle, Youtube } from "lucide-react";
import { FaTelegram } from "react-icons/fa";

const bgClasses = {
  telegram: "bg-[#229ED9]",
  youtube: "bg-[#FF0000]",
  facebook: "bg-[#1877F2]",
  linkedin: "bg-[#0A66C2]",
};

const textClasses = {
  telegram: "text-[#229ED9]",
  youtube: "text-[#FF0000]",
  facebook: "text-[#1877F2]",
  linkedin: "text-[#0A66C2]",
};

type SocialCardProps = {
  icon: React.ElementType;
  title: string;
  type: "telegram" | "youtube" | "facebook" | "linkedin";
};

const SocialCard = ({ icon: Icon, title, type }: SocialCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`overflow-hidden w-full grayscale hover:grayscale-0 rounded-lg shadow-md ${bgClasses[type]} transition-all duration-300 ease-in-out ${
        isHovered ? "h-32" : "h-16"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4 h-full flex flex-col justify-between">
        <div className="flex items-center gap-3">
          <Icon className="h-8 w-8 text-white" />
          <h2 className="text-sm font-semibold text-white truncate">{title}</h2>
        </div>
        <div
          className={`transition-opacity duration-300 ease-in-out ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            className={`px-4 py-2 rounded-md text-xs font-medium transition-colors duration-200 ease-in-out bg-white ${textClasses[type]} hover:bg-opacity-90`}
          >
            A'zo bo'lish
          </button>
        </div>
      </div>
    </div>
  );
};

export default function SocialMediaCard({
  socialCards = [
    {
      icon: FaTelegram,
      title: "Universitetning Telegram'dagi rasmiy kanalini kuzatib boring",
      type: "telegram",
    },
    {
      icon: Youtube,
      title: "YouTube kanalimizga obuna bo'ling",
      type: "youtube",
    },
    {
      icon: Facebook,
      title: "Facebook sahifamizni kuzatib boring",
      type: "facebook",
    },
    {
      icon: Linkedin,
      title: "LinkedIn profilimizga ulanish",
      type: "linkedin",
    },
  ],
}: {
  socialCards?: SocialCardProps[];
}) {
  return (
    <div className="flex flex-col mt-3 w-full gap-3">
      {socialCards.map((card, index) => (
        <SocialCard key={index} {...card} />
      ))}
    </div>
  );
}
