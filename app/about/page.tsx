"use client";
import React, {useRef} from "react";
import RoundedSvg from "@/app/components/helpers/RoundeSvg";
import {useSelector} from "react-redux";
import {RootState} from "@/lib/store/Store";
import AccordionItem from "@/app/components/helpers/accordionItem";


import {Swiper, SwiperSlide} from "swiper/react";
import image_odil from "@/public/Odil Qoysinov 1.png";
import image_aziz from "@/public/azizbek abdullayev 1.png";
import image_sherzod from "@/public/Sherzod Mustafakulov 1.png";
import image_oybek from "@/public/Oybek Raximberdiyev 1.png";
import {Autoplay, Navigation} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

const Page = () => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const accordionItems = useSelector(
        (state: RootState) => state.about.accordionItems,
    );
    const aboutItem = useSelector((state: RootState) => state.about.aboutItems);

    return (
        <>

            <section className="mt-[50px] max-sm:mt-[30px]">
                <article className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-start gap-10 justify-between">
                        <div className="w-full lg:w-auto">
                            <RoundedSvg title="“Nordic” ilmiy-amaliy elektron jurnali"/>
                            <div>
                                <p className="text-[#6C758F] pt-4 pb-10 font-[300] text-[14px]">
                                    Xalqaro Nordik universiteti Oʻzbekiston Respublikasi
                                    Prezidenti Administratsiyasi huzuridagi Axborot va ommaviy
                                    kommunikatsiyalar agentligining №057211 raqamli
                                    Guvohnomasiasosida “Nordic” ilmiy-amaliy elektron jurnalini
                                    nashr etish imkoniyatiga ega bo‘ldi. Jurnalda maqolalar
                                    o‘zbek, rus, ingliz va fin tillarida nashr etiladi.
                                </p>
                                <p className="text-[#6C758F] font-[300] text-[14px]">
                                    Nordik ilmiy-amaliy elektron jurnali davriy nashrlarini ISSN
                                    (Seriyali nashrlarning xalqaro standart raqamlanishi) tartib
                                    raqami orqali davlatlataro standart talablari asosida
                                    bo‘lishini to‘liq ta’minlash maqsadida ISSN-3030-3400 raqami
                                    bilan faoliyat olib boradi.
                                </p>
                                <p className="text-[#6C758F] py-10 font-[300] text-[14px]">
                  <span className="text-[#6C758F] font-[700]">
                    Jurnalning nashr etilish sanasi:
                  </span>{" "}
                                    har ikkinchi oyning 15-sanasi Jurnalning davriyligi: bir yilda
                                    5 ta son
                                </p>
                                <p className="text-[#6C758F]  font-[300] text-[14px]">
                                    <span className="text-[#6C758F] font-[700]">Muassis:</span>{" "}
                                    Xalqaro Nordik universiteti
                                </p>
                                <p className="text-[#6C758F] py-10 font-[300] text-[14px]">
                                    <strong className="text-[#6C758F] font-[700]">
                                        {" "}
                                        Jurnal faoliyatining asosiy maqsadi::
                                    </strong>{" "}
                                    professor-о‘qituvchilar va ilmiy izlanuvchilar, magistrlar va
                                    talabalar tomonidan olib borilayotgan ilmiy izlanishlar,
                                    ilmiy-tadqiqot natijalarini elektron tarzda chop etish va
                                    ommaviy e’lon qilib borishdan iborat. Shuningdek, zamonaviy
                                    ilg‘or qarashlar bilan tanishtirish, ilmiy faoliyatlarini
                                    jonlantirish, universitet ilmiy nufuzi va salohiyatini
                                    o‘stirish, turli innovatsion tadqiqotlarda ishtirok etishini
                                    kuchaytirish, tadqiqotlarning ilmiy-amaliy ahamiyatini yanada
                                    oshirish asosiy maqsadimizdir.
                                </p>
                            </div>
                            <div className=" ">
                                <RoundedSvg title="Tahririyat hayati"/>
                                <div className="mt-3">
                                    <Swiper
                                        slidesPerView={1}
                                        spaceBetween={5}
                                        loop={true}
                                        speed={1500}
                                        autoplay={{
                                            delay: 500,
                                            disableOnInteraction: false,
                                        }}
                                        pagination={{
                                            clickable: true,
                                        }}
                                        breakpoints={{
                                            640: {},
                                            768: {
                                                slidesPerView: 4,
                                            },
                                            1024: {
                                                slidesPerView: 5,
                                            },
                                        }}
                                        navigation={true}
                                        modules={[Autoplay, Navigation]}
                                        className=" max-sm:block  "
                                    >
                                        <SwiperSlide className="text-center justify-center items-center w-[215px]">
                                            <div
                                                className=" relative  text-center w-full h-[205px] max-sm:w-full max-sm:h-[400px] ">
                                                <Image
                                                    src={image_sherzod}
                                                    alt="Tahririyat hayati rasm"
                                                    className="w-full h-full object-cover"
                                                />
                                                <div
                                                    className="absolute px-1 bottom-0 left-0 right-0 bg-[rgba(1,150,227,0.6)] bg-opacity-50 text-white w-full h-[55px] flex flex-col justify-center items-center ">
                                                    <p className="text-xs font-semibold ">
                                                        Sherzod Mustafakulov
                                                    </p>
                                                    <p className="text-white text-[10px]">
                                                        {" "}
                                                        Tahririyat kengashi raisi: iqtisodiyot fanlari
                                                        doktori, professor
                                                    </p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide className="relative  text-center w-[215px] max-sm:w-full">
                                            <div
                                                className="relative text-center w-full h-[205px] max-sm:w-full max-sm:h-[400px]">

                                                <Image
                                                    src={image_oybek}
                                                    alt="Tahririyat hayati rasm"
                                                    className="w-full h-full object-cover"
                                                />
                                                <div
                                                    className="absolute bottom-0 left-0 right-0 bg-[rgba(1,150,227,0.6)] bg-opacity-50 text-white w-full h-[55px] flex flex-col justify-center items-center ">
                                                    <p className="text-xs font-semibold">
                                                        Oybek Raximberdiyev
                                                    </p>
                                                    <p className="text-xs">
                                                        Tahririyat kengashi mas’ul kotibir
                                                    </p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide className="relative  text-center w-[215px] max-sm:w-full  ">
                                            <div
                                                className="relative  text-center w-full h-[205px] max-sm:w-full max-sm:h-[400px]">
                                                <Image
                                                    src={image_odil}
                                                    alt="Tahririyat hayati rasm"
                                                    className="w-full h-full object-cover"
                                                />
                                                <div
                                                    className="absolute bottom-0 left-0 right-0 bg-[rgba(1,150,227,0.6)] bg-opacity-50 text-white w-full h-[55px] flex flex-col justify-center items-center ">
                                                    <p className="text-xs font-semibold">
                                                        Odil Qo’ysinov
                                                    </p>
                                                    <p className="text-xs text-white">
                                                        Bosh muharrir: pedagogika fanlari doktori, professor
                                                    </p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide className="  text-center w-[215px] max-sm:w-full ">
                                            <div
                                                className="relative  text-center w-full h-[205px] max-sm:w-full max-sm:h-[400px] ">
                                                <Image
                                                    src={image_aziz}
                                                    alt="Tahririyat hayati rasm"
                                                    className="w-full h-full object-cover"
                                                />
                                                <div
                                                    className="absolute bottom-0 left-0 right-0 bg-[rgba(1,150,227,0.6)] bg-opacity-50 text-white w-full h-[55px] flex flex-col justify-center items-center">
                                                    <p className="text-xs font-semibold">
                                                        Azizbek Abdullayev
                                                    </p>
                                                    <p className="text-xs">Dizayner</p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    </Swiper>
                                </div>


                                <div className="mt-3 ">
                                    <RoundedSvg title="Tahririyat a'zolari"/>
                                    <div className="overflow-auto">
                                        <table
                                            className="min-w-full  mt-5 text-nowrap border-collapse border border-gray-200 shadow-md">
                                            <thead>
                                            <tr className="bg-blue-600 text-white">
                                                <th className="px-4 py-2 text-left font-medium">F.I.O</th>
                                                <th className="px-4 py-2 text-left font-medium">Yo'nalish</th>
                                                <th className="px-4 py-2 text-left font-medium">Davlat</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {aboutItem?.map((item, index) => (
                                                <tr
                                                    key={index}
                                                    className={`${
                                                        index % 2 === 0 ? "bg-white" : "bg-gray-100"
                                                    } hover:bg-orange-100 transition-colors duration-200`}
                                                >
                                                    <td className="px-4 py-2 border border-gray-200 font-semibold">
                                                        {item.name}
                                                    </td>
                                                    <td className="px-4 py-2 border border-gray-200">{item.title}</td>
                                                    <td className="px-4 py-2 border border-gray-200">{item.country}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:min-w-[400px]">
                            <RoundedSvg title="Ko’p beriladigan savollar"/>
                            <div className="pt-[29px]">
                                <AccordionItem item={accordionItems}/>
                            </div>
                            <div className="mt-3">
                                <RoundedSvg title="Tahririyat manzili:"/>
                                <div className="pt-4">
                                    <iframe
                                        ref={iframeRef}
                                        className="w-full"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2997.992487234806!2d69.2162893762974!3d41.28726797131279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b359ab47501%3A0x618cedae4747d331!2sNordic%20International%20University!5e0!3m2!1sru!2s!4v1723365720858!5m2!1sru!2s"
                                        height="450"
                                        style={{border: 0}}
                                        allowFullScreen={false}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </section>
        </>
    );
};

export default Page;
