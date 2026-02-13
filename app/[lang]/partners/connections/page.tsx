import React from "react";
import ClientPage from "@/app/[lang]/partners/connections/ClientPage";
import { getAllMeeting } from "./getAllMeeting";
import { meetingType, timeFilter } from "@/types/api/apiTypes";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Xalqaro Nordik Universiteti - Hamkorlik Aloqalari",
    description:
      "Xalqaro Nordik Universitetining xalqaro hamkorlik aloqalari haqida batafsil ma'lumot. Hamkor universitetlar va o'quv dasturlari haqida bilib oling.",
    lang: params.lang,
    path: "/partners/connections",
  });
}

const Page = async () => {
  const initialData = await getAllMeeting({
    time: timeFilter.future,
    type: meetingType.CONNECTIONS,
    page: 1,
    limit: 2,
    lang: await getCurrentLangServer(),
  });

  return <ClientPage initialData={initialData} />;
};

export default Page;
