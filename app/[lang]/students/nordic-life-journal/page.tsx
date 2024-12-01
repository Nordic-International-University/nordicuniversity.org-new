import React from "react";
import ClientPage from "@/app/[lang]/students/nordic-life-journal/ClientPage";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { getLiveJournals } from "@/app/[lang]/students/nordic-life-journal/getAllJournal";

export const metadata = {
  title: "Nordik Life jurnal - Xalqaro Nordik Universiteti",
  description:
    "Xalqaro Nordik Universiteti talabalari uchun Nordik Life jurnalida universitetdagi hayot, tajribalar va talabalik yillari haqida maqolalar va voqealar.",
  keywords: [
    "Nordik Life jurnal",
    "Nordik universiteti hayoti",
    "Xalqaro universitet jurnal",
    "Talabalar jurnal",
    "Nordik universiteti yangiliklari",
    "Talabalar tajribalari",
    "Xalqaro talabalik",
    "Universitetdagi hayot",
    "Nordik universitetining yillik jurnal",
    "Xalqaro Nordik Universiteti jurnal",
  ],
  openGraph: {
    title: "Nordik Life jurnal - Xalqaro Nordik Universiteti",
    description:
      "Xalqaro Nordik Universiteti talabalari uchun Nordik Life jurnalida universitetdagi hayot, tajribalar va talabalik yillari haqida maqolalar va voqealar.",
    url: "https://nordicuniversity.org/students/nordic-life-journal",
    type: "website",
  },
};

const Page = async () => {
  const data = await getLiveJournals({
    page: "1",
    limit: "1000",
    lang: await getCurrentLangServer(),
  });

  return <ClientPage props={data} />;
};

export default Page;
