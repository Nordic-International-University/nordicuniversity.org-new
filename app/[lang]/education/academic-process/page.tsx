import ClientPage from "@/app/[lang]/education/academic-process/ClientPage";
import { getAllAcademicProcesses } from "./getAllAcademicProcces";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Xalqaro Nordik Universiteti - Akademik jarayonlar",
    description:
      "Xalqaro Nordik Universitetining akademik jarayonlari haqida batafsil ma'lumot.",
    lang: params.lang,
    path: "/education/academic-process",
  });
}

const Page = async () => {
  const initialData = await getAllAcademicProcesses(
    await getCurrentLangServer(),
    1,
    2,
  );

  return <ClientPage initialData={initialData} />;
};

export default Page;
