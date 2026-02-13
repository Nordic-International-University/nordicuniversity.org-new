import ClientPage from "@/app/[lang]/university/advantages/ClientPage";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Xalqaro Nordic Universiteti Ustunliklari",
    description:
      "Xalqaro darajali diplom, malakali ustozlar, grantlar, chet elda o'quv dasturlari, double degree va Work & Travel imkoniyatlari bilan talabalarga keng imkoniyatlar taqdim etiladi.",
    lang: params.lang,
    path: "/university/advantages",
  });
}

export default async function AdvantagesPage() {
  return <ClientPage />;
}
