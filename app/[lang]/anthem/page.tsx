import ClientPage from "@/app/[lang]/anthem/ClientPage";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Madhiya - Xalqaro Nordik Universiteti",
    description: "Xalqaro Nordik Universitetining madhiyasi.",
    lang: params.lang,
    path: "/anthem",
  });
}

export default function Page() {
  return <ClientPage />;
}
