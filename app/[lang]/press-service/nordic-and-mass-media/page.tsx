import React from "react";
import ClientPage from "@/app/[lang]/press-service/nordic-and-mass-media/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import {
  nordicLife,
  nordicLiveJournalProps,
} from "@/types/templates/nordiklieve.types";
import { getAllMassMedia } from "@/app/[lang]/press-service/nordic-and-mass-media/api";

const Page = async () => {
  const data: nordicLiveJournalProps[] = await getAllMassMedia(
    await getCurrentLangServer(),
  );
  return <ClientPage props={data} />;
};

export default Page;
