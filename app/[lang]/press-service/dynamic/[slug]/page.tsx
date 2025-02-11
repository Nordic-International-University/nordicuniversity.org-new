import React from "react";
import DynamicSubPage from "@/app/components/layouts/dynamic/page";

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
