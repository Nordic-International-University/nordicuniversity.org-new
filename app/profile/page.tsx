import React from "react";
import ProfileClient from "@/app/profile/ProfileClient";
import { cookies } from "next/headers";
import { FaUserAlt } from "react-icons/fa";
import noImag from "@/public/noUser.webp";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import Profilrticles from "@/app/register/Profilrticles";

const Page = async () => {
  const token = cookies().get("access_token")?.value;
  console.log(token);
  const headers = new Headers();
  if (token) {
    headers.append("Authorization", `${token}`);
  }

  const data = await fetch("https://journal2.nordicun.uz/author/profile", {
    headers,
  });
  let posts = await data.json();
  console.log("ProfileClient", posts);

  return (
      <div className="container">
        <div className="flex gap-2">
          <div className="flex flex-col items-center justify-center rounded-lg p-4 px-8 shadow-md">
            <div className="w-32 h-32 rounded-full flex items-center justify-center bg-gray-200">
              <Image src={noImag} alt="img" className="w-24 h-24" />
            </div>
            <h2 className="text-2xl font-bold mb-5">{posts?.data?.full_name}</h2>
            <Link href={"/"}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Maqola Yuklash
              </button>
            </Link>
          </div>

          <div className="flex-1">
            {/* Profile information */}
            <div className="w-full bg-white p-4 grid grid-cols-4 gap-6 rounded-lg shadow-md">
              <div className="w-full">
                <h1 className="text-[18px] mr-2">Telefon Raqam:</h1>
                <span className="text-[22px] font-bold">
                {posts.data.phone_number}
              </span>
              </div>
              <div className="w-full">
                <h1 className="text-[18px] mr-2">Kasbi:</h1>
                <span className="text-[22px] font-bold">{posts.data.job}</span>
              </div>
              <div className="w-full">
                <h1 className="text-[18px] mr-2">Ish Joyi:</h1>
                <span className="text-[22px] font-bold">
                {posts.data.place_position}
              </span>
              </div>
              <div className="w-full">
                <h1 className="text-[18px] mr-2">Ilmiy Daraja:</h1>
                <span className="text-[22px] font-bold">
                {posts.data.science_degree}
              </span>
              </div>
            </div>

            {/* Articles Table */}
            <div className="mt-8 bg-white shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Sarlavha
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Holati
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Kategoriyasi
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Yaratilgan vaqt
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    O‘qishlar soni
                  </th>
                </tr>
                </thead>
                <tbody>
                {posts.data.Articles.map((article: { title: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; status: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; category: { name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }; createdAt: string | number | Date | dayjs.Dayjs | null | undefined; viewsCount: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }, index: React.Key | null | undefined) => (
                    <tr key={index}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span className="text-[22px] font-bold overflow-hidden text-ellipsis break-words">
                        {article.title}
                      </span>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span className="text-[22px] font-bold">
                        {article.status}
                      </span>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span className="text-[22px] font-bold">
                        {article.category?.name}
                      </span>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span className="text-[22px] font-bold">
                        {dayjs(article.createdAt).format("YYYY-MM-DD HH:mm")}
                      </span>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span className="text-[22px] font-bold">
                        {article.viewsCount}
                      </span>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Page;


















