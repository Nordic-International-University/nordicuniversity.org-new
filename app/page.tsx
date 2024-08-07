import Image from "next/image";
import HomePageCard from "@/app/components/home/HomePageCard";
import HomeSlider from "@/app/components/home/HomeSLider";

export default function Home() {
  return (
    <main>
      <HomeSlider />
      <HomePageCard />{" "}
    </main>
  );
}
