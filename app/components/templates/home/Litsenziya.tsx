"use client";

import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Button, Modal } from "antd";
import Image from "next/image";
import { LitsenziyaPropsTypes } from "@/types/templates/litsenziya.types";
import { CloseIcon } from "@nextui-org/shared-icons";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";

const Litsenziya = ({
  props,
  sectionTitle,
  documentButtons,
}: LitsenziyaPropsTypes) => {
  const [selectedTab, setSelectedTab] = useState("LICENSE");
  const [prevTab, setPrevTab] = useState("LICENSE");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iframeSrc, setIframeSrc] = useState("");
  const contentRef = useRef(null);

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

  return (
    <article className="mt-12 px-4 md:px-8 max-sm:px-0">
      <h2 className="text-center max-sm:text-lg max-sm:text-left text-tertiary text-2xl md:text-3xl font-semibold pb-7 max-lg:hidden">
        {sectionTitle}
      </h2>
      {documentButtons?.length > 0 && (
        <div className="flex flex-wrap justify-center items-center mb-6 gap-3 md:gap-5">
          {documentButtons.map((item, index) => {
            const isButtonVisible = props[item.type]?.length > 0;
            return (
              isButtonVisible && (
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
              )
            );
          })}
        </div>
      )}

      <div ref={contentRef} className="relative">
        <Swiper
          key={selectedTab}
          direction="horizontal"
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{
            delay: 2000,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={{
            prevEl: ".custom-prev-button",
            nextEl: ".custom-next-button",
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
          modules={[Navigation, Autoplay, Pagination]}
          className="w-full max-md:h-full"
        >
          {props[selectedTab]?.map((item, index) => (
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
        <div className="custom-prev-button absolute top-1/2 left-2 transform -translate-y-1/2 cursor-pointer z-10">
          <IoMdArrowBack className="text-3xl text-text_secondary" />
        </div>
        <div className="custom-next-button absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer z-10">
          <IoMdArrowForward className="text-3xl text-text_secondary" />
        </div>
      </div>

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
