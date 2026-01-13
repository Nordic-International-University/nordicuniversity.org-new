"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";

export default function AnthemPage() {
  const t = useTranslations("anthem");
  const locale = useLocale();

  // Get lyrics and split into lines
  const lyrics = t("lyrics");
  const lines = lyrics.split("\n");

  // Determine audio file based on locale
  const audioFile =
    locale === "uz" ? "/NORDIK-MADHIYAS_.mp3" : "/new_madhiya.mp3";

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1E4A7D] mb-6">
            {t("pageTitle")}
          </h1>
          <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-[#1E4A7D] to-transparent mx-auto mb-8"></div>

          {/* Author and Composer Info - Only show in Uzbek */}
          {locale === "uz" && (
            <div className="max-w-3xl mx-auto space-y-2 mb-8">
              <p className="text-lg text-gray-700 font-medium">{t("author")}</p>
              <p className="text-lg text-gray-700 font-medium">
                {t("composer")}
              </p>
            </div>
          )}
        </div>

        {/* Audio Player Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="flex items-center justify-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-[#1E4A7D] to-[#164070] rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-12 h-12 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
              </svg>
            </div>
          </div>
          <audio controls className="w-full anthem-audio">
            <source src={audioFile} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>

        {/* Lyrics Section */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
            <div className="space-y-4 md:space-y-5 text-center">
              {lines.map((line, index) => (
                <div
                  key={index}
                  className={`text-lg md:text-2xl lg:text-3xl leading-relaxed ${
                    line.toLowerCase().includes("naqorat") ||
                    line.toLowerCase().includes("chorus")
                      ? "font-bold text-[#1E4A7D] mt-6 mb-2"
                      : "text-gray-700 font-medium"
                  }`}
                >
                  {line || "\u00A0"}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-[#1E4A7D] to-[#164070] rounded-3xl shadow-xl p-8 md:p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              {t("aboutTitle")}
            </h2>
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-lg md:text-xl leading-relaxed whitespace-pre-line">
                {t("aboutText")}
              </p>
            </div>
          </div>
        </div>

        {/* Decorative bottom element */}
        <div className="mt-16 flex justify-center">
          <div className="w-48 h-1 bg-gradient-to-r from-transparent via-[#1E4A7D]/30 to-transparent"></div>
        </div>
      </div>

      <style jsx global>{`
        .anthem-audio {
          height: 60px;
          border-radius: 16px;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          box-shadow: 0 4px 20px rgba(30, 74, 125, 0.1);
        }

        .anthem-audio::-webkit-media-controls-panel {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }

        .anthem-audio::-webkit-media-controls-play-button,
        .anthem-audio::-webkit-media-controls-current-time-display,
        .anthem-audio::-webkit-media-controls-time-remaining-display {
          color: #1e4a7d;
        }

        .anthem-audio::-webkit-media-controls-timeline {
          background: #cbd5e1;
          border-radius: 16px;
        }
      `}</style>
    </div>
  );
}
