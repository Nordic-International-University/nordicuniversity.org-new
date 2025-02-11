import React from "react";
import DynamicSubPage from "@/app/components/layouts/dynamic/DynamicSubPage";

const Page = () => {
  return (
    <DynamicSubPage
      transKey="partners"
      broadCampTransKey="title"
      reduxSelector="educationSidebarItems"
      pageSelector="partners"
    />
  );
};

export default Page;
