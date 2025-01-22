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
      <section className="relative overflow-hidden shadow-inner block max-lg:hidden">
        <Image className="absolute" src={NordicPattern} alt="pattern" />
        <DoubleSLider
          url={{
            all: "/research/scientific-events",
            single: "/research/scientific-events",
          }}
          sectionTitle={sections[SectionTypeEnum.SCIENCE_EVENTS].title}
          reverseDirection={true}
          delay={2300}
          sliderName={"events-slider"}
          direction={Direction.horizontal}
          props={sections[SectionTypeEnum.SCIENCE_EVENTS].data}
        />
        <DoubleSLider
          url={{
            all: "/patents/connections",
            single: "/patents/connections",
          }}
          sliderName={"connection-slider"}
          sectionTitle={sections[SectionTypeEnum.COOPERATION_CONNECTIONS].title}
          reverseDirection={false}
          delay={1300}
          direction={Direction.vertical}
          props={sections[SectionTypeEnum.COOPERATION_CONNECTIONS].data}
        />
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
