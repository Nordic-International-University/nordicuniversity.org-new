"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  HiOutlineGlobe,
  HiOutlineUserGroup,
  HiOutlineBookOpen,
  HiOutlineAcademicCap,
  HiOutlineExternalLink,
} from "react-icons/hi";

const About = () => {
  const t = useTranslations();

  const features = [
    {
      icon: HiOutlineGlobe,
      titleKey:
        "nordic_school.advantages.features.international_standards.title",
      descriptionKey:
        "nordic_school.advantages.features.international_standards.description",
    },
    {
      icon: HiOutlineUserGroup,
      titleKey:
        "nordic_school.advantages.features.qualified_teachers.title",
      descriptionKey:
        "nordic_school.advantages.features.qualified_teachers.description",
    },
    {
      icon: HiOutlineBookOpen,
      titleKey:
        "nordic_school.advantages.features.modern_education.title",
      descriptionKey:
        "nordic_school.advantages.features.modern_education.description",
    },
  ];

  const presidentImages = [
    "Screenshot_4.png",
    "Screenshot_5.png",
    "Screenshot_7.png",
    "Screenshot_8.png",
    "Screenshot_9.png",
    "Screenshot_11.png",
  ];

  return (
    <div className="bg-white">
      <div className="py-10 max-sm:py-6">
        {/* CTA Banner — Link to nordicschool.uz */}
        <div
          className="rounded-2xl p-6 max-sm:p-4 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            background: "linear-gradient(135deg, #0b4075 0%, #0d4f8f 100%)",
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              <HiOutlineExternalLink className="text-white text-xl" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg max-sm:text-base">
                {t("nordic_school.title")}
              </h3>
              <p
                className="text-sm mt-0.5"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                nordicschool.uz
              </p>
            </div>
          </div>
          <Link
            href="https://nordicschool.uz/"
            target="_blank"
            className="px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 flex-shrink-0 hover:scale-105"
            style={{
              backgroundColor: "rgba(255,255,255,0.15)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            {t("nordic_school.contact_button")}
            <HiOutlineExternalLink className="text-sm" />
          </Link>
        </div>

        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-3xl max-sm:text-2xl font-bold text-text_secondary mb-4">
            {t("nordic_school.title")}
          </h1>
          <p
            className="text-base max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(11,64,117,0.6)" }}
          >
            {t("nordic_school.description")}
          </p>
        </div>

        {/* Videos Grid */}
        <div
          className="rounded-2xl p-6 max-sm:p-4 mb-10"
          style={{
            backgroundColor: "rgba(11,64,117,0.03)",
            border: "1px solid rgba(11,64,117,0.06)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <h4
                className="text-sm font-medium mb-3 min-h-[40px] flex items-center"
                style={{ color: "rgba(11,64,117,0.7)" }}
              >
                {t("nordic_school.president_visit.subtitle")}
              </h4>
              <video
                src="/video/video.mp4"
                poster="/images/nordic-school-images/Screenshot_8.png"
                controls
                className="w-full h-56 rounded-xl object-cover"
              >
                Video yuklanmadi
              </video>
            </div>
            <div>
              <h4
                className="text-sm font-medium mb-3 min-h-[40px] flex items-center"
                style={{ color: "rgba(11,64,117,0.7)" }}
              >
                {t("nordic_school.videos.video1_title")}
              </h4>
              <iframe
                width="100%"
                height="224"
                src="https://www.youtube.com/embed/NXyolQ38gxM"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-xl"
              />
            </div>
            <div>
              <h4
                className="text-sm font-medium mb-3 min-h-[40px] flex items-center"
                style={{ color: "rgba(11,64,117,0.7)" }}
              >
                {t("nordic_school.videos.video2_title")}
              </h4>
              <iframe
                width="100%"
                height="224"
                src="https://www.youtube.com/embed/i0acMouzf3w"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-xl"
              />
            </div>
            <div>
              <h4
                className="text-sm font-medium mb-3 min-h-[40px] flex items-center"
                style={{ color: "rgba(11,64,117,0.7)" }}
              >
                {t("nordic_school.videos.video3_title")}
              </h4>
              <iframe
                width="100%"
                height="224"
                src="https://www.youtube.com/embed/-BK43uEb1bU"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* 3 Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {["/images/35.png", "/images/34.png", "/images/11.png"].map(
            (src, i) => (
              <div key={i} className="overflow-hidden rounded-2xl">
                <img
                  src={src}
                  alt={`Nordic School ${i + 1}`}
                  className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ),
          )}
        </div>

        {/* About & Goals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-10">
          <div
            className="rounded-2xl p-8 max-sm:p-5"
            style={{ border: "1px solid rgba(11,64,117,0.08)" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "rgba(11,64,117,0.06)" }}
              >
                <HiOutlineBookOpen
                  className="text-lg"
                  style={{ color: "#0b4075" }}
                />
              </div>
              <h3 className="text-xl font-bold text-text_secondary">
                {t("nordic_school.about.title")}
              </h3>
            </div>
            <p
              className="text-sm leading-relaxed mb-3"
              style={{ color: "rgba(11,64,117,0.6)" }}
            >
              {t("nordic_school.about.paragraph1")}
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgba(11,64,117,0.6)" }}
            >
              {t("nordic_school.about.paragraph2")}
            </p>
          </div>

          <div
            className="rounded-2xl p-8 max-sm:p-5"
            style={{ border: "1px solid rgba(11,64,117,0.08)" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "rgba(11,64,117,0.06)" }}
              >
                <HiOutlineAcademicCap
                  className="text-lg"
                  style={{ color: "#0b4075" }}
                />
              </div>
              <h3 className="text-xl font-bold text-text_secondary">
                {t("nordic_school.goals.title")}
              </h3>
            </div>
            <p
              className="text-sm leading-relaxed mb-3"
              style={{ color: "rgba(11,64,117,0.6)" }}
            >
              {t("nordic_school.goals.paragraph1")}
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgba(11,64,117,0.6)" }}
            >
              {t("nordic_school.goals.paragraph2")}
            </p>
          </div>
        </div>

        {/* President Visit Section */}
        <div className="mb-10">
          <h2 className="text-2xl max-sm:text-xl font-bold text-text_secondary text-center mb-8">
            {t("nordic_school.president_visit.title")}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {presidentImages.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-xl">
                <img
                  src={`/images/nordic-school-images/${image}`}
                  alt={`President visit ${index + 1}`}
                  className="w-full h-48 max-sm:h-32 object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>

          <div
            className="rounded-2xl p-8 max-sm:p-5"
            style={{
              backgroundColor: "rgba(11,64,117,0.03)",
              border: "1px solid rgba(11,64,117,0.06)",
            }}
          >
            <h4 className="text-lg font-semibold text-text_secondary mb-3">
              {t("nordic_school.president_visit.subtitle")}
            </h4>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgba(11,64,117,0.6)" }}
            >
              {t("nordic_school.president_visit.description")}
            </p>
          </div>
        </div>

        {/* Advantages */}
        <div className="mb-10">
          <h2 className="text-2xl max-sm:text-xl font-bold text-text_secondary text-center mb-8">
            {t("nordic_school.advantages.title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-2xl p-6 text-center transition-all duration-200 hover:-translate-y-1"
                style={{ border: "1px solid rgba(11,64,117,0.08)" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-5"
                  style={{ backgroundColor: "rgba(11,64,117,0.06)" }}
                >
                  <feature.icon
                    className="text-xl"
                    style={{ color: "#0b4075" }}
                  />
                </div>
                <h4 className="text-base font-semibold text-text_secondary mb-3">
                  {t(feature.titleKey)}
                </h4>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(11,64,117,0.6)" }}
                >
                  {t(feature.descriptionKey)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/nordic-school/contacts"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-white text-sm font-medium transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: "#0b4075",
              boxShadow: "0 4px 16px rgba(11,64,117,0.25)",
            }}
          >
            {t("nordic_school.contact_button")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
