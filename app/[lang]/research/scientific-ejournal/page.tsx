import React from "react";
import ClientPage from "@/app/[lang]/research/scientific-ejournal/ClientPage";

const getAllVolumes = async () => {
  try {
    const response = await fetch(
      `${process.env["NEXT_PUBLIC_URL_JOURNAL"]}/volume`,
      {
        next: { revalidate: 60 },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch volumes: ${response.statusText}`);
    }

    const json = await response.json();
    return json || [];
  } catch (error) {
    console.error("Error fetching volumes:", error);
    return [];
  }
};

const Page = async () => {
  const volumes = await getAllVolumes();
  return <ClientPage data={volumes} />;
};

export default Page;
