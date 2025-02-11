import React from "react";
import DynamicSubPage from "@/app/components/layouts/dynamic/page";

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
