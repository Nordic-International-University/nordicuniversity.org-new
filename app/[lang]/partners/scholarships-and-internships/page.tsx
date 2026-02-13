import React from "react";
import ClientPage from "@/app/[lang]/partners/scholarships-and-internships/ClientPage";
import { getAllMeeting } from "@/app/[lang]/partners/connections/getAllMeeting";
import { meetingType, timeFilter } from "@/types/api/apiTypes";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Grantlar va stajirovkalar - Xalqaro Nordik Universiteti",
    description: "Xalqaro Nordik Universitetining grant va stajirovka dasturlari haqida ma'lumot.",
    lang: params.lang,
    path: "/partners/scholarships-and-internships",
  });
}

const Page = async () => {
  const initialData = await getAllMeeting({
    time: timeFilter.future,
    type: meetingType.SCHOLARSHIPS_AND_INTERNSHIPS,
    page: 1,
    limit: 2,
    lang: await getCurrentLangServer(),
  });

  return <ClientPage initialData={initialData} />;
};

export default Page;
