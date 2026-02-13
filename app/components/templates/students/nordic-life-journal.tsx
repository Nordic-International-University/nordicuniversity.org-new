"use client";

import { nordicLiveJournalProps } from "@/types/templates/nordiklieve.types";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { HiOutlineBookOpen, HiOutlineX } from "react-icons/hi";

const NordicLifeJournal = ({ props }: { props: nordicLiveJournalProps[] }) => {
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const t = useTranslations("buttons");

  const handleOpenModal = (filePath: string) => setPdfUrl(filePath);
  const handleCloseModal = () => setPdfUrl("");

  return (
    <article className="mt-8 mb-10">
      <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5">
        {props.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1"
            style={{ border: "1px solid rgba(11,64,117,0.08)" }}
          >
            <Image
              width={300}
              height={420}
              className="w-full h-[380px] max-sm:h-[320px] object-cover"
              src={process.env.NEXT_PUBLIC_URL_BACKEND + item.image.file_path}
              alt={item.name}
            />
            <div className="p-4">
              <h3 className="text-sm font-semibold text-text_secondary line-clamp-2 mb-3">
                {item.name}
              </h3>

              {/* Desktop — modal */}
              <button
                onClick={() =>
                  handleOpenModal(
                    process.env.NEXT_PUBLIC_URL_BACKEND + item.file.file_path,
                  )
                }
                className="hidden md:flex items-center gap-2 w-full justify-center py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:scale-[1.02]"
                style={{
                  backgroundColor: "#0b4075",
                  boxShadow: "0 2px 8px rgba(11,64,117,0.2)",
                }}
              >
                <HiOutlineBookOpen className="text-base" />
                {t("read")}
              </button>

              {/* Mobile — direct link */}
              <a
                href={
                  process.env.NEXT_PUBLIC_URL_BACKEND + item.file.file_path
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex md:hidden items-center gap-2 w-full justify-center py-2.5 rounded-xl text-sm font-medium text-white"
                style={{ backgroundColor: "#0b4075" }}
              >
                <HiOutlineBookOpen className="text-base" />
                {t("read")}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* PDF Modal */}
      {pdfUrl && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-3"
              style={{ borderBottom: "1px solid rgba(11,64,117,0.08)" }}
            >
              <h3 className="text-sm font-semibold text-text_secondary">
                PDF Document
              </h3>
              <button
                onClick={handleCloseModal}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                style={{ backgroundColor: "rgba(11,64,117,0.04)" }}
              >
                <HiOutlineX
                  className="text-base"
                  style={{ color: "#0b4075" }}
                />
              </button>
            </div>

            {/* PDF iframe */}
            <div className="flex-1 min-h-0">
              <iframe
                src={pdfUrl}
                width="100%"
                height="600"
                frameBorder="0"
                title="PDF Viewer"
              />
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default NordicLifeJournal;
