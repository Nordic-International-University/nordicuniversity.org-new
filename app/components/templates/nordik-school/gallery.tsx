"use client";

import React, { useState } from "react";
import { HiOutlineX, HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

const getYouTubeVideoId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const Gallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const mediaItems = [
    { type: "image" as const, src: "/images/0.jpg" },
    { type: "image" as const, src: "/images/2.png" },
    { type: "image" as const, src: "/images/3.jpg" },
    { type: "image" as const, src: "/images/4.jpg" },
    { type: "image" as const, src: "/images/5.jpg" },
    { type: "image" as const, src: "/images/6.png" },
    { type: "image" as const, src: "/images/7.jpg" },
    { type: "image" as const, src: "/images/8.png" },
    { type: "image" as const, src: "/images/9.jpg" },
    { type: "image" as const, src: "/images/10.jpg" },
    { type: "image" as const, src: "/images/12.jpg" },
    { type: "image" as const, src: "/images/13.jpg" },
    { type: "image" as const, src: "/images/14.jpg" },
    { type: "image" as const, src: "/images/15.png" },
    { type: "image" as const, src: "/images/19.jpg" },
    { type: "video" as const, url: "https://www.youtube.com/watch?v=Phz-ejKcx74" },
    { type: "video" as const, url: "https://www.youtube.com/watch?v=Hy-OL6GDkZ8" },
    { type: "video" as const, url: "https://www.youtube.com/watch?v=XQ_agxK6fLs" },
  ];

  const imageItems = mediaItems.filter((item) => item.type === "image");

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % imageItems.length);
  };

  const goPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      (lightboxIndex - 1 + imageItems.length) % imageItems.length,
    );
  };

  return (
    <div className="bg-white">
      <div className="py-10 max-sm:py-6">
        {/* Images Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
          {imageItems.map((item, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl cursor-pointer group relative"
              onClick={() => openLightbox(index)}
            >
              <img
                src={item.src}
                alt={`Gallery ${index + 1}`}
                className="w-full h-48 max-sm:h-32 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ backgroundColor: "rgba(11,64,117,0.3)" }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
                >
                  <svg
                    className="w-5 h-5"
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
          ))}
        </div>

        {/* Videos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mediaItems
            .filter((item) => item.type === "video")
            .map((item, index) => (
              <div
                key={index}
                className="rounded-xl overflow-hidden"
                style={{ border: "1px solid rgba(11,64,117,0.08)" }}
              >
                <iframe
                  width="100%"
                  height="200"
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId((item as any).url)}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ))}
        </div>

        {/* Lightbox */}
        {lightboxIndex !== null && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.9)" }}
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-colors z-10"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              <HiOutlineX className="text-white text-xl" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors z-10"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              <HiOutlineChevronLeft className="text-white text-xl" />
            </button>

            {/* Image */}
            <img
              src={imageItems[lightboxIndex].src}
              alt=""
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors z-10"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              <HiOutlineChevronRight className="text-white text-xl" />
            </button>

            {/* Counter */}
            <div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-sm"
              style={{
                backgroundColor: "rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              {lightboxIndex + 1} / {imageItems.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
