"use client";

import React, { FC, useState } from "react";
import Image from "next/image";
import { annualsItem } from "@/types/templates/annuals_and_review.types";
import { FileText, Download, Eye, Calendar, ExternalLink } from "lucide-react";
import { Modal } from "antd";

const YearEndReview: FC<{ allAnnuals: annualsItem[] }> = ({ allAnnuals }) => {
  const [previewItem, setPreviewItem] = useState<annualsItem | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("uz-UZ", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
        {allAnnuals.map((item, index) => (
          <div
            key={item.id}
            className="group relative bg-white rounded-2xl overflow-hidden border border-tertiary/10 hover:border-text_secondary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-text_secondary/10"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-box_color to-tertiary/5">
              <Image
                width={400}
                height={500}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt={item.name}
                src={process.env.NEXT_PUBLIC_URL_BACKEND + item.image.file_path}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-tertiary/90 via-tertiary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Hover Actions */}
              <div
                className={`absolute inset-0 flex items-center justify-center gap-3 transition-all duration-500 ${
                  hoveredIndex === index
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <button
                  onClick={() => setPreviewItem(item)}
                  className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-text_secondary transition-all duration-300 hover:scale-110"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <a
                  href={process.env.NEXT_PUBLIC_URL_BACKEND + item.file.file_path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-text_secondary transition-all duration-300 hover:scale-110"
                >
                  <Download className="w-5 h-5" />
                </a>
                {item.source_link && (
                  <a
                    href={item.source_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-text_secondary transition-all duration-300 hover:scale-110"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>

              {/* Badge */}
              <div className="absolute top-4 left-4">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-text_secondary text-xs font-medium">
                  <FileText className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </div>
              </div>

              {/* File Size Badge */}
              {item.file.file_size && (
                <div className="absolute top-4 right-4">
                  <div className="px-3 py-1.5 rounded-full bg-tertiary/80 backdrop-blur-sm text-white text-xs font-medium">
                    {item.file.file_size.mb}
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-tertiary font-semibold text-base line-clamp-2 group-hover:text-text_secondary transition-colors duration-300 min-h-[48px]">
                {item.name}
              </h3>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-tertiary/10">
                <div className="flex items-center gap-2 text-tertiary/50 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(item.createdAt)}</span>
                </div>

                <a
                  href={process.env.NEXT_PUBLIC_URL_BACKEND + item.file.file_path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-text_secondary/10 text-text_secondary rounded-lg text-sm font-medium hover:bg-text_secondary hover:text-white transition-all duration-300"
                >
                  <Download className="w-4 h-4" />
                  <span className="max-sm:hidden">Yuklab olish</span>
                </a>
              </div>
            </div>

            {/* Decorative Corner */}
            <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-text_secondary/5 rounded-full transition-all duration-500 group-hover:scale-[3] group-hover:bg-text_secondary/10" />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {allAnnuals.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-tertiary/10 flex items-center justify-center mb-4">
            <FileText className="w-10 h-10 text-tertiary/40" />
          </div>
          <h3 className="text-tertiary font-semibold text-lg mb-2">
            Hujjatlar topilmadi
          </h3>
          <p className="text-tertiary/50 text-sm">
            Hozircha yillik hisobotlar mavjud emas
          </p>
        </div>
      )}

      {/* Preview Modal */}
      <Modal
        open={!!previewItem}
        onCancel={() => setPreviewItem(null)}
        footer={null}
        width="90%"
        style={{ maxWidth: 1200 }}
        centered
        closeIcon={null}
        styles={{
          mask: {
            backgroundColor: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(10px)",
          },
          content: {
            padding: 0,
            borderRadius: "1.5rem",
            overflow: "hidden",
          },
          body: {
            padding: 0,
            height: "85vh",
          },
        }}
      >
        {previewItem && (
          <div className="relative h-full bg-tertiary">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent">
              <h3 className="text-white font-semibold text-lg truncate pr-4">
                {previewItem.name}
              </h3>
              <div className="flex items-center gap-2">
                <a
                  href={process.env.NEXT_PUBLIC_URL_BACKEND + previewItem.file.file_path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg text-sm font-medium hover:bg-white hover:text-tertiary transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Yuklab olish</span>
                </a>
                <button
                  onClick={() => setPreviewItem(null)}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-tertiary transition-all"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <iframe
              src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${previewItem.file.file_path}`}
              className="w-full h-full"
              title={previewItem.name}
            />
          </div>
        )}
      </Modal>
    </>
  );
};

export default YearEndReview;
