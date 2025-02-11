import React from "react";
import DynamicSubPage from "@/app/components/layouts/dynamic/DynamicSubPage";

const Page = () => {
  return (
    <DynamicSubPage
      transKey="admission"
      broadCampTransKey="title"
      reduxSelector="admissionSidebarItems"
      pageSelector="admission"
    />
  );
};

export default Page;
