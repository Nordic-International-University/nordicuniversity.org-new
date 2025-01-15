"use client";

import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { IoMdArrowBack } from "react-icons/io";
import { Button, Modal } from "antd";
import Image from "next/image";
import { LitsenziyaPropsTypes } from "@/types/templates/litsenziya.types";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { CloseIcon } from "@nextui-org/shared-icons";

const Litsenziya = ({
  props,
  sectionTitle,
  documentButtons,
}: LitsenziyaPropsTypes) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState("LICENSE");
  const [prevTab, setPrevTab] = useState("LICENSE");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iframeSrc, setIframeSrc] = useState("");
  const contentRef = useRef(null);
  const t = useTranslations("university");

  console.log(documentButtons);
  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  };

  const handleTabChange = (item: any) => {
    setPrevTab(selectedTab);
    setSelectedTab(item.type);
  };

  const handleImageClick = (pdfPath: string) => {
    setIframeSrc(pdfPath);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIframeSrc("");
  };

  useEffect(() => {
    const direction = selectedTab > prevTab ? 100 : -100;
    gsap.fromTo(
      contentRef.current,
      { x: direction, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
    );
  }, [selectedTab]);

  const totalPages = Math.ceil(props[selectedTab].length / 3);

  return (
    <article className="mt-12 px-4 md:px-8 max-sm:px-0">
      <h2 className="text-center max-sm:text-lg max-sm:text-left text-tertiary text-2xl md:text-3xl font-semibold pb-7 max-lg:hidden">
        {sectionTitle}
      </h2>
      <div className="flex flex-wrap justify-center items-center mb-6 gap-3 md:gap-5">
        {documentButtons?.map((item, index) => (
          <Button
            onClick={() => handleTabChange(item)}
            key={index}
            size="large"
            className={`px-10 md:px-8 rounded text-sm md:text-md font-semibold ${
              selectedTab === item.type
                ? "bg-text_secondary text-white"
                : "bg-text_tertiary text-text_secondary"
            }`}
          >
            {item.label}
          </Button>
        ))}
      </div>
      <div ref={contentRef}>
        <Swiper
          key={selectedTab}
          direction="horizontal"
          spaceBetween={20}
          slidesPerView={1}
          initialSlide={0}
          onSlideChange={handleSlideChange}
          navigation={{
            prevEl: ".swiper-up-litsenziya",
            nextEl: ".swiper-down-litsenziya",
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          modules={[Navigation]}
          className="w-full h-[350px] max-md:h-full md:h-[450px] lg:h-[550px]"
        >
          {props[selectedTab].map((item, index) => (
            <SwiperSlide key={index}>
              <Image
                onClick={() =>
                  handleImageClick(
                    `${process.env.NEXT_PUBLIC_URL_BACKEND}${item.file.file_path}`,
                  )
                }
                className="cursor-pointer mx-auto h-auto w-[90%] md:w-[390px] block"
                height={500}
                width={500}
                src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${item.image.file_path}`}
                alt={item.id}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {props[selectedTab].length > 3 && (
        <div className="flex items-center justify-center mt-6 gap-6">
          <div className="cursor-pointer">
            <IoMdArrowBack className="text-lg text-text_secondary swiper-up-litsenziya" />
          </div>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <div
                key={pageIndex}
                className={`h-2 w-2 rounded-full ${
                  activeIndex === pageIndex
                    ? "bg-text_secondary"
                    : "bg-text_secondary opacity-45"
                }`}
              />
            ))}
          </div>
          <div className="cursor-pointer">
            <IoMdArrowBack className="text-lg rotate-180 text-text_secondary swiper-down-litsenziya" />
          </div>
        </div>
      )}

      {/* Modal */}
      <Modal
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        closeIcon={
          <CloseIcon className="text-secondary text-xl absolute -top-2 -right-2" />
        }
        centered
        maskStyle={{
          backgroundColor: "rgba(93,88,88,0.5)",
          backdropFilter: "blur(5px)",
        }}
        width="70%"
        bodyStyle={{ padding: 0, height: "70vh" }}
      >
        <iframe
          src={iframeSrc}
          width="100%"
          height="100%"
          style={{ border: "none" }}
        />
      </Modal>
    </article>
  );
};

export default Litsenziya;
