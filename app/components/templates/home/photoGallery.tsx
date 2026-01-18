"use client";

import React, { useEffect, useState, useRef } from "react";
import { Image } from "antd";
import { gsap } from "gsap";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";

const PhotoGallery = ({
  gallery,
  sectionTitle,
}: {
  gallery: any[];
  sectionTitle: string;
}) => {
  const t = useTranslations("other");
  const [currentPhotos, setCurrentPhotos] = useState<any[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Unique positions and rotations for scattered effect
  const photoStyles = [
    { top: "0%", left: "0%", rotate: -3, z: 10, scale: 1.1 },
    { top: "5%", left: "35%", rotate: 2, z: 20, scale: 1 },
    { top: "0%", left: "68%", rotate: -2, z: 15, scale: 1.05 },
    { top: "52%", left: "5%", rotate: 3, z: 25, scale: 1 },
    { top: "48%", left: "38%", rotate: -1, z: 30, scale: 1.15 },
    { top: "55%", left: "70%", rotate: 2, z: 12, scale: 1 },
  ];

  useEffect(() => {
    setCurrentPhotos(gallery.slice(0, 6));
  }, [gallery]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const nextIndex = (startIndex + 6) % gallery.length;
      const endIndex = nextIndex + 6;
      const newPhotos =
        endIndex <= gallery.length
          ? gallery.slice(nextIndex, endIndex)
          : [...gallery.slice(nextIndex), ...gallery.slice(0, endIndex - gallery.length)];
      setCurrentPhotos(newPhotos);
      setStartIndex(nextIndex);
    }, 8000);

    return () => clearTimeout(timeout);
  }, [startIndex, gallery]);

  useEffect(() => {
    if (containerRef.current) {
      const images = containerRef.current.querySelectorAll(".photo-card");
      gsap.fromTo(
        images,
        {
          opacity: 0,
          scale: 0.5,
          y: 100,
          rotateY: -30,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "back.out(1.7)",
        }
      );
    }
  }, [currentPhotos]);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-tertiary to-[#1e1b4b]">
        {/* Animated mesh gradient */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-text_secondary/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/15 rounded-full blur-[150px] animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse delay-500" />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>

      <article className="container mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-text_secondary font-medium mb-2 tracking-wider uppercase text-sm">
              Gallery
            </p>
            <h2 className="text-white text-5xl max-lg:text-4xl max-sm:text-2xl font-bold">
              {sectionTitle}
            </h2>
          </div>
          <Link
            href="/students/albums"
            className="group flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white hover:bg-white/10 transition-all max-sm:hidden"
          >
            <span className="font-medium">{t("all")}</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Scattered Gallery */}
        <div className="relative h-[700px] max-lg:h-[600px] max-sm:h-[500px]">
          <Image.PreviewGroup>
            <div ref={containerRef} className="relative w-full h-full">
              {currentPhotos.map((photo, index) => {
                const style = photoStyles[index] || photoStyles[0];
                const isActive = activeIndex === index;

                return (
                  <div
                    key={`${startIndex}-${index}`}
                    className="photo-card absolute w-[30%] max-lg:w-[40%] max-sm:w-[45%] cursor-pointer group"
                    style={{
                      top: style.top,
                      left: style.left,
                      zIndex: isActive ? 100 : style.z,
                      transform: `rotate(${isActive ? 0 : style.rotate}deg) scale(${isActive ? 1.1 : style.scale})`,
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                  >
                    {/* Polaroid frame */}
                    <div className={`
                      relative bg-white p-3 pb-14 rounded-sm shadow-2xl
                      transition-all duration-500
                      ${isActive ? "shadow-text_secondary/30 shadow-[0_25px_60px_-15px]" : "shadow-black/50"}
                    `}>
                      {/* Photo */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                        <Image
                          className="w-full h-full object-cover"
                          src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${photo.photo.file_path}`}
                          alt={photo.photo.file_name}
                          preview={{ mask: null }}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />

                        {/* Hover overlay */}
                        <div className={`
                          absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent
                          flex items-end justify-center pb-4
                          transition-opacity duration-300
                          ${isActive ? "opacity-100" : "opacity-0"}
                        `}>
                          <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                            <Plus className="w-4 h-4 text-white" />
                            <span className="text-white text-sm font-medium">View</span>
                          </div>
                        </div>
                      </div>

                      {/* Polaroid bottom text */}
                      <div className="absolute bottom-3 left-0 right-0 text-center">
                        <span className="text-gray-400 text-xs font-handwriting">
                          Nordic University
                        </span>
                      </div>

                      {/* Tape effect on some photos */}
                      {index % 2 === 0 && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-yellow-100/80 rotate-2 shadow-sm"
                          style={{ clipPath: "polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)" }}
                        />
                      )}
                    </div>

                    {/* Drop shadow */}
                    <div
                      className={`
                        absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-4 bg-black/20 rounded-full blur-md
                        transition-all duration-500
                        ${isActive ? "w-[80%] bg-text_secondary/30" : ""}
                      `}
                    />
                  </div>
                );
              })}
            </div>
          </Image.PreviewGroup>

          {/* Decorative elements */}
          <div className="absolute -bottom-10 left-10 w-20 h-20 border border-white/10 rounded-full animate-spin-slow" />
          <div className="absolute top-10 right-10 w-32 h-32 border border-text_secondary/20 rounded-full animate-spin-slow-reverse" />
        </div>

        {/* Mobile See All */}
        <div className="flex justify-center mt-8 sm:hidden">
          <Link
            href="/students/albums"
            className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white font-medium"
          >
            <span>{t("all")}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center items-center gap-3 mt-12">
          <span className="text-white/40 text-sm font-medium">
            {String(Math.floor(startIndex / 6) + 1).padStart(2, "0")}
          </span>
          <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-text_secondary to-cyan-400 rounded-full transition-all duration-500"
              style={{ width: `${((Math.floor(startIndex / 6) + 1) / Math.ceil(gallery.length / 6)) * 100}%` }}
            />
          </div>
          <span className="text-white/40 text-sm font-medium">
            {String(Math.ceil(gallery.length / 6)).padStart(2, "0")}
          </span>
        </div>
      </article>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.5; }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        .animate-spin-slow-reverse {
          animation: spin 25s linear infinite reverse;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .font-handwriting {
          font-family: 'Caveat', cursive, system-ui;
        }
      `}</style>
    </section>
  );
};

export default PhotoGallery;
