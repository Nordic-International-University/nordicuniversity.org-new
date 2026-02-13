import React from "react";
import ClientPage from "@/app/[lang]/university/contacts/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { getAllContacts } from "@/app/[lang]/university/contacts/sendMessage";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Biz bilan bog'lanish - Nordik universiteti",
    description:
      "Nordik universiteti bilan bog'lanish uchun kerakli ma'lumotlarni ushbu sahifada topishingiz mumkin. Telefon raqamlarimiz, manzilimiz va elektron pochta orqali aloqa o'rnatishingiz mumkin.",
    lang: params.lang,
    path: "/university/contacts",
  });
}

const Page = async () => {
  const contacts = await getAllContacts(await getCurrentLangServer());

  return <ClientPage props={contacts} />;
};

export default Page;
