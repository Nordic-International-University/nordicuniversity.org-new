import React from "react";
import ClientPage from "@/app/[lang]/research/scientific-events/ClientPage";
import { getAllEvents } from "@/app/[lang]/research/scientific-events/getAllEvents";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";

export const metadata = {
  title: "Ilmiy tadbirlar - Xalqaro Nordik Universiteti",
  description:
    "Xalqaro Nordik Universiteti tomonidan tashkil etilgan ilmiy tadbirlar: kelgusi va o‘tgan tadbirlar to‘g‘risida to‘liq ma’lumot. Tadbirlar professorlar, ilmiy izlanuvchilar va talabalar uchun o‘zaro tajriba almashish hamda yangi ilmiy natijalarni taqdim etish imkoniyatini yaratadi.",
  keywords: [
    "Ilmiy tadbirlar",
    "O‘tgan tadbirlar",
    "Kelgusi tadbirlar",
    "Xalqaro tadbirlar",
    "Ilmiy konferensiyalar",
    "Universitet ilmiy tadbirlari",
    "Seminarlar va treninglar",
    "Innovatsion tadbirlar",
    "Ilmiy forumlar",
    "O‘zbekiston ilmiy tadbirlari",
    "Xalqaro Nordik Universiteti tadbirlari",
    "Professor va talabalar uchun tadbirlar",
    "Ilmiy izlanishlar taqdimoti",
    "Ilmiy hamkorlik",
    "Tadqiqot va rivojlanish",
    "Ilmiy yutuqlar",
    "Xalqaro konferensiyalar",
  ],
  openGraph: {
    title: "Ilmiy tadbirlar - Xalqaro Nordik Universiteti",
    description:
      "Xalqaro Nordik Universiteti tomonidan tashkil etilgan ilmiy tadbirlar: kelgusi va o‘tgan tadbirlar to‘g‘risida to‘liq ma’lumot. Tadbirlar professorlar, ilmiy izlanuvchilar va talabalar uchun o‘zaro tajriba almashish hamda yangi ilmiy natijalarni taqdim etish imkoniyatini yaratadi.",
    url: "https://nordicuniversity.org/research/scientific-events",
    type: "website",
  },
};

const Page = async () => {
  const lang = await getCurrentLangServer();
  const data = await getAllEvents(lang, "EVENTS", 1, 100, "past");
  return <ClientPage initialData={data} />;
};

export default Page;
