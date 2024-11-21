import React from "react";
import ClientPage from "@/app/[lang]/research/scientific-conferences/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { getAllEvents } from "@/app/[lang]/research/scientific-events/getAllEvents";

const Page = async () => {
  const lang = await getCurrentLangServer();
  const data = await getAllEvents(lang, "EVENTS", 1, 100, "past");

  return <ClientPage initialData={data} />;
};

export default Page;
