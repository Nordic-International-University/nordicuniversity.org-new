"use client"

import React, {useEffect} from "react";
import errorPage from "@/public/empty_state_teal.jpg"
import leyer1 from "@/public/Ellipse.svg";
import ellipseRight from "@/public/ellipseRight.svg";
import Link from "next/link";
import Image from "next/image";

const Page404 = () => {

    useEffect(() => {
        const mainElement = document.getElementById("main");
        if (mainElement) {
            mainElement.style.paddingBottom = "0";
        }

        return () => {
            if (mainElement) {
                mainElement.style.paddingBottom = "150px";
            }
        };
    }, []);

    return (
        <div id="page404 " className="relative overflow-hidden">
            <div className="top-6">
                <Image
                    src={leyer1}
                    className="absolute -left-14 pt-3 max-sm:w-[140px] max-xl:w-[200px]"

                    alt="Not Found"
                />
                <Image
                    src={ellipseRight}
                    className="absolute -right-0 -bottom-1 max-sm:w-[140px] max-xl:w-[200px]"
                    alt="Not Found"
                />
            </div>
            <div id="page404" className="flex-row  items-center  bg-white ">
                <div className="flex justify-center">
                    <Image
                        src={errorPage}
                        alt="404"
                        className="max-sm:w-full max-sm:h-[400px] w-[500px] h-[500px] mt-3"
                    />
                </div>
                <div className=" text-center z-10 absolute bottom-[10%] left-[50%] -translate-x-1/2 ">

                    <h2 className="font-bold text-blue-500 text-[20px]">
                        Bu nashrga tegishli maqolalar mavjud emas
                    </h2>
                    <Link
                        className="bg-blue-500 text-white py-2  px-2 rounded-lg mt-8 max-sm:mb-6 "
                        href={"/"}
                    >
                        <button className="mt-8">Bosh Saxifaga</button>
                    </Link>

                </div>

            </div>
        </div>
    );
};

export default Page404;
