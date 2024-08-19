"use client";
import React from "react";
import { useGetAllCategoryQuery } from "@/lib/query/category.query";
import RoundedSvg from "@/app/components/helpers/RoundeSvg";
import Image from "next/image";
import { useGetVolumesQuery } from "@/lib/query/volume.query";

const PublicationsClient = () => {

  const { data } = useGetAllCategoryQuery() ;


  const { data: volume } = useGetVolumesQuery()
  console.log(volume)
  return (
    <div>
      <div className="flex ">
        <div className="w-2/3 bg-amber-600 ">
          <RoundedSvg title={"Nashrlar"} />

          <div className="flex-col items-center justify-center w-full ">
            {volume?.map((item: any, index: number) => (

                <div key={index} className={"w-[500px] flex items-center "} >
                  <Image
                      src={`${"https://journal2.nordicun.uz"}${item?.image?.file_path}`}
                      width={540}
                      height={540}
                      alt="volume"
                      className="w-540px h-[540px] m-auto block"
                  />

                    <h1>{item.title}</h1>

                </div>
            ))}
          </div>
        </div>
        <div className=" w-1/3 bg-red-900">
          <RoundedSvg title="Asosiy Yo'nalishlar" />
          {data?.map((category: any) => (
            <div key={category.id}>
              <h2>{category.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicationsClient
