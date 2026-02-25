"use client";

import Logo from "@/public/university_logo.svg";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SocialMedia from "@/app/components/UI/socialMedia";
import { useRouter } from "next/navigation";
import { getAllContacts } from "@/app/[lang]/university/contacts/sendMessage";
import getCurrentLangClient from "@/app/helpers/getCurrentLang";
import { useTranslations } from "next-intl";
import UzTopRating from "@/app/components/UI/ratingCard";
import {
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineLocationMarker,
  HiOutlineArrowRight,
} from "react-icons/hi";

const MainFooter = () => {
  const [inputText, setInputText] = useState("");
  const fullYear = new Date().getFullYear();
  const router = useRouter();
  const [data, setData] = useState<any>({
    phone_1: "",
    email_1: "",
    address: "",
  });
  const t = useTranslations("footer");

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllContacts(getCurrentLangClient());
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <footer className="mt-16">
      {/* Main footer */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #061428 0%, #0b3060 50%, #0a2448 100%)",
        }}
      >
        <div className="container py-16">
          <div className="grid grid-cols-12 gap-8 max-lg:gap-12">
            {/* Left: Logo + Contact info */}
            <div className="col-span-12 lg:col-span-4">
              <Image width={200} height={80} src={Logo.src} alt="Logo" />

              <p
                style={{ color: "rgba(255,255,255,0.5)" }}
                className="text-sm mt-6 leading-relaxed max-w-[300px]"
              >
                {t("excellence_in_teaching")}
              </p>

              <div className="flex flex-col gap-3.5 mt-8">
                <Link
                  href={`tel:${data.phone_1}`}
                  className="flex items-center gap-3 group"
                >
                  <span
                    className="w-9 h-9 flex items-center justify-center rounded-lg"
                    style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                  >
                    <HiOutlinePhone
                      style={{ color: "rgba(56,189,248,0.7)" }}
                      className="text-base"
                    />
                  </span>
                  <span
                    style={{ color: "rgba(255,255,255,0.7)" }}
                    className="text-sm group-hover:!text-white transition-colors"
                  >
                    {data.phone_1}
                  </span>
                </Link>

                <Link
                  href={`mailto:${data.email_1}`}
                  className="flex items-center gap-3 group"
                >
                  <span
                    className="w-9 h-9 flex items-center justify-center rounded-lg"
                    style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                  >
                    <HiOutlineMail
                      style={{ color: "rgba(56,189,248,0.7)" }}
                      className="text-base"
                    />
                  </span>
                  <span
                    style={{ color: "rgba(255,255,255,0.7)" }}
                    className="text-sm group-hover:!text-white transition-colors"
                  >
                    {data.email_1}
                  </span>
                </Link>

                {data.address && (
                  <div className="flex items-start gap-3">
                    <span
                      className="w-9 h-9 flex items-center justify-center rounded-lg flex-shrink-0"
                      style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                    >
                      <HiOutlineLocationMarker
                        style={{ color: "rgba(56,189,248,0.7)" }}
                        className="text-base"
                      />
                    </span>
                    <span
                      style={{ color: "rgba(255,255,255,0.7)" }}
                      className="text-sm leading-relaxed"
                    >
                      {data.address}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Center: Email form + ratings */}
            <div className="col-span-12 lg:col-span-4">
              <h3
                className="text-sm font-semibold uppercase tracking-wider mb-6"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                {t("email")}
              </h3>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (inputText.trim()) {
                    router.push(`/university/contacts?email=${inputText}`);
                  }
                }}
                className="flex gap-2"
              >
                <input
                  onChange={(e) => setInputText(e.target.value)}
                  value={inputText}
                  type="email"
                  placeholder="Mail@example.com"
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm text-white placeholder-white/30
                    focus:outline-none focus:ring-1 focus:ring-sky-400/30 transition-all"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg text-sm font-medium
                    transition-colors flex items-center gap-2"
                  style={{
                    backgroundColor: "rgba(56,189,248,0.15)",
                    color: "rgba(56,189,248,0.9)",
                  }}
                >
                  {t("send")}
                  <HiOutlineArrowRight className="text-sm" />
                </button>
              </form>

              {/* Ratings */}
              <div className="flex items-center justify-between gap-4 mt-8">
                <UzTopRating />
                <iframe
                  src="https://www.unirank.org/uz/uni/xalqaro-nordik-universiteti/ranking/"
                  width="150"
                  height="80"
                  frameBorder="0"
                  scrolling="no"
                  title="uniRank"
                  className="rounded"
                />
              </div>

              <Link
                target="_blank"
                href="https://old.nordicuniversity.org/"
                className="inline-flex items-center gap-1.5 mt-6 text-sm transition-colors"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                {t("old")}
                <HiOutlineArrowRight className="text-xs" />
              </Link>
            </div>

            {/* Right: Social + map */}
            <div className="col-span-12 lg:col-span-4">
              <h3
                className="text-sm font-semibold uppercase tracking-wider mb-6"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Social
              </h3>
              <SocialMedia color="white" />

              <div
                className="mt-8 rounded-xl overflow-hidden"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.2!2d69.2167!3d41.3111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b27e2049127%3A0xe21c98cd8cddb40!2sNordic%20International%20University!5e0!3m2!1sen!2s!4v1700000000000"
                  width="100%"
                  height="160"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Nordic University Map"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ backgroundColor: "#030f1f" }}>
        <div className="container">
          <div className="flex items-center justify-between py-4 max-lg:flex-col max-lg:gap-2">
            <p style={{ color: "rgba(255,255,255,0.35)" }} className="text-xs">
              &copy; {fullYear} {t("university_name")}. {t("rights_reserved")}
            </p>
            <p style={{ color: "rgba(255,255,255,0.25)" }} className="text-xs">
              {t("site_developers")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
