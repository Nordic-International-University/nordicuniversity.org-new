import ClientPage from "@/app/[lang]/admission/tuition-fees/ClientPage";

export const metadata = {
  title:
    "Ta'lim yo‘nalishining kontrakt narxlari - Xalqaro Nordik Universiteti",
  description:
    "Xalqaro Nordik Universitetida bakalavr, magistratura va doktorantura dasturlarining kontrakt narxlari va davomiylik muddati haqida to‘liq ma’lumot. Ta’lim yo‘nalishlari, dasturlar va ularning narxlari bilan tanishing.",
  keywords: [
    "Kontrakt narxlari",
    "Ta'lim yo‘nalishlari",
    "Bakalavr kontrakt",
    "Magistratura narxlari",
    "Doktorantura dasturlari",
    "Xalqaro Nordik Universiteti",
    "Ta’lim narxlari",
    "O‘quv reja",
  ],
  openGraph: {
    title:
      "Ta'lim yo‘nalishining kontrakt narxlari - Xalqaro Nordik Universiteti",
    description:
      "Xalqaro Nordik Universitetida bakalavr, magistratura va doktorantura dasturlarining kontrakt narxlari va davomiylik muddati haqida to‘liq ma’lumot. Ta’lim yo‘nalishlari, dasturlar va ularning narxlari bilan tanishing.",
    url: "https://nordicuniversity.org/admission/tuition-fees",
    type: "website",
  },
};

const Page = async () => {
  return <ClientPage />;
};

export default Page;
