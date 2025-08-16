import ClientPage from "@/app/[lang]/university/nordic-way/ClientPage";

export const metadata = {
  title: "Xalqaro Nordic Universiteti Ustunliklari",
  description:
    "Xalqaro darajali diplom, malakali ustozlar, grantlar, chet elda o‘quv dasturlari, double degree va Work & Travel imkoniyatlari bilan talabalarga keng imkoniyatlar taqdim etiladi.",
  keywords:
    "Xalqaro darajali diplom, malakali ustozlar, grantlar, chet elda o‘quv dasturlari, double degree, joint degree, Work & Travel, talaba grantlari, Yevropa universitetlari, Finlandiya o‘quv dasturlari, Nordik universiteti ustunliklari, xalqaro ta'lim, o‘quv grantlari, o‘quv dasturlari, talaba imkoniyatlari, Yevropada ta'lim, ta'lim darajalari, yuqori sifatli ta'lim, professional o‘qituvchilar, xalqaro grantlar, chet elda o‘qish, talabalarga yordam, ta'limda innovatsiyalar, talaba yutuqlari, o‘quv imkoniyatlari, Yevropada ish tajribasi, Work & Travel imkoniyatlari, o‘qish va ishlash, talaba muvaffaqiyati, Yevropada yashash va ishlash, talaba uchun qo‘llab-quvvatlash",
  openGraph: {
    title: "Xalqaro Nordic Universiteti Ustunliklari",
    description:
      "Nordic universiteti talabalarga xalqaro darajali diplom, malakali ustozlar, grantlar, va boshqa ajoyib imkoniyatlar taqdim etadi.",
    url: "https://nordicuniversity.org/university/advantages",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xalqaro Nordic Universiteti Ustunliklari",
    description:
      "Yevropada tan olingan diplom, malakali professorlar va boshqa ko‘plab imkoniyatlar haqida batafsil ma'lumot.",
  },
};

export default async function AdvantagesPage() {
  return <ClientPage />;
}
