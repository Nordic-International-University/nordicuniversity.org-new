import ClientPage from "@/app/[lang]/research/scientific-council/ClientPage";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Ilmiy kengash - Xalqaro Nordik Universiteti",
    description: "Xalqaro Nordik Universitetining ilmiy kengashi.",
    lang: params.lang,
    path: "/research/scientific-council",
  });
}

const Page = async () => {
  return <ClientPage />;
};

export default Page;
