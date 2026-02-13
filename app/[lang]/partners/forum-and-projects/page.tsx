import React from "react";
import ClientPage from "@/app/[lang]/partners/forum-and-projects/ClientPage";
import { getAllMeeting } from "@/app/[lang]/partners/connections/getAllMeeting";
import { meetingType, timeFilter } from "@/types/api/apiTypes";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Forum va loyihalar - Xalqaro Nordik Universiteti",
    description: "Xalqaro Nordik Universitetining forum va loyihalari haqida ma'lumot.",
    lang: params.lang,
    path: "/partners/forum-and-projects",
  });
}

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
