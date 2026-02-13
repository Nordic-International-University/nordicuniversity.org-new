import React from "react";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { getAllContacts } from "@/app/[lang]/university/contacts/sendMessage";
import ClientPage from "@/app/[lang]/nordic-school/gallery/ClientPage";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Nordic School fotogalereya - Nordik universiteti",
    description: "Nordic School fotogalereya.",
    lang: params.lang,
    path: "/nordic-school/gallery",
  });
}

const Page = async () => {
  const contacts = await getAllContacts(await getCurrentLangServer());

  return <ClientPage props={contacts} />;
};

export default Page;
