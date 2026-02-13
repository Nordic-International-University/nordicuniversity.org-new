"use client";

import { nordicLiveJournalProps } from "@/types/templates/nordiklieve.types";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { HiOutlineDocumentText, HiOutlineX } from "react-icons/hi";

const Patents = ({
  props,
  buttonText,
}: {
  props: nordicLiveJournalProps[];
  buttonText: string;
}) => {
  const [selectedItem, setSelectedItem] = useState<{
    name: string;
    filePath: string;
  } | null>(null);

  const t = useTranslations("buttons");

  return (
    <article className="mt-8">
      <div className="grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 gap-5">
        {props.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl overflow-hidden bg-white
              hover:border-text_secondary/20 hover:shadow-sm transition-all duration-200"
          >
            <div className="relative aspect-[3/4]">
              <Image
                fill
                className="object-cover"
                src={
                  process.env.NEXT_PUBLIC_URL_BACKEND + item.image.file_path
                }
                alt={item.name}
              />
            </div>
            <div className="p-4">
              <h2 className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug">
                {item.name}
              </h2>
              {/* Desktop: open modal */}
              <button
                className="hidden md:flex items-center justify-center gap-2 w-full mt-3 py-2.5
                  bg-text_secondary text-white text-sm font-medium rounded-lg
                  hover:bg-text_secondary/90 transition-colors"
                onClick={() =>
                  setSelectedItem({
                    filePath:
                      process.env.NEXT_PUBLIC_URL_BACKEND +
                      item.file.file_path,
                    name: item.name,
                  })
                }
              >
                <HiOutlineDocumentText className="text-base" />
                {buttonText}
              </button>
              {/* Mobile: direct link */}
              <a
                href={
                  process.env.NEXT_PUBLIC_URL_BACKEND + item.file.file_path
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex md:hidden items-center justify-center gap-2 w-full mt-3 py-2.5
                  bg-text_secondary text-white text-sm font-medium rounded-lg
                  hover:bg-text_secondary/90 transition-colors"
              >
                <HiOutlineDocumentText className="text-base" />
                {buttonText}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* PDF Viewer Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white rounded-xl w-full max-w-[90vw] max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-200">
              <h3 className="text-base font-semibold text-gray-800 line-clamp-1 pr-4">
                {selectedItem.name}
              </h3>
              <button
                onClick={() => setSelectedItem(null)}
                className="w-8 h-8 flex items-center justify-center rounded-lg
                  text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <HiOutlineX className="text-lg" />
              </button>
            </div>
            <div className="flex-1 min-h-0" style={{ height: "80vh" }}>
              <iframe
                src={selectedItem.filePath}
                width="100%"
                height="100%"
                title="PDF Viewer"
                className="border-none"
              />
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default Patents;