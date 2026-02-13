import React from "react";
import ClientPage from "@/app/[lang]/students/albums/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { getAllAlbums } from "@/app/[lang]/students/albums/getAllAlbums";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Fotojamlanma - Xalqaro Nordik Universiteti",
    description:
      "Xalqaro Nordik Universiteti talabalarining turli madaniy tadbirlarda va uchrashuvlarda olingan fotojamlanmalarini ko'ring. Fotojamlanmalar orqali universitetning faoliyatini va talabalarining kun tartibini yaqindan bilib oling.",
    lang: params.lang,
    path: "/students/albums",
  });
}

const Page = async () => {
  const data = await getAllAlbums({
    page: "1",
    limit: "9",
    lang: await getCurrentLangServer(),
  });

  return <ClientPage props={data} />;
};

export default Page;
