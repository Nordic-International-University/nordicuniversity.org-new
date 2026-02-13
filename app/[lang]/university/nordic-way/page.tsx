import ClientPage from "@/app/[lang]/university/nordic-way/ClientPage";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Nordik yo'li - Xalqaro Nordik Universiteti",
    description: "Xalqaro Nordik Universitetining Nordik yo'li haqida ma'lumot.",
    lang: params.lang,
    path: "/university/nordic-way",
  });
}

export default async function AdvantagesPage() {
  return <ClientPage />;
}
