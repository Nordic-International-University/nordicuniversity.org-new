import React from "react";
import ClientPage from "@/app/[lang]/research/tasimo-olympiad/ClientPage";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "TASIMO Olimpiadasi - Xalqaro Nordik Universiteti",
    description: "Xalqaro Nordik Universitetining TASIMO Olimpiadasi haqida ma'lumot.",
    lang: params.lang,
    path: "/research/tasimo-olympiad",
  });
}

const Page = async () => {
  return <ClientPage />;
};

export default Page;
