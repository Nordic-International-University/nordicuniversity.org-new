"use client";
import React, { useEffect } from "react";
import RoundedSvg from "@/app/components/helpers/RoundeSvg";
import { useGetAllCategoryQuery } from "@/lib/query/category.query";
import PublicationsClient from "@/app/publications/PublicationsClient";

const Page = () => {
  const { data } = useGetAllCategoryQuery();

  return (
    <div className="container">

        <PublicationsClient />


    </div>
  );
};

export default Page;
