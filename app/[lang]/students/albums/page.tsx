import React from "react";
import ClientPage from "@/app/[lang]/students/albums/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { getAllAlbums } from "@/app/[lang]/students/albums/getAllAlbums";

export const metadata = {
  title: "Fotojamlanma - Xalqaro Nordik Universiteti",
  description:
    "Xalqaro Nordik Universiteti talabalarining turli madaniy tadbirlarda va uchrashuvlarda olingan fotojamlanmalarini ko‘ring. Fotojamlanmalar orqali universitetning faoliyatini va talabalarining kun tartibini yaqindan bilib oling.",
  keywords: [
    "Fotojamlanma",
    "Talabalar fotojamlanmasi",
    "Madaniy tadbirlar fotolar",
    "Xalqaro Nordik Universiteti fotosuratlari",
    "Universitet fotolavhalari",
    "Talabalar uchrashuvlari fotolari",
  ],
  openGraph: {
    title: "Fotojamlanma - Xalqaro Nordik Universiteti",
    description:
      "Xalqaro Nordik Universiteti talabalarining turli madaniy tadbirlarda va uchrashuvlarda olingan fotojamlanmalarini ko‘ring. Fotojamlanmalar orqali universitetning faoliyatini va talabalarining kun tartibini yaqindan bilib oling.",
    url: "https://nordicuniversity.org/students/albums",
    type: "website",
  },
};

const Page = async () => {
  const data = await getAllAlbums({
    page: "1",
    limit: "9",
    lang: await getCurrentLangServer(),
  });

  return <ClientPage props={data} />;
};

export default Page;
