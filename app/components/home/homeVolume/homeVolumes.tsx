import React from "react";
import HomeVolumesClient from "@/app/components/home/homeVolume/HomeVolumesClient";

const fetchVolumes = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/volume`, {
      cache: "no-cache",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch articles");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};

const HomeVolumes = async () => {
  const data: any = await fetchVolumes();

  return <HomeVolumesClient volume={data} />;
};

export default HomeVolumes;
