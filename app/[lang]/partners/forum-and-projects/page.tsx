import React from "react";
import ClientPage from "@/app/[lang]/partners/forum-and-projects/ClientPage";
import { getAllMeeting } from "@/app/[lang]/partners/connections/getAllMeeting";
import { meetingType, timeFilter } from "@/types/api/apiTypes";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";

const Page = async () => {
  const initialData = await getAllMeeting({
    time: timeFilter.future,
    type: meetingType.FORUM_AND_PROJECTS,
    page: 1,
    limit: 2,
    lang: await getCurrentLangServer(),
  });

  return <ClientPage initialData={initialData} />;
};

export default Page;
