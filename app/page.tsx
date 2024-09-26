
import HomePageCard from "@/app/components/home/homeCard/HomePageCard";
import HomeSlider from "@/app/components/home/HomeSLider";
import HomeVolumes from "@/app/components/home/homeVolume/homeVolumes";


export const metadata = {
  title: 'Nordik jurnal  - Bosh Sahifa',
  description: 'Xalqaro Nordik Universiteti haqida yangiliklar va ilmiy jurnallar.',
  keywords: ['Nordik universiteti', 'ilmiy jurnal', 'universitet yangiliklari'],
  openGraph: {
    title: 'Nordik jurnal - Bosh Sahifa',
    description: 'Nordik jurnal haqida so‘nggi yangiliklar va ilmiy jurnallar.',
    url: 'https://www.nordikuniversity.uz/',
    images: [
      {
        url: '/public/mobile_image.webp',
        width: 800,
        height: 600,
        alt: 'Nordik jurnal rasmiy veb sahifasi',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@NordikUniversitet',
    title: 'Nordik jurnal',
    description: 'Nordik jurnal yangiliklari va ilmiy jurnallari bilan tanishing.',
    images: 'https://www.nordikuniversity.uz/images/og-image.jpg',
  },
};


export default function Home() {
  return (
    <>
      <main>
        <HomeSlider />
        <HomePageCard />
        <HomeVolumes />
      </main>
    </>
  );
}
