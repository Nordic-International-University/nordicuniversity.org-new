import React from "react";
import ClientPage from "@/app/[lang]/university/documents/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Xalqaro Nordic Universiteti - Meyoriy Hujjatlar",
    description:
      "Xalqaro Nordic Universiteti uchun barcha meyoriy hujjatlar: Nizom, Litsenziya, Sertifikat va boshqalar.",
    lang: params.lang,
    path: "/university/documents",
  });
}

const getHome = async (lang: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/core/home-page?language=${lang}`,
  );
  return await response.json();
};

const getDocumentButtons = async (lang: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/university/normative-docs-types?language=${lang}`,
  );
  return await response.json();
};

const Page = async () => {
  const { sections } = await getHome(await getCurrentLangServer());
  const documentButtons = await getDocumentButtons(
    await getCurrentLangServer(),
  );
  return <ClientPage props={sections} documentButtons={documentButtons} />;
};

export default Page;
