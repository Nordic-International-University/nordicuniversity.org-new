import news_image from "@/public/images/home-images/news-image.png";
import doubleImage1 from "@/public/images/home-images/ijfcs-35ann 1.png";
import doubleImage2 from "@/public/images/home-images/pexels-pixabay-158651 1.png";
import logo1 from "@/public/images/home-images/slider1.svg";
import logo2 from "@/public/images/home-images/slider2.svg";
import logo3 from "@/public/images/home-images/slider6.svg";
import logo4 from "@/public/images/home-images/slider4.svg";
import logo5 from "@/public/images/home-images/slider3.svg";
import litsenziya from "@/public/images/home-images/litsenziya.png";
import NewsSlider from "@/app/components/templates/NewsSlider";
import { newsSliderProps } from "@/types/templates/newsSlider.type";
import DoubleSLider from "@/app/components/templates/doubleSLider";
import {
  Direction,
  DoubleSliderTypes,
} from "@/types/templates/doubleSlider.types";
import Litsenziya from "@/app/components/templates/Litsenziya";
import PhotoGallery from "@/app/components/templates/photoGallery";
import PartnersSlider from "@/app/components/templates/partners";
import Events from "@/app/components/templates/Events";
import { EventsTypes } from "@/types/templates/events.types";

const newsSliderFakeData: Array<newsSliderProps> = [
  {
    image: news_image,
    description:
      "Ushbu nufuzli universitet XNUning bakalavriat va magistratura bosqichlarida bittadan bir yillik grand ajratiladi. Ushbu nufuzli universitet XNUning bakalavriat va magistratura bosqichlarida bittadan bir yillik grand ajratiladi. Ushbu nufuzli universitet XNUning bakalavriat va magistratura bosqichlarida bittadan bir yillik grand ajratiladi.",
    date: "Mart 26, 2024",
    subTitle: "Italiyaning Trento universitetida bir yil bepul ta’lim oling",
  },
  {
    image: news_image,
    description:
      "Ushbu nufuzli universitet XNUning bakalavriat va magistratura bosqichlarida bittadan bir yillik grand ajratiladi. Ushbu nufuzli universitet XNUning bakalavriat va magistratura bosqichlarida bittadan bir yillik grand ajratiladi. Ushbu nufuzli universitet XNUning bakalavriat va magistratura bosqichlarida bittadan bir yillik grand ajratiladi.",
    date: "Mart 26, 2024",
    subTitle: "Italiyaning Trento universitetida bir yil bepul ta’lim oling",
  },
  {
    image: news_image,
    description:
      "Ushbu nufuzli universitet XNUning bakalavriat va magistratura bosqichlarida bittadan bir yillik grand ajratiladi. Ushbu nufuzli universitet XNUning bakalavriat va magistratura bosqichlarida bittadan bir yillik grand ajratiladi. Ushbu nufuzli universitet XNUning bakalavriat va magistratura bosqichlarida bittadan bir yillik grand ajratiladi.",
    date: "Mart 26, 2024",
    subTitle: "Italiyaning Trento universitetida bir yil bepul ta’lim oling",
  },
  {
    image: news_image,
    description:
      "Ushbu nufuzli universitet XNUning bakalavriat va magistratura bosqichlarida bittadan bir yillik grand ajratiladi. Ushbu nufuzli universitet XNUning bakalavriat va magistratura bosqichlarida bittadan bir yillik grand ajratiladi. Ushbu nufuzli universitet XNUning bakalavriat va magistratura bosqichlarida bittadan bir yillik grand ajratiladi.",
    date: "Mart 26, 2024",
    subTitle: "Italiyaning Trento universitetida bir yil bepul ta’lim oling",
  },
];

const doubleSlider1: Array<DoubleSliderTypes> = [
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

export default function Home() {
  return (
    <>
      <NewsSlider sectionTitle="YANGILIKLAR" props={newsSliderFakeData} />
      <section className="bg-secondary-gradient block max-lg:hidden">
        <DoubleSLider
          reverseDirection={true}
          delay={2300}
          direction={Direction.horizontal}
          props={doubleSlider1}
        />
        <DoubleSLider
          reverseDirection={false}
          delay={1300}
          direction={Direction.vertical}
          props={doubleSlider1}
        />
      </section>
      <Litsenziya props={litsenziyarray} sectionTitle="Me’yoriy hujjatlar" />
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
