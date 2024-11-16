import React from "react";
import ClientPage from "@/app/[lang]/university/contacts/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { ContactInfo } from "@/types/templates/contacts.types";

const getAllContacts = async (lang: string): Promise<void> => {
  const response: Response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/core/contacts/user?language=${lang}`,
  );
  return await response.json();
};

const Page = async () => {
  const contacts = await getAllContacts(await getCurrentLangServer());

  return <ClientPage props={contacts} />;
};

export default Page;
