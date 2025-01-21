import React from "react";
import ClientPage from "@/app/[lang]/research/certificates/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import {
  nordicLife,
  nordicLiveJournalProps,
} from "@/types/templates/nordiklieve.types";
import { getPatents } from "@/app/[lang]/research/certificates/api";

const Page = async () => {
  const data: nordicLife<nordicLiveJournalProps> = await getPatents(
    await getCurrentLangServer(),
    1,
    6,
  );
  return <ClientPage props={data} />;
};

export default Page;
