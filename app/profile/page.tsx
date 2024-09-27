"use client";

import React, { useEffect } from "react";
import ProfileClient from "@/app/profile/ProfileClient";
import noImag from "@/public/userAvatar2.png";
import Image from "next/image";
import Link from "next/link";
import { useGetAuthorProfileQuery } from "@/lib/query/myarticle.query";
import Cookies from "js-cookie";

const Page = () => {
  const token = Cookies.get("access_token");
  const { data: posts, refetch }: any = useGetAuthorProfileQuery(token);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="container mt-5">
      <div className="flex gap-3 max-sm:flex-col max-sm:justify-center">
        <div className="flex flex-col items-center justify-center rounded-lg p-4 px-8 shadow-md border max-sm:w-full w-[300px] h-[300px]">
          <div className="w-32 h-32 rounded-full flex items-center justify-center bg-gray-200">
            <Image src={noImag} alt="img" className="w-24 h-24" />
          </div>
          <h2 className="text-2xl font-bold mb-5 mt-3">
            {posts?.data?.full_name}
          </h2>
          <Link href={`/createarticle`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Maqola yuborish
            </button>
          </Link>
        </div>

        <div className="flex-1">
          {/* Profile information */}
          <div className="w-full bg-white p-4 grid grid-cols-4 gap-6 rounded-lg shadow-md max-sm:grid-cols-1">
            <div className="w-full">
              <h1 className="mr-2">Telefon Raqam:</h1>
              <span className="font-bold">
                {posts?.data?.phone_number}
              </span>
            </div>
            <div className="w-full">
              <h1 className="mr-2">Kasbi:</h1>
              <span className="font-bold">{posts?.data?.job}</span>
            </div>
            <div className="w-full">
              <h1 className="mr-2">Ish Joyi:</h1>
              <span className="font-bold">
                {posts?.data?.place_position}
              </span>
            </div>
            <div className="w-full">
              <h1 className="mr-2">Ilmiy Daraja:</h1>
              <span className="font-bold">
                {posts?.data?.science_degree}
              </span>
            </div>
          </div>
          <ProfileClient data={posts?.data} />
        </div>
      </div>
    </div>
  );
};

export default Page;
