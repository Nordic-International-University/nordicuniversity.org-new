import React from "react";
import DynamicSubPage from "@/app/components/layouts/dynamic/DynamicSubPage";

const Page = () => {
  return (
    <DynamicSubPage
      transKey="education"
      broadCampTransKey="educationLevels.breadcrumb"
      reduxSelector="educationSidebarItems"
      pageSelector="education"
    />
  );
};

export default Page;
