import ClientPage from "@/app/[lang]/education/contract-prices/ClientPage";
import { buildSeoMetadata } from "@/app/helpers/seoMetadata";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return buildSeoMetadata({
    title: "Ta'lim yo'nalishining kontrakt narxlari - Xalqaro Nordik Universiteti",
    description:
      "Xalqaro Nordik Universitetida bakalavr, magistratura va doktorantura dasturlarining kontrakt narxlari va davomiylik muddati haqida to'liq ma'lumot. Ta'lim yo'nalishlari, dasturlar va ularning narxlari bilan tanishing.",
    lang: params.lang,
    path: "/education/contract-prices",
  });
}

const Page = async () => {
  return <ClientPage />;
};

export default Page;
