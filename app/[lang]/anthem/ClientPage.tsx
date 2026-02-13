"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  HiOutlinePlay,
  HiOutlinePause,
  HiOutlineMusicNote,
} from "react-icons/hi";

export default function AnthemPage() {
  const t = useTranslations("anthem");
  const locale = useLocale();

  const lyrics = t("lyrics");
  const lines = lyrics.split("\n");

  const audioFile =
    locale === "uz" ? "/NORDIK-MADHIYAS_.mp3" : "/new_madhiya.mp3";

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * duration;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  // Split lyrics into stanzas (separated by empty lines)
  const stanzas: string[][] = [];
  let current: string[] = [];
  lines.forEach((line) => {
    if (line.trim() === "") {
      if (current.length > 0) {
        stanzas.push(current);
        current = [];
      }
    } else {
      current.push(line);
    }
  });
  if (current.length > 0) stanzas.push(current);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 max-sm:py-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase mb-5"
            style={{
              backgroundColor: "rgba(11,64,117,0.06)",
              color: "rgba(11,64,117,0.5)",
            }}
          >
            <HiOutlineMusicNote className="text-sm" />
            {t("pageTitle")}
          </div>

          <h1 className="text-4xl max-sm:text-2xl font-bold text-text_secondary mb-6">
            {t("pageTitle")}
          </h1>

          {/* Author / Composer */}
          {locale === "uz" && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
              <span
                className="text-sm font-medium"
                style={{ color: "rgba(11,64,117,0.6)" }}
              >
                {t("author")}
              </span>
              <span
                className="hidden sm:block w-1 h-1 rounded-full"
                style={{ backgroundColor: "rgba(11,64,117,0.2)" }}
              />
              <span
                className="text-sm font-medium"
                style={{ color: "rgba(11,64,117,0.6)" }}
              >
                {t("composer")}
              </span>
            </div>
          )}
        </div>

        {/* Audio Player */}
        <div className="max-w-2xl mx-auto mb-16">
          <audio ref={audioRef} src={audioFile} preload="metadata" />

          <div
            className="rounded-2xl p-6 max-sm:p-4"
            style={{
              background: "rgba(11,64,117,0.03)",
              border: "1px solid rgba(11,64,117,0.06)",
            }}
          >
            <div className="flex items-center gap-5 max-sm:gap-3">
              {/* Play button */}
              <button
                onClick={togglePlay}
                className="w-14 h-14 max-sm:w-12 max-sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 hover:scale-105"
                style={{
                  background: "#0b4075",
                  boxShadow: "0 4px 16px rgba(11,64,117,0.25)",
                }}
              >
                {isPlaying ? (
                  <HiOutlinePause className="text-white text-xl" />
                ) : (
                  <HiOutlinePlay className="text-white text-xl ml-0.5" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                {/* Progress bar */}
                <div
                  className="w-full h-1.5 rounded-full cursor-pointer group"
                  style={{ backgroundColor: "rgba(11,64,117,0.08)" }}
                  onClick={handleSeek}
                >
                  <div
                    className="h-full rounded-full transition-all duration-100 relative"
                    style={{
                      width: `${progress}%`,
                      background: "#0b4075",
                    }}
                  >
                    <div
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        background: "#0b4075",
                        boxShadow: "0 0 6px rgba(11,64,117,0.3)",
                      }}
                    />
                  </div>
                </div>

                {/* Time */}
                <div className="flex justify-between mt-2">
                  <span
                    className="text-xs font-medium"
                    style={{ color: "rgba(11,64,117,0.4)" }}
                  >
                    {formatTime(currentTime)}
                  </span>
                  <span
                    className="text-xs font-medium"
                    style={{ color: "rgba(11,64,117,0.4)" }}
                  >
                    {formatTime(duration)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lyrics */}
        <div className="max-w-3xl mx-auto mb-16">
          <div
            className="rounded-2xl p-10 max-sm:p-6"
            style={{ border: "1px solid rgba(11,64,117,0.08)" }}
          >
            <div className="space-y-8">
              {stanzas.map((stanza, sIdx) => {
                const isChorus = stanza.some(
                  (l) =>
                    l.toLowerCase().includes("naqorat") ||
                    l.toLowerCase().includes("chorus") ||
                    l.toLowerCase().includes("припев"),
                );

                return (
                  <div key={sIdx} className="space-y-2">
                    {stanza.map((line, lIdx) => {
                      const isLabel =
                        line.toLowerCase().includes("naqorat") ||
                        line.toLowerCase().includes("chorus") ||
                        line.toLowerCase().includes("припев");

                      return (
                        <p
                          key={lIdx}
                          className={`text-center leading-relaxed ${
                            isLabel
                              ? "text-xs font-semibold uppercase tracking-widest mt-4 mb-1"
                              : isChorus
                                ? "text-xl max-sm:text-lg font-semibold text-text_secondary"
                                : "text-lg max-sm:text-base text-gray-700"
                          }`}
                          style={
                            isLabel
                              ? { color: "rgba(11,64,117,0.4)" }
                              : undefined
                          }
                        >
                          {line}
                        </p>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* About */}
        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-2xl p-10 max-sm:p-6"
            style={{
              background: "rgba(11,64,117,0.03)",
              border: "1px solid rgba(11,64,117,0.06)",
            }}
          >
            <h2 className="text-2xl max-sm:text-xl font-bold text-text_secondary mb-4">
              {t("aboutTitle")}
            </h2>
            <p
              className="text-base leading-relaxed whitespace-pre-line"
              style={{ color: "rgba(11,64,117,0.6)" }}
            >
              {t("aboutText")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
