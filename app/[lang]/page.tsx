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

const getHome = async (lang: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/core/home-page?language=${lang}`,
    {
      cache: "no-cache",
    },
  );
  return await response.json();
};

export default async function Home() {
  const { sections } = await getHome(await getCurrentLangServer());
  return (
    <>
      <Hero />
      <NewsSlider
        sectionTitle={sections[SectionTypeEnum.NEWS].title}
        props={sections[SectionTypeEnum.NEWS].data}
      />
      <section className="bg-secondary-gradient py-14 shadow-inner  block max-lg:hidden">
        <DoubleSLider
          sectionTitle={sections[SectionTypeEnum.SCIENCE_EVENTS].title}
          reverseDirection={true}
          delay={2300}
          sliderName={"events-slider"}
          direction={Direction.horizontal}
          props={sections[SectionTypeEnum.SCIENCE_EVENTS].data}
        />
        <DoubleSLider
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
        />
      </section>
      <PhotoGallery />
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
