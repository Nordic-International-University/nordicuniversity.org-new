import React from "react";
import DynamicSubPage from "@/app/components/layouts/dynamic/DynamicSubPage";

const Page = () => {
  return (
    <DynamicSubPage
      transKey="student"
      broadCampTransKey="title"
      reduxSelector="studentsSidebarItems"
      pageSelector="students"
    />
  );
};

export default Page;
