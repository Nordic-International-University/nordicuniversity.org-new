"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { albumsType } from "@/types/templates/albums.types";
import { useDispatch } from "react-redux";
import { changeAlbum } from "@/app/utils/slices/component.function";
import {
  HiOutlineX,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";

const Albums = ({
  props,
  selectedTypeData,
}: {
  props: albumsType[];
  selectedTypeData: any;
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const dispatch = useDispatch();
  const imageURL = process.env.NEXT_PUBLIC_URL_BACKEND;
  const [paused, setPaused] = useState(false);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);

  const images = selectedTypeData.map((item: any) => ({
    src: imageURL + (item?.photo?.file_path || ""),
    caption: item?.photo?.description || "",
  }));

  const count = images.length;
  const colCount = 4;

  // Split images into 4 columns
  const columns: typeof images[] = [];
  if (count > 0) {
    const perCol = Math.ceil(count / colCount);
    for (let i = 0; i < colCount; i++) {
      const colImages = images.slice(i * perCol, (i + 1) * perCol);
      if (colImages.length > 0) columns.push(colImages);
    }
  }

  // Auto-scroll animation (vertical)
  useEffect(() => {
    if (paused || columns.length === 0) return;

    const speed = 0.5;
    let animId: number;

    const tick = () => {
      colRefs.current.forEach((el, i) => {
        if (!el) return;
        const isReverse = i % 2 === 1;
        if (isReverse) {
          el.scrollTop -= speed;
          if (el.scrollTop <= 0) {
            el.scrollTop = el.scrollHeight / 2;
          }
        } else {
          el.scrollTop += speed;
          if (el.scrollTop >= el.scrollHeight / 2) {
            el.scrollTop = 0;
          }
        }
      });
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [paused, columns.length, selectedTypeData]);

  // Initialize scroll positions for reverse columns
  useEffect(() => {
    colRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i % 2 === 1) {
        el.scrollTop = el.scrollHeight / 2;
      }
    });
  }, [selectedTypeData, columns.length]);

  // Lightbox
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goNext = useCallback(() => {
    if (lightboxIndex === null || count === 0) return;
    setLightboxIndex((lightboxIndex + 1) % count);
  }, [lightboxIndex, count]);
  const goPrev = useCallback(() => {
    if (lightboxIndex === null || count === 0) return;
    setLightboxIndex((lightboxIndex - 1 + count) % count);
  }, [lightboxIndex, count]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, goNext, goPrev, closeLightbox]);

  const getOriginalIndex = (colIdx: number, imgIdx: number) => {
    const perCol = Math.ceil(count / colCount);
    return colIdx * perCol + (imgIdx % (columns[colIdx]?.length || 1));
  };

  return (
    <article className="mt-7">
      {/* Album tabs */}
      <div className="flex items-center max-sm:flex-col justify-center gap-2 mb-6">
        {props.map((item, index) => (
          <button
            key={index}
            className={`rounded-xl max-sm:w-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
              activeIndex === index
                ? "text-white"
                : "text-text_secondary hover:-translate-y-0.5"
            }`}
            style={
              activeIndex === index
                ? {
                    backgroundColor: "#0b4075",
                    boxShadow: "0 4px 16px rgba(11,64,117,0.25)",
                  }
                : {
                    backgroundColor: "rgba(11,64,117,0.04)",
                    border: "1px solid rgba(11,64,117,0.08)",
                  }
            }
            onClick={() => {
              setActiveIndex(index);
              dispatch(changeAlbum(item.slug));
            }}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Vertical marquee columns */}
      {count > 0 ? (
        <div
          className="flex gap-3 rounded-2xl overflow-hidden"
          style={{ height: "520px" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {columns.map((colImages, colIdx) => {
            const doubled = [...colImages, ...colImages];

            return (
              <div
                key={colIdx}
                ref={(el) => {
                  colRefs.current[colIdx] = el;
                }}
                className="flex-1 flex flex-col gap-3 overflow-hidden"
                style={{ scrollbarWidth: "none" }}
              >
                {doubled.map((img, imgIdx) => {
                  const origIdx = getOriginalIndex(colIdx, imgIdx);
                  return (
                    <div
                      key={`${colIdx}-${imgIdx}`}
                      className="flex-shrink-0 rounded-xl overflow-hidden cursor-pointer group relative"
                      style={{ height: "160px" }}
                      onClick={() => setLightboxIndex(origIdx)}
                    >
                      <img
                        src={img.src}
                        alt={img.caption || `Photo ${origIdx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        onError={(
                          e: React.SyntheticEvent<HTMLImageElement>,
                        ) => {
                          e.currentTarget.style.background =
                            "rgba(11,64,117,0.06)";
                        }}
                      />
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.35))",
                        }}
                      >
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: "rgba(255,255,255,0.9)",
                          }}
                        >
                          <svg
                            className="w-4 h-4"
                            style={{ color: "#0b4075" }}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      ) : (
        <div
          className="flex items-center justify-center rounded-2xl"
          style={{
            height: "400px",
            backgroundColor: "rgba(11,64,117,0.02)",
            border: "1px solid rgba(11,64,117,0.06)",
          }}
        >
          <p className="text-sm" style={{ color: "rgba(11,64,117,0.3)" }}>
            No images available
          </p>
        </div>
      )}

      {/* Lightbox — portal to body */}
      {lightboxIndex !== null &&
        images[lightboxIndex] &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center z-20 transition-all duration-200 hover:scale-110"
              style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
            >
              <HiOutlineX className="text-white text-xl" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 max-sm:left-2 w-10 h-10 rounded-full flex items-center justify-center z-20 transition-all duration-200 hover:scale-110"
              style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
            >
              <HiOutlineChevronLeft className="text-white text-xl" />
            </button>

            <div
              className="max-w-[90vw] max-h-[85vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].caption || ""}
                className="max-w-full max-h-[85vh] object-contain rounded-xl"
                style={{ boxShadow: "0 25px 80px rgba(0,0,0,0.6)" }}
              />
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 max-sm:right-2 w-10 h-10 rounded-full flex items-center justify-center z-20 transition-all duration-200 hover:scale-110"
              style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
            >
              <HiOutlineChevronRight className="text-white text-xl" />
            </button>

            <div
              className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-sm"
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {lightboxIndex + 1} / {count}
            </div>
          </div>,
          document.body,
        )}
    </article>
  );
};

export default Albums;
