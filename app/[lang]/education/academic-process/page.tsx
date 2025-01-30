import ClientPage from "@/app/[lang]/education/academic-process/ClientPage";
import { getAllAcademicProcesses } from "./getAllAcademicProcces";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xalqaro Nordik Universiteti - Hamkorlik Aloqalari",
  description:
    "Xalqaro Nordik Universitetining xalqaro hamkorlik aloqalari haqida batafsil ma'lumot. Hamkor universitetlar va o'quv dasturlari haqida bilib oling.",
  keywords:
    "hamkorlik, xalqaro aloqalar, universitet hamkorligi, ta'lim hamkorligi",
  openGraph: {
    title: "Xalqaro Nordik Universiteti - Hamkorlik Aloqalari",
    description:
      "Xalqaro Nordik Universitetining xalqaro hamkorlik aloqalari haqida batafsil ma'lumot.",
    url: "https://nordicuniversity.org/uz/partners/connections",
    type: "website",
    images: [
      {
        url: "/public/seo/b835e3f5732864ec87f6e171a6ae53bd.jpg",
        alt: "Hamkorlik Aloqalari",
      },
    ],
  },
  alternates: {
    languages: {
      uz: "https://nordicuniversity.org/uz/partners/connections",
      en: "https://nordicuniversity.org/en/partners/connections",
      ru: "https://nordicuniversity.org/ru/partners/connections",
    },
    canonical: "https://nordicuniversity.org/uz/partners/connections",
  },
  robots: "index, follow",
};

const Page = async () => {
  const initialData = await getAllAcademicProcesses(
    await getCurrentLangServer(),
    1,
    2,
  );

  return <ClientPage initialData={initialData} />;
};

export default Page;
