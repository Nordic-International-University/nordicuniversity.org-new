import NewsSlider from "@/app/components/templates/home/NewsSlider";
import DoubleSLider from "@/app/components/templates/home/doubleSLider";
import { Direction } from "@/types/templates/doubleSlider.types";
import Litsenziya from "@/app/components/templates/home/Litsenziya";
import PhotoGallery from "@/app/components/templates/home/photoGallery";
import PartnersSlider from "@/app/components/templates/home/partners";
import Events from "@/app/components/templates/home/Events";
import Hero from "@/app/components/main/Hero";
import { SectionTypeEnum } from "@/types/home/home.megaMenu.types";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import NordicPattern from "@/public/images/home-images/Nordic_patterns.jpg";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Xalqaro Nordik Universiteti",
  description:
    "Nordik Universiteti rasmiy veb-sahifasi. Universitetimiz haqida barcha yangiliklar, tadqiqotlar, ilmiy ishlanmalar, va boshqa yangiliklar haqida ma'lumot oling.",
  keywords: [
    "Nordik universiteti",
    "ta'lim",
    "ilmiy tadqiqotlar",
    "yangi texnologiyalar",
    "talabalar",
    "yurtimiz",
    "o'qish",
    "oliy ta'lim",
    "onlayn ta'lim",
    "ilmiy konferensiyalar",
    "rivojlanish",
  ],

  viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow",
  openGraph: {
    title: "Xalqaro nordik Universiteti",
    description: "Nordik Universiteti bosh sahifasi",
    url: "https://nordicuniversity.org/",
    locale: "uz_UZ",
  },
  twitter: {
    card: "summary_large_image",
    site: "https://nordicuniversity.org/",
    title: "Nordik Universiteti – O'qish va Tadqiqotlar",
    description: "Nordik Universiteti bosh sahifasi",
  },
};

const getHome = async (lang: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/core/home-page?language=${lang}`,
    {
      cache: "no-cache",
    },
  );
  return await response.json();
};

const getDocumentButtons = async (lang: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/university/normative-docs-types?language=${lang}`,
    {
      cache: "no-cache",
    },
  );
  return await response.json();
};

export default async function Home({ params: { lang } }: any) {
  if (!["en", "ru", "uz"].includes(lang)) {
    return notFound();
  }

  const documentButtons = await getDocumentButtons(lang);
  const { sections } = await getHome(await getCurrentLangServer());

  sections[SectionTypeEnum.NORMATIVE_DOCUMENTATION].data;
  return (
    <>
      <Hero />
      <NewsSlider
        sectionTitle={sections[SectionTypeEnum.NEWS].title}
        props={sections[SectionTypeEnum.NEWS].data}
      />
      <section className="relative overflow-hidden shadow-inner block max-lg:hidden py-16">
        {/* Animated Oriental Pattern Background */}
        <div className="absolute inset-0 bg-tertiary">
          {/* Pattern Layer 1 - Slow rotation */}
          <div className="absolute inset-0 opacity-[0.07]">
            <svg className="absolute -top-1/2 -left-1/4 w-[150%] h-[200%] animate-[spin_120s_linear_infinite]" viewBox="0 0 800 800">
              <defs>
                <pattern id="oriental1" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  {/* Islimiy pattern */}
                  <path d="M50 0 L50 20 M50 80 L50 100 M0 50 L20 50 M80 50 L100 50" stroke="#60A5FA" strokeWidth="1" fill="none"/>
                  <circle cx="50" cy="50" r="15" stroke="#3B82F6" strokeWidth="1.5" fill="none"/>
                  <circle cx="50" cy="50" r="8" stroke="#2563EB" strokeWidth="1" fill="none"/>
                  <path d="M35 35 Q50 20 65 35 Q80 50 65 65 Q50 80 35 65 Q20 50 35 35" stroke="#3B82F6" strokeWidth="1" fill="none"/>
                  {/* Corner ornaments */}
                  <path d="M0 0 Q25 10 25 25 Q10 25 0 0" stroke="#60A5FA" strokeWidth="0.8" fill="none"/>
                  <path d="M100 0 Q75 10 75 25 Q90 25 100 0" stroke="#60A5FA" strokeWidth="0.8" fill="none"/>
                  <path d="M0 100 Q25 90 25 75 Q10 75 0 100" stroke="#60A5FA" strokeWidth="0.8" fill="none"/>
                  <path d="M100 100 Q75 90 75 75 Q90 75 100 100" stroke="#60A5FA" strokeWidth="0.8" fill="none"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#oriental1)"/>
            </svg>
          </div>

          {/* Pattern Layer 2 - Floating elements */}
          <div className="absolute inset-0 opacity-[0.05]">
            <svg className="absolute top-0 right-0 w-full h-full animate-[pulse_8s_ease-in-out_infinite]" viewBox="0 0 600 600">
              <defs>
                <pattern id="oriental2" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
                  {/* Geometric star pattern */}
                  <polygon points="75,0 90,60 150,75 90,90 75,150 60,90 0,75 60,60" stroke="#3B82F6" strokeWidth="1" fill="none"/>
                  <circle cx="75" cy="75" r="25" stroke="#60A5FA" strokeWidth="0.8" fill="none"/>
                  <circle cx="75" cy="75" r="35" stroke="#2563EB" strokeWidth="0.5" fill="none"/>
                  {/* Small decorative elements */}
                  <circle cx="0" cy="0" r="5" stroke="#60A5FA" strokeWidth="0.5" fill="none"/>
                  <circle cx="150" cy="0" r="5" stroke="#60A5FA" strokeWidth="0.5" fill="none"/>
                  <circle cx="0" cy="150" r="5" stroke="#60A5FA" strokeWidth="0.5" fill="none"/>
                  <circle cx="150" cy="150" r="5" stroke="#60A5FA" strokeWidth="0.5" fill="none"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#oriental2)"/>
            </svg>
          </div>

          {/* Pattern Layer 3 - Diagonal movement */}
          <div className="absolute inset-0 opacity-[0.04] animate-[movePattern_30s_linear_infinite]">
            <svg className="w-[200%] h-[200%]" viewBox="0 0 400 400">
              <defs>
                <pattern id="oriental3" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                  {/* Traditional girih pattern */}
                  <path d="M40 0 L60 20 L60 60 L40 80 L20 60 L20 20 Z" stroke="#3B82F6" strokeWidth="1" fill="none"/>
                  <path d="M0 40 L20 20 M0 40 L20 60 M80 40 L60 20 M80 40 L60 60" stroke="#60A5FA" strokeWidth="0.8" fill="none"/>
                  <circle cx="40" cy="40" r="5" stroke="#2563EB" strokeWidth="1" fill="none"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#oriental3)"/>
            </svg>
          </div>

          {/* Gradient overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-tertiary via-transparent to-tertiary"/>
          <div className="absolute inset-0 bg-gradient-to-b from-tertiary/80 via-transparent to-tertiary/80"/>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <DoubleSLider
            url={{
              all: "/partners/connections",
              single: "/partners/connections",
            }}
            sliderName={"connection-slider"}
            sectionTitle={sections[SectionTypeEnum.COOPERATION_CONNECTIONS].title}
            reverseDirection={false}
            delay={3000}
            direction={Direction.vertical}
            props={sections[SectionTypeEnum.COOPERATION_CONNECTIONS].data}
          />
        </div>
      </section>
      <section className="container">
        <Litsenziya
          props={sections[SectionTypeEnum.NORMATIVE_DOCUMENTATION].data}
          sectionTitle={sections[SectionTypeEnum.NORMATIVE_DOCUMENTATION].title}
          documentButtons={documentButtons}
        />
      </section>
      <PhotoGallery
        sectionTitle={sections[SectionTypeEnum.PHOTO_ALBUM].title}
        gallery={sections[SectionTypeEnum.PHOTO_ALBUM].data}
      />
      <PartnersSlider
        sectionTitle={sections[SectionTypeEnum.PARTNERS].title}
        partners={sections[SectionTypeEnum.PARTNERS].data}
      />
      <Events
        props={sections[SectionTypeEnum.COOPERATION_FORUM_PROJECTS].data}
        sectionTitle={
          sections[SectionTypeEnum.COOPERATION_FORUM_PROJECTS].title
        }
      />
    </>
  );
}
