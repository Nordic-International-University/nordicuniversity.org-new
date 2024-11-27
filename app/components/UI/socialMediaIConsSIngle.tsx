import {
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { SocialNetworkLinks } from "@/types/research/scince_events";
import { Fragment } from "react";
import Link from "next/link";

const SocialMediaIcons = ({ links }: { links: SocialNetworkLinks[] }) => {
  return (
    <div className="flex items-center gap-3 mt-4">
      {links.map((link, index) => (
        <Fragment key={index}>
          {link.facebook && (
            <Link
              href={link.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              <FaFacebook className="text-xl" />
            </Link>
          )}
          {link.telegram && (
            <a
              href={link.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              <FaTelegram className="text-xl" />
            </a>
          )}
          {link.youtube && (
            <a
              href={link.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              <FaYoutube className="text-xl" />
            </a>
          )}
          {link.instagram && (
            <a
              href={link.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              <FaInstagram className="text-xl" />
            </a>
          )}
          {link.twitter && (
            <a
              href={link.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              <FaTwitter className="text-xl" />
            </a>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default SocialMediaIcons;
