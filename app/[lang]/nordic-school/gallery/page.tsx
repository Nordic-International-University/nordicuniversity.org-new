import React from "react";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { getAllContacts } from "@/app/[lang]/university/contacts/sendMessage";
import ClientPage from "@/app/[lang]/nordic-school/gallery/ClientPage";

export const metadata = {
  title: "Biz bilan bog'lanish - Nordik universiteti",
  description:
    "Nordik universiteti bilan bog'lanish uchun kerakli ma'lumotlarni ushbu sahifada topishingiz mumkin. Telefon raqamlarimiz, manzilimiz va elektron pochta orqali aloqa o'rnatishingiz mumkin.",
  alternates: {
    canonical: "https://nordicuniversity.org/uz/university/contacts",
  },
  openGraph: {
    title: "Biz bilan bog'lanish - Nordic International University",
    description:
      "Nordik universiteti bilan bog'lanish uchun kerakli ma'lumotlarni ushbu sahifada topishingiz mumkin. Telefon raqamlarimiz, manzilimiz va elektron pochta orqali aloqa o'rnatishingiz mumkin.",
    url: "https://nordicuniversity.org/uz/university/contacts",
    siteName: "Nordic International University",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Biz bilan bog'lanish - Nordik universiteti",
    description:
      "Nordic International University bilan bog'lanish uchun kerakli ma'lumotlarni ushbu sahifada topishingiz mumkin. Telefon raqamlarimiz, manzilimiz va elektron pochta orqali aloqa o'rnatishingiz mumkin.",
  },
};

const Page = async () => {
  const contacts = await getAllContacts(await getCurrentLangServer());

  return <ClientPage props={contacts} />;
};

export default Page;
