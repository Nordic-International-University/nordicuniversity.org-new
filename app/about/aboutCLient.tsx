"use client";
import React, { useRef } from "react";
import RoundedSvg from "@/app/components/helpers/RoundeSvg";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/Store";
import AccordionItem from "@/app/components/helpers/accordionItem";
import { Swiper, SwiperSlide } from "swiper/react";
import image_odil from "@/public/Odil Qoysinov 1.png";
import image_aziz from "@/public/azizbek abdullayev 1.png";
import certificate from "@/public/about-journal-desktop.jpg";
import image_sherzod from "@/public/Sherzod Mustafakulov 1.png";
import image_oybek from "@/public/Oybek Raximberdiyev 1.png";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { Button } from "antd";

const Page = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const accordionItems = useSelector(
    (state: RootState) => state.about.accordionItems,
  );
  const aboutItem = useSelector((state: RootState) => state.about.aboutItems);
  const sliderData = [
    {
      id: 1,
      image: image_sherzod,
      name: "Sherzod Mustafakulov",
      title:
        "Tahririyat kengashi raisi: iqtisodiyot fanlari doktori, professor",
    },
    {
      id: 3,
      image: image_odil,
      name: "Odil Qo’ysinov",
      title: "Bosh muharrir: pedagogika fanlari doktori, professor",
    },

    {
      id: 2,
      image: image_oybek,
      name: "Oybek Raximberdiyev",
      title: "Tahririyat kengashi mas’ul kotibi",
    },

    {
      id: 4,
      image: image_aziz,
      name: "Azizbek Abdullayev",
      title: "Dizayner",
    },
  ];

  return (
    <>
      <section className="mt-[25px] max-sm:mt-[20px]">
        <article className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start gap-10 justify-between">
            <div className="w-full lg:w-auto">
              <RoundedSvg title="“Nordic” ilmiy-amaliy elektron jurnali" />
              <div>
                <p className="text-[#6C758F] pt-4 pb-4 font-[300] text-[14px]">
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
                  bo‘lishini to‘liq ta’minlash maqsadida{" "}
                  <strong className="text-black font-black">
                    ISSN-3030-3400
                  </strong>{" "}
                  raqami bilan faoliyat olib boradi.
                </p>
                <p className="text-[#6C758F] py-4 font-[300] text-[14px]">
                  <strong className="text-black font-black">
                    Jurnalning nashr etilish sanasi:
                  </strong>{" "}
                  har ikkinchi oyning 15-sanasi Jurnalning davriyligi: bir yilda
                  5 ta son
                </p>
                <p className="text-[#6C758F]  font-[300] text-[14px]">
                  <strong className="text-black font-black">Muassis:</strong>{" "}
                  Xalqaro Nordik universiteti
                </p>
                <p className="text-[#6C758F] py-4 font-[300] text-[14px]">
                  <strong className="text-black font-black">
                    {" "}
                    Jurnal faoliyatining asosiy maqsadi:
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
                <RoundedSvg title="Tahririyat hayati" />
                <div className="mt-3">
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={5}
                    loop={true}
                    speed={1700}
                    autoplay={{
                      delay: 1000,
                      disableOnInteraction: false,
                    }}
                    pagination={{
                      clickable: true,
                    }}
                    breakpoints={{
                      640: {},
                      768: {
                        slidesPerView: 2,
                      },
                      1024: {
                        slidesPerView: 3,
                      },
                      1280: {
                        slidesPerView: 4,
                      },
                    }}
                    navigation={true}
                    modules={[Autoplay, Navigation]}
                    className="max-sm:block"
                  >
                    {sliderData.map((item) => (
                      <SwiperSlide
                        key={item.id}
                        className="text-center w-[215px] max-sm:w-full"
                      >
                        <div className="relative w-full h-[205px] max-sm:h-[400px]">
                          <Image
                            width={1000}
                            height={1000}
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-[rgba(1,150,227,0.6)] bg-opacity-50 text-white w-full h-[55px] flex flex-col justify-center items-center">
                            <p className="text-xs font-semibold">{item.name}</p>
                            <p className="text-xs">{item.title}</p>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                <div className="mt-7">
                  <RoundedSvg title="Tahririyat a'zolari" />
                  <div className="overflow-auto">
                    <table className="min-w-full  mt-5 text-nowrap border-collapse border border-gray-200 shadow-md">
                      <thead>
                        <tr className="bg-blue-600 text-white">
                          <th className="px-4 py-2 text-left font-medium">
                            F.I.O
                          </th>
                          <th className="px-4 py-2 text-left font-medium">
                            Yo'nalish
                          </th>
                          <th className="px-4 py-2 text-left font-medium">
                            Davlat
                          </th>
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
                            <td className="px-4 py-2 border border-gray-200">
                              {item.title}
                            </td>
                            <td className="px-4 py-2 border border-gray-200">
                              {item.country}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:min-w-[400px]">
              <div className="font-semibold mb-7">
                <RoundedSvg title="Litsenziya" />
                <Image
                  className="mt-4 rounded-t-xl"
                  src={certificate}
                  alt="Litsenziya"
                />
                <Button
                  className="rounded-t-none
                   w-full"
                  size="large"
                  type="primary"
                  download
                  href="/pdf/nordic2.pdf"
                >
                  Yuklab olish
                </Button>
              </div>
              <RoundedSvg title="Ko’p beriladigan savollar" />
              <div className="pt-[29px]">
                <AccordionItem item={accordionItems} />
              </div>
              <div className="mt-3">
                <RoundedSvg title="Tahririyat manzili" />
                <p className="mt-4">
                  100143, O‘zbekiston Respublikasi, Toshkent shahri, Chilonzor
                  tumani Bunyodkor shox ko‘chasi, 8/2-uy
                </p>
                <div className="pt-4">
                  <iframe
                    ref={iframeRef}
                    className="w-full"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2997.992487234806!2d69.2162893762974!3d41.28726797131279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b359ab47501%3A0x618cedae4747d331!2sNordic%20International%20University!5e0!3m2!1sru!2s!4v1723365720858!5m2!1sru!2s"
                    height="450"
                    style={{ border: 0 }}
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
