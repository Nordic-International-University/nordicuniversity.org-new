import Image from "next/image";
import HomePageCard from "@/app/components/home/HomePageCard";
import HomeSlider from "@/app/components/home/HomeSLider";

export default function Home() {
  return (
    <main className="">
      <HomeSlider />
      <h1 className={"text-yellow-500 text-8xl"}>hiiii</h1>
      <HomePageCard />{" "}
    </main>
  );
}
