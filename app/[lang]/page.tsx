import news_image from "@/public/images/home-images/news-image.png";
import doubleImage1 from "@/public/images/home-images/ijfcs-35ann 1.png";
import doubleImage2 from "@/public/images/home-images/pexels-pixabay-158651 1.png";
import logo1 from "@/public/images/home-images/slider1.svg";
import logo2 from "@/public/images/home-images/slider2.svg";
import logo3 from "@/public/images/home-images/slider6.svg";
import logo4 from "@/public/images/home-images/slider4.svg";
import logo5 from "@/public/images/home-images/slider3.svg";
import litsenziya from "@/public/images/home-images/litsenziya.png";
import NewsSlider from "@/app/components/templates/home/NewsSlider";
import { newsSliderProps } from "@/types/templates/newsSlider.type";
import DoubleSLider from "@/app/components/templates/home/doubleSLider";
import {
  Direction,
  DoubleSliderTypes,
} from "@/types/templates/doubleSlider.types";
import Litsenziya from "@/app/components/templates/home/Litsenziya";
import PhotoGallery from "@/app/components/templates/home/photoGallery";
import PartnersSlider from "@/app/components/templates/home/partners";
import Events from "@/app/components/templates/home/Events";
import { EventsTypes } from "@/types/templates/events.types";
import Hero from "@/app/components/main/Hero";
import getCurrentLang from "@/app/helpers/getCurrentLang";
import { SectionTypeEnum } from "@/types/home/home.megaMenu.types";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";

const doubleSlider1: Array<any> = [
  {
    image: doubleImage1,
    description:
      'Nº 057211 raqamli Guvohnomasi asosida "Nordic" ilmiy. amaliy elektron jurnalini nashr etish imkoniyatiga ega boldi.',
    date: "Mart 26, 2024",
    title: "Ilmiy tadbirlar",
  },
  {
    image: doubleImage2,
    description:
      "Ushbu nufuzli universitet XNUning bakalavriat va magistratura bosqichlarida bittadan bir yillik grand ajratiladi. Ushbu nufuzli universitet XNUning bakalavriat va magistratura bosqichlarida bittadan bir yillik grand ajratiladi. Ushbu nufuzli universitet XNUning bakalavriat va magistratura bosqichlarida bittadan bir yillik grand ajratiladi.",
    date: "Mart 26, 2024",
    title: "Italiyaning Trento universitetida bir yil bepul ta’lim oling",
  },
];

const litsenziyarray: any = [
  {
    image: litsenziya,
    alt: "litsenziya",
  },
  {
    image: litsenziya,
    alt: "litsenziya",
  },
  {
    image: litsenziya,
    alt: "litsenziya",
  },
  {
    image: litsenziya,
    alt: "litsenziya",
  },
];

const partnersFake = [
  {
    image: logo1,
    alt: "logo1",
  },
  {
    image: logo2,
    alt: "logo2",
  },
  {
    image: logo3,
    alt: "logo3",
  },
  {
    image: logo4,
    alt: "logo3",
  },
  {
    image: logo5,
    alt: "logo3",
  },
];

const eventFakeData: Array<EventsTypes> = [
  {
    title: "Algorithms of War: The Use of AI in Arned Confict",
    description: "Blavatnik school of Government (in person and online)",
    date: "08 APREL",
  },
  {
    title: "In conversation with our Sustainable Urban",
    description: "Department for Continuing Education - Online Event",
    date: "22 APREL",
  },
  {
    title: "Algorithms of War: The Use of AI in Arned Confict",
    description: "Blavatnik school of Government (in person and online)",
    date: "08 APREL",
  },
  {
    title: "Algorithms of War: The Use of AI in Arned Confict",
    description: "Blavatnik school of Government (in person and online)",
    date: "08 APREL",
  },
];

const getHome = async (lang: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/core/home-page?language=${lang}`,
  );
  return await response.json();
};

export default async function Home() {
  const { sections } = await getHome(getCurrentLangServer());
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
          direction={Direction.horizontal}
          props={sections[SectionTypeEnum.SCIENCE_EVENTS].data}
        />
        <DoubleSLider
          sectionTitle={
            sections[SectionTypeEnum.COOPERATION_FORUM_PROJECTS].title
          }
          reverseDirection={false}
          delay={1300}
          direction={Direction.vertical}
          props={sections[SectionTypeEnum.COOPERATION_FORUM_PROJECTS].data}
        />
      </section>
      <section className="container">
        <Litsenziya
          props={sections[SectionTypeEnum.NORMATIVE_DOCUMENTATION].data}
          sectionTitle={sections[SectionTypeEnum.NORMATIVE_DOCUMENTATION].title}
        />
      </section>
      <PhotoGallery />
      <PartnersSlider sectionTitle="Hamkorlarimiz" partners={partnersFake} />
      <Events
        props={eventFakeData}
        sectionTitle="Tadbirlar"
        sectionDescription="Bugungi forum ikki tomonlama savdo-iqtisodiy va sarmoyaviy hamkorlik, O'zbekiston va
      Estoniya."
      />
    </>
  );
}
