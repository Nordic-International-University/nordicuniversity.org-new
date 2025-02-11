import React from "react";
import DynamicSubPage from "@/app/components/layouts/dynamic/DynamicSubPage";

const Page = () => {
  return (
    <DynamicSubPage
      transKey="press-service"
      broadCampTransKey="title"
      reduxSelector="pressServiceSidebarItems"
      pageSelector="press_service"
    />
  );
};

export default Page;
