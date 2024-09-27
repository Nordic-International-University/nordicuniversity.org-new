"use client";

import {Swiper, SwiperSlide} from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import "swiper/css";

const HomeVolumesClient = ({volume}: any) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true); // Sahifa yuklangandan keyin Swiper ko'rinishini sozlash
    }, []);

    if (!isMounted) {
        return null; // Agar Swiper hali o'rnatilmagan bo'lsa, hech narsa ko'rsatmaymiz
    }

    return (
        <section className="mt-8">
            <div className="swiperContainer">
                <Swiper
                    watchSlidesProgress
                    updateOnWindowResize
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        1280: {
                            slidesPerView: 4,
                            spaceBetween: 40,
                        },
                    }}
                    slidesPerView={4}
                >
                    {volume
                        ?.sort((a: any, b: any) => a.title.slice(0, 1) - b.title.slice(0, 1))
                        ?.map((item: any) => (
                            <SwiperSlide key={item.id}>
                                <Link
                                    key={item.id}
                                    className="cursor-pointer hover:grayscale transition-all"
                                    href={`/publications/volume/${item.id}`}
                                >
                                    <Image
                                        src={`${"https://journal2.nordicun.uz"}${item?.image?.file_path}`}
                                        width={1000}
                                        height={300}
                                        alt="volume"
                                        loading="lazy"
                                    />
                                </Link>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
        </section>
    );
};

export default HomeVolumesClient;
