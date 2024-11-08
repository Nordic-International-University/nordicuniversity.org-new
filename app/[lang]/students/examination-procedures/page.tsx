import React from "react";
import ClientPage from "@/app/[lang]/students/examination-procedures/ClientPage";

const getAllPhotos = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/students/exam-procedures-photos?page=1&limit=10`,
  );
  return await response.json();
};

const Page = async () => {
  const photos = await getAllPhotos();

  return <ClientPage data={photos.data} />;
};

export default Page;
