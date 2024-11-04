import React from "react";
import ClientPage from "@/app/[lang]/partners/connections/ClientPage";
import { getAllMeeting } from "./getAllMeeting";
import { meetingType, timeFilter } from "@/types/api/apiTypes";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";

const Page = async () => {
  const initialData = await getAllMeeting({
    time: timeFilter.future,
    type: meetingType.CONNECTIONS,
    page: 1,
    limit: 2,
    lang: getCurrentLangServer(),
  });

  return <ClientPage initialData={initialData} />;
};

export default Page;
