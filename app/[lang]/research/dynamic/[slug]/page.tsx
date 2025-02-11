import React from "react";
import DynamicSubPage from "@/app/components/layouts/dynamic/DynamicSubPage";

const Page = () => {
  return (
    <DynamicSubPage
      transKey="research"
      broadCampTransKey="title"
      reduxSelector="researchSidebarItems"
      pageSelector="university"
    />
  );
};

export default Page;
