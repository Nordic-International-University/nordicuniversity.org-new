"use client"

import React from "react";
import RoundedSvg from "@/app/components/helpers/RoundeSvg";
import Image from "next/image";
import moment from "moment/moment";
import { FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";
import {useRouter} from "next/navigation";

const PublicationsClient = ({ data, volume }: { data: any; volume: any }) => {
    const router = useRouter()

    return (
        <section className="mt-7">
            <div className="container">
                <div className="flex max-xl:flex-col max-xm:w-full">
                    <div className="w-full mr-7 ">
                        <RoundedSvg title={"Nashrlar"} />
                        <div className="flex-col items-center justify-center w-full">
                            {volume?.map((item: any, index: number) => (
                                <div
                                    onClick={() => router.push(`/publications/volume/${item.id}`)}
                                    key={index}
                                    style={{cursor: "pointer"}}
                                    className="w-[900px] max-lg:w-full max-sm:justify-center flex max-sm:flex-col items-center  shadow-[0.6em_0.6em_1.2em_#d2dce9,-0.5em_-0.5em_1em_#fff] mb-9 mt-6 rounded-3xl "
                                >
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_API_URL}${item?.image?.file_path}`}
                                        width={540}
                                        height={540}
                                        alt="volume"
                                        className=" max-sm:h-[340px] max-sm:w-full m-auto block"
                                    />
                                    <ul className="m-auto block max-sm:mb-2 max-sm:text-center ">
                                        <li className="text-[#36187d] font-bold text-[20px] mb-2">
                                            {item.title}
                                        </li>
                                        <li className="mb-2">
                                            <h2>Nashr Sanasi</h2>
                                        </li>
                                        <li className="flex items-center justify-center  mb-2">
                                            <FaCalendarAlt className="text-[#0d6efd]" />
                                            {moment(item.createdAt).utc().format("YYYY-MM-DD")}
                                        </li>
                                        <Link
                                            href={`${process.env.NEXT_PUBLIC_API_URL}${item?.source?.file_path}`}
                                            target="_blank"
                                        >
                                            <button className="bg-[#0d6efd] px-4 rounded-3xl text-white">
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
                        <div className="flex flex-col">
                            {data?.map((category: any) => (
                                <div
                                    key={category?.id}
                                    className="flex gap-3 mb-1 border-b border-b-1 border-solid border-gray-400 pb-2 mt-6"
                                >
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_API_URL}${category?.file?.file_path}`}
                                        alt="img"
                                        width={70}
                                        height={70}
                                        className="rounded-full"
                                    />
                                    <Link href={`/publications/category/${category?.id}`}>
                                        <div className="w-full border-b-amber-900 text-[20px]">
                                            <h2 className="text-[#313131] text-lg font-extrabold">
                                                {category?.name}
                                            </h2>
                                            <p className="font-normal text-[17px]">
                                                {category.articlesCount} ta maqola
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PublicationsClient;
