import ClientPage from "@/app/[lang]/admission/tuition-fees/ClientPage";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Ta'lim yo'nalishining kontrakt narxlari - Xalqaro Nordik Universiteti",
    description:
      "Xalqaro Nordik Universitetida bakalavr, magistratura va doktorantura dasturlarining kontrakt narxlari va davomiylik muddati haqida to'liq ma'lumot. Ta'lim yo'nalishlari, dasturlar va ularning narxlari bilan tanishing.",
    lang: params.lang,
    path: "/admission/tuition-fees",
  });
}

const Page = async () => {
  return <ClientPage />;
};

export default Page;
