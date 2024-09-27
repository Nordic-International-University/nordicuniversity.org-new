"use client";

import {Oswald} from "next/font/google";
import {Inter} from "next/font/google";
import React, {useEffect, useRef} from "react";
import Image from "next/image";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import RoundedSvg from "@/app/components/helpers/RoundeSvg";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const oswald400 = Oswald({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
});
const oswald200 = Inter({
    weight: "200",
    subsets: ["latin"],
    display: "swap",
});

interface VolumeClientProps {
    data: any[];
}

const VolumeClient: React.FC<VolumeClientProps> = ({data}) => {
    const titleRefs = useRef<HTMLParagraphElement[]>([]);
    const imageRefs = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const isMobile = window.matchMedia("(max-width: 640px)").matches;

        if (!isMobile) {
            titleRefs.current.forEach((el, index) => {
                gsap.fromTo(
                    el,
                    {x: index % 2 === 0 ? -200 : 200, opacity: 0},
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: "power1.out",
                        delay: index * 0.05,
                        scrollTrigger: {
                            trigger: el,
                            start: "top 90%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            });

            imageRefs.current.forEach((el, index) => {
                gsap.fromTo(
                    el,
                    {x: index % 2 === 0 ? 200 : -200, opacity: 0},
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: "power1.out",
                        delay: index * 0.05,
                        scrollTrigger: {
                            trigger: el,
                            start: "top 90%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            });
        }
    }, [data]);


    return (
        <div className="container">
            <div className="grid max-sm:grid-rows-1 max-sm:mb-5 mt-10">
                <div className="mb-3">
                    <RoundedSvg title="Asosiy Yo'nalishlar"/>
                </div>

                {data?.map((item, index) => (
                    <Link
                        href={`/publications/category/${item?.id}`}
                        className={`flex justify-between w-full max-sm:flex-col-reverse ${index % 2 === 0 ? "" : "flex-row-reverse "}`}
                        key={index}
                    >
                        <div
                            ref={(el) => {
                                if (el && !titleRefs.current.includes(el)) titleRefs.current[index] = el;
                            }}
                            className="flex flex-col w-full items-center justify-center lg:w-1/2 max-lg:w-full group sm:overflow-hidden relative"
                        >

                            <p
                                className={`absolute group-hover:opacity-0 group-hover:-translate-y-[600px] max-sm:hover:translate-y-0 transition-all duration-500 ease-out text-[44px] max-lg:text-[22px] tracking-[-0.04em]; ${oswald400.className}`}
                            >
                                {item.name}
                            </p>


                            <div className="max-lg:h-[393px] max-sm:w-full">
                                {item?.subCategories?.map(
                                    (
                                        sub: {
                                            name:
                                                | string
                                                | number
                                                | bigint
                                                | boolean
                                                | React.ReactElement<
                                                any,
                                                string | React.JSXElementConstructor<any>
                                            >
                                                | Iterable<React.ReactNode>
                                                | React.ReactPortal
                                                | Promise<React.AwaitedReactNode>
                                                | null
                                                | undefined;
                                        },
                                        subIndex: React.Key | null | undefined,
                                    ) => (
                                        <div key={subIndex}>
                                            <p
                                                className={`leading-7 ${oswald200.className} hover-line text-[15px] font-light opacity-0 transform group-hover:my-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out after:duration-700 after:ease-out `}
                                            >
                                                {sub.name}
                                                <span className="line"></span>
                                            </p>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>
                        <div
                            ref={(el) => {
                                if (el && !imageRefs.current.includes(el)) imageRefs.current[index] = el;
                            }}
                            className="lg:w-1/2 max-lg:w-full"
                        >

                            <Image
                                src={`https://journal2.nordicun.uz${item?.file?.file_path}`}
                                alt="img"
                                width={650}
                                height={500}
                                className="h-auto w-full"
                            />


                        </div>
                    </Link>
                ))}
            </div>
        </div>

    );
};

export default VolumeClient;
