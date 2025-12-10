"use client";

import React from "react";
import { useTranslations } from "next-intl";

export default function AnthemPage() {
    const t = useTranslations("anthem");

    // Get lyrics and split into lines
    const lyrics = t("lyrics");
    const lines = lyrics.split("\n");

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
            <div className="container mx-auto px-4 py-16">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-4xl font-bold text-[#1E4A7D] mb-6">
                        {t("pageTitle")}
                    </h1>
                    <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-[#1E4A7D] to-transparent mx-auto mb-8"></div>
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
                    <audio
                        controls
                        className="w-full anthem-audio"
                    >
                        <source src={t("audioFile")} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>

                {/* Lyrics Section - Simple static text */}
                <div className="max-w-6xl mx-auto">
                    <div className="space-y-4 md:space-y-6 text-center py-8">
                        {lines.map((line, index) => (
                            <div
                                key={index}
                                className="text-xl md:text-3xl lg:text-4xl leading-relaxed text-gray-700"
                            >
                                {line || "\u00A0"}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Decorative bottom element */}
                <div className="mt-24 mb-12 flex justify-center">
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
          color: #1E4A7D;
        }

        .anthem-audio::-webkit-media-controls-timeline {
          background: #cbd5e1;
          border-radius: 16px;
        }
      `}</style>
        </div>
    );
}
