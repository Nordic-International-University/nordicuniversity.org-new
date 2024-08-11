"use client";

import React, { useRef } from "react";
import RoundedSvg from "@/app/components/helpers/RoundeSvg";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/Store";
import AccordionItem from "@/app/components/helpers/accordionItem";
import Header from "@/app/components/main/Header";
import { HomeOutlined } from "@ant-design/icons";

const About = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const accordionItems = useSelector(
    (state: RootState) => state.about.accordionItems,
  );

  const beadCampItem = [
    {
      href: "/",
      title: <HomeOutlined />,
    },
    {
      href: "#",
      title: (
        <>
          <span>jurnal haqida</span>
        </>
      ),
    },
  ];

  return (
    <>
      <Header item={beadCampItem} />
      <section className="mt-[80px]">
        <article className="container">
          <div className="flex items-start gap-10 justify-between">
            <div>
              <RoundedSvg title="“Nordic” ilmiy-amaliy elektron jurnali" />
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
                <p className="text-[#6C758F] py-7 font-[300] text-[14px]">
                  <span className="text-[#6C758F] font-[700]">Muassis:</span>{" "}
                  Xalqaro Nordik universiteti
                </p>
                <p className="text-[#6C758F] py-7 font-[300] text-[14px]">
                  <span className="text-[#6C758F] font-[700]">
                    {" "}
                    Jurnal faoliyatining asosiy maqsadi::
                  </span>{" "}
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
              <div>
                <RoundedSvg title="Tahririyat hayati" />
              </div>
            </div>
            <div className="min-w-[400px]">
              <RoundedSvg title="Ko’p beriladigan savollar" />
              <div className="pt-[29px]">
                <AccordionItem item={accordionItems} />
              </div>
              <div className="mt-5">
                <RoundedSvg title="Tahririyat manzili:" />
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

export default About;
