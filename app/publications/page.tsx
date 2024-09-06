import React from "react";
import RoundedSvg from "@/app/components/helpers/RoundeSvg";
import Image from "next/image";
import moment from "moment/moment";
import { FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";

async function getVolume() {
  const res = await fetch("https://journal2.nordicun.uz/volume");
  const data = await res.json();

  return data;
}

async function fetchCategoriesWithArticles() {
  const resCategories = await fetch("https://journal2.nordicun.uz/category");
  if (!resCategories.ok) {
    throw new Error('Failed to fetch categories');
  }
  const categories = await resCategories.json();

  const categoriesWithArticles = await Promise.all(
      categories.map(async (category:any) => {
        const resArticles = await fetch(
            `https://journal2.nordicun.uz/article/user/category/${category.id}`
        );
        const articles = await resArticles.json();
        return {
          ...category,
          articlesCount: articles.length,
        };
      })
  );

  return categoriesWithArticles;
}
const PublicationsClient = async () => {
  const data: any = await fetchCategoriesWithArticles();
  const volume: any = await getVolume();

  return (
    <div className="container">
      <div className="flex max-xl:flex-col max-xm:w-full">
        <div className="w-full mr-7 ">
          <RoundedSvg title={"Nashrlar"} />

          <div className="flex-col items-center justify-center w-full">
            {volume?.map((item: any, index: number) => (
              <div
                key={index}
                className={
                  "w-[900px] max-lg:w-full max-sm:justify-center flex max-sm:flex-col items-center  shadow-[0.6em_0.6em_1.2em_#d2dce9,-0.5em_-0.5em_1em_#fff] mb-9 mt-6 rounded-3xl "
                }
              >
                <Link href={`/publications/volume/${item.id}`}>
                  <Image
                      src={`${"https://journal2.nordicun.uz"}${item?.image?.file_path}`}
                      width={540}
                      height={540}
                      alt="volume"
                      className="w-540px h-[540px] max-sm:w-full m-auto block"
                  />
                </Link>

                <ul className="m-auto block max-sm:mb-2 ">
                  <li className="text-[#36187d] font-bold text-[20px] mb-2">
                    {item.title}
                  </li>
                  <li className="mb-2">
                    <h2>Nashr Sanasi</h2>
                  </li>
                  <li className="flex items-center  mb-2">
                    {" "}
                    <FaCalendarAlt className="text-[#0d6efd] mr-2" />
                    {moment(item.createdAt).utc().format("YYYY-MM-DD")}
                  </li>
                  <Link
                    href={`${"https://journal2.nordicun.uz"}${item?.source?.file_path}`}
                    target="_blank"
                  >
                    <button className="bg-[#0d6efd] px-4 mb-3 rounded-3xl text-white text-[20px]">
                      Yuklab Olish
                    </button>
                  </Link>
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className=" w-1/3 max-xl:hidden ">
          <RoundedSvg title="Asosiy Yo'nalishlar" />
          <div>
            {data?.map((category: any) => (
              <div
                key={category?.id}
                className="flex gap-3 mb-9 border-b border-solid border-gray-600 pb-6 mt-6"
              >
                <Image
                  src={`${"https://journal2.nordicun.uz"}${category?.file?.file_path}`}
                  alt="img"
                  width={70}
                  height={70}
                  className="rounded-full"
                />
                <Link href={`/publications/category/${category?.id}`}>
                  <div className="w-full border-b-amber-900 text-[20px]">
                    <h2 className="text-[#313131] font-extrabold">
                      {category?.name}
                    </h2>
                    <p>{category.articlesCount} ta maqola</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicationsClient;
