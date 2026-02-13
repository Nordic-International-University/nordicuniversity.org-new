"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { HiOutlineDocumentText, HiOutlineX, HiOutlineClipboardCopy } from "react-icons/hi";

interface CodesAndManualsProps {
  id: string;
  name: string;
  file: {
    file_path: string;
  };
  image: {
    file_path: string;
  };
}

const CodesAndManuals = ({ props }: { props: CodesAndManualsProps[] }) => {
  const t = useTranslations("student.CodesAndManuals");
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const showModal = (pdfUrl: string) => setSelectedPdf(pdfUrl);
  const handleCancel = () => {
    setSelectedPdf(null);
    setCopied(false);
  };

  const handleCopyUrl = () => {
    if (selectedPdf) {
      navigator.clipboard.writeText(selectedPdf).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <article className="mt-8 mb-10">
      <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5">
        {props.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1"
            style={{ border: "1px solid rgba(11,64,117,0.08)" }}
          >
            <Image
              width={300}
              height={400}
              src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${item.image.file_path}`}
              alt={item.name}
              className="w-full h-[360px] max-sm:h-[300px] object-cover"
            />
            <div className="p-4">
              <h3 className="text-sm font-semibold text-text_secondary line-clamp-2 mb-3">
                {item.name}
              </h3>

              {/* Desktop — modal */}
              <button
                onClick={() =>
                  showModal(
                    `${process.env.NEXT_PUBLIC_URL_BACKEND}${item.file.file_path}`,
                  )
                }
                className="hidden md:flex items-center gap-2 w-full justify-center py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:scale-[1.02]"
                style={{
                  backgroundColor: "#0b4075",
                  boxShadow: "0 2px 8px rgba(11,64,117,0.2)",
                }}
              >
                <HiOutlineDocumentText className="text-base" />
                PDF
              </button>

              {/* Mobile — direct link */}
              <a
                href={`${process.env.NEXT_PUBLIC_URL_BACKEND}${item.file.file_path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex md:hidden items-center gap-2 w-full justify-center py-2.5 rounded-xl text-sm font-medium text-white"
                style={{ backgroundColor: "#0b4075" }}
              >
                <HiOutlineDocumentText className="text-base" />
                PDF
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* PDF Modal */}
      {selectedPdf && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          onClick={handleCancel}
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
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyUrl}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                  style={{
                    backgroundColor: copied
                      ? "rgba(16,185,129,0.1)"
                      : "rgba(11,64,117,0.04)",
                    color: copied ? "#059669" : "#0b4075",
                    border: `1px solid ${copied ? "rgba(16,185,129,0.2)" : "rgba(11,64,117,0.08)"}`,
                  }}
                >
                  <HiOutlineClipboardCopy className="text-sm" />
                  {copied ? "Copied!" : "Copy URL"}
                </button>
                <button
                  onClick={handleCancel}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                  style={{ backgroundColor: "rgba(11,64,117,0.04)" }}
                >
                  <HiOutlineX
                    className="text-base"
                    style={{ color: "#0b4075" }}
                  />
                </button>
              </div>
            </div>

            {/* PDF iframe */}
            <div className="flex-1 min-h-0">
              <iframe
                src={selectedPdf}
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

export default CodesAndManuals;
