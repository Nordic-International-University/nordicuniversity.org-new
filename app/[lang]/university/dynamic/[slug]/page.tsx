import React from "react";
import DynamicSubPage from "@/app/components/layouts/dynamic/page";

const Page = () => {
  return (
    <DynamicSubPage
      transKey="university.document"
      broadCampTransKey="university"
      reduxSelector="documentsSidebarItem"
      pageSelector="university"
    />
  );
};

export default Page;
