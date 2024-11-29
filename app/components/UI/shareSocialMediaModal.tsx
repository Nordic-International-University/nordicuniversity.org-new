"use client";

import React, { useEffect, useState } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  MessageCircle,
  Copy,
  X,
} from "lucide-react";
import { PiTelegramLogo } from "react-icons/pi";
import { AiFillPrinter } from "react-icons/ai";
import { useTranslations } from "next-intl";

interface ShareModalProps {
  shareUrl: string;
  buttonText?: string;
  modalTitle?: string;
  platforms?: ("facebook" | "twitter" | "telegram" | "instagram")[];
}

export default function ShareModal({
  shareUrl,
  platforms = ["facebook", "twitter", "telegram", "instagram"],
}: ShareModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const t = useTranslations("shareModal");

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const shareToSocial = (platform: string) => {
    let url = "";
    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`;
        break;
      case "telegram":
        url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}`;
        break;
      case "instagram":
        copyToClipboard();
        return;
    }
    window.open(url, "_blank");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
    });
  };

  return (
    <>
      <div className="flex items-center gap-2 justify-between">
        <button
          onClick={() => setIsOpen(true)}
          className="px-3 py-2 bg-gray-50 rounded-xl w-full hover:bg-gray-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center"
          aria-label={t("buttonText")}
        >
          <PiTelegramLogo className="mr-2 text-blue-600" />
          {t("buttonText")}
        </button>
        <div
          onClick={() => window.print()}
          className="px-3 py-2 bg-gray-50 rounded-xl cursor-pointer w-full hover:bg-gray-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center"
        >
          <AiFillPrinter className="mr-2" />
          {t("print")}
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            className="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 ease-in-out"
            style={{
              animation: "modalAppear 0.3s ease-out",
            }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {t("modalTitle")}
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 rounded-full p-1"
                  aria-label="Yopish"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex items-center space-x-2 mb-6">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Ulashish uchun havola"
                />
                <button
                  onClick={copyToClipboard}
                  className={`p-2 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    copied
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  aria-label="Havolani nusxalash"
                >
                  <Copy className="h-5 w-5" />
                </button>
              </div>

              {copied && (
                <div className="text-green-500 text-sm mb-4 transition-opacity duration-300">
                  {t("copied")}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                {platforms.includes("facebook") && (
                  <button
                    onClick={() => shareToSocial("facebook")}
                    className="flex items-center justify-center p-3 bg-[#3b5998] text-white rounded-md hover:bg-[#3b5998]/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#3b5998] focus:ring-opacity-50"
                    aria-label="Facebook'da ulashish"
                  >
                    <Facebook className="h-6 w-6 mr-2" />
                    Facebook
                  </button>
                )}
                {platforms.includes("twitter") && (
                  <button
                    onClick={() => shareToSocial("twitter")}
                    className="flex items-center justify-center p-3 bg-[#1DA1F2] text-white rounded-md hover:bg-[#1DA1F2]/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:ring-opacity-50"
                    aria-label="Twitter'da ulashish"
                  >
                    <Twitter className="h-6 w-6 mr-2" />
                    Twitter
                  </button>
                )}
                {platforms.includes("telegram") && (
                  <button
                    onClick={() => shareToSocial("telegram")}
                    className="flex items-center justify-center p-3 bg-[#0088cc] text-white rounded-md hover:bg-[#0088cc]/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#0088cc] focus:ring-opacity-50"
                    aria-label="Telegram'da ulashish"
                  >
                    <MessageCircle className="h-6 w-6 mr-2" />
                    Telegram
                  </button>
                )}
                {platforms.includes("instagram") && (
                  <button
                    onClick={() => shareToSocial("instagram")}
                    className="flex items-center justify-center p-3 bg-gradient-to-br from-[#405DE6] via-[#5851DB] via-[#833AB4] via-[#C13584] via-[#E1306C] via-[#FD1D1D] to-[#F56040] text-white rounded-md hover:opacity-90 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                    aria-label="Instagram'da ulashish"
                  >
                    <Instagram className="h-6 w-6 mr-2" />
                    Instagram
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes modalAppear {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}
