import React, { useEffect, useState } from "react";
import {
  ISymposiumForUser,
  ISymposiumTypeForUser,
} from "@/types/research/scince_events";
import Link from "next/link";
import { BiCalendar } from "react-icons/bi";
import { HiOutlineDocumentText } from "react-icons/hi";

interface ScientificCouncilProps {
  data: ISymposiumForUser[];
  buttons: ISymposiumTypeForUser[];
  setSlug: (slug: string) => void;
  slug: string;
}

const ScientificCouncil = ({
  data,
  buttons,
  setSlug,
  slug,
}: ScientificCouncilProps) => {
  const [activeButton, setActiveButton] = useState<string>();

  const handleButtonClick = (slug: string) => {
    setActiveButton(slug);
    setSlug(slug);
  };

  useEffect(() => {
    setActiveButton(slug);
  });

  return (
    <div className="mt-4">
      <div className="flex gap-3 mb-6 flex-wrap">
        {buttons.map((button) => (
          <button
            key={button.id}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
              activeButton === button.slug
                ? "bg-text_secondary text-white"
                : "bg-gray-100 text-text_secondary hover:bg-gray-200"
            }`}
            onClick={() => handleButtonClick(button.slug)}
          >
            {button.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-xl p-5 bg-white
              hover:border-text_secondary/20 hover:shadow-sm transition-all duration-200"
          >
            <h3 className="text-base font-semibold text-text_secondary leading-snug line-clamp-2 mb-4">
              {item.name}
            </h3>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-1.5 text-gray-400">
                <BiCalendar className="text-sm" />
                <span className="text-sm">{item.year}</span>
              </div>
              {item.file && (
                <Link
                  href={
                    process.env.NEXT_PUBLIC_URL_BACKEND + item.file.file_path
                  }
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-4 py-2
                    bg-text_secondary text-white text-sm font-medium rounded-lg
                    hover:bg-text_secondary/90 transition-colors"
                >
                  <HiOutlineDocumentText className="text-base" />
                  PDF
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScientificCouncil;