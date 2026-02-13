import React from "react";
import Link from "next/link";
import {
  FaFacebook,
  FaTelegram,
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaLinkedin,
} from "react-icons/fa";

interface ISocialNetworkLinks {
  instagram: string | null;
  telegram: string | null;
  facebook: string | null;
  youtube: string | null;
  twitter: string | null;
  mail: string | null;
  linkedin: string | null;
}

interface SocialLinksProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  social_network_links: ISocialNetworkLinks | any;
  className?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({
  social_network_links: rawLinks,
  className = "mt-5",
}) => {
  // Normalize: if array, merge all objects; if single object, use as-is
  const social_network_links: Record<string, string | null> = Array.isArray(rawLinks)
    ? rawLinks.reduce((acc, item) => ({ ...acc, ...item }), {})
    : rawLinks;

  const iconsMap: { [key: string]: JSX.Element } = {
    facebook: <FaFacebook className="text-2xl" />,
    telegram: <FaTelegram className="text-2xl" />,
    youtube: <FaYoutube className="text-2xl" />,
    instagram: <FaInstagram className="text-2xl" />,
    twitter: <FaTwitter className="text-2xl" />,
    mail: <FaEnvelope className="text-2xl" />,
    linkedin: <FaLinkedin className="text-2xl" />,
  };

  return (
    <div className={`${className} flex items-center gap-2`}>
      {social_network_links &&
        Object.entries(social_network_links).map(([key, value], idx) => {
          if (!value) return null;

          if (key === "mail") {
            return (
              <a
                key={idx}
                href={`mailto:${value}`}
                className="text-[#7A98C1] z-10 hover:text-secondary"
                aria-label={key}
              >
                {iconsMap[key] || null}
              </a>
            );
          }

          return (
            <Link
              key={idx}
              href={value || "#"}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-[#7A98C1] z-10 hover:text-secondary"
              aria-label={key}
            >
              {iconsMap[key] || null}
            </Link>
          );
        })}
    </div>
  );
};

export default SocialLinks;
