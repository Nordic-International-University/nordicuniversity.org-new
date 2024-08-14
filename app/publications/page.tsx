"use client";
import React, { useEffect } from "react";
import RoundedSvg from "@/app/components/helpers/RoundeSvg";
import { useGetAllCategoryQuery } from "@/lib/query/category.query";

const Page = () => {
  // @ts-ignore
  const { data } = useGetAllCategoryQuery() as categoryType;

  return (
    <div className="container">
      <div className="flex justify-between">
        <div>
          <RoundedSvg title="Nashrlar" />
          {data?.map((category: any) => (
            <div key={category.id}>
              <h2>{category.name}</h2>
              {/* Вы можете добавить и другие данные, например, file_id, createdAt */}
            </div>
          ))}
        </div>
        <div>
          <RoundedSvg title="Asosiy Yonalishlar" />
        </div>
      </div>
    </div>
  );
};

export default Page;
