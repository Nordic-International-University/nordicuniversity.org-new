import { ScientificEvent } from "@/types/research/scince_events";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import React, { useState } from "react";
import { Navigation } from "swiper/modules";
import NoDataComponent from "@/app/components/UI/no-data";
import EventCards from "@/app/components/UI/eventCards";

const ScientificEvents = ({ props }: { props: ScientificEvent[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  };

  if (!props || props.length === 0) {
    return <NoDataComponent />;
  }

  const renderEvents = () => {
    if (props.length > 3) {
      return (
        <Swiper
          direction="horizontal"
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides={true}
          onSlideChange={handleSlideChange}
          navigation={{
            prevEl: ".swiperNumericDown",
            nextEl: ".swiperNumericUp",
          }}
          breakpoints={{
            1024: {
              slidesPerView: 1,
              spaceBetween: 30,
            },
            300: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
          }}
          modules={[Navigation]}
          className="h-[243px] max-lg:h-auto"
        >
          {props.map((event, index) => (
            <SwiperSlide
              className="h-[243px] max-lg:h-auto"
              key={event.id || index}
            >
              <EventCards items={event} />
            </SwiperSlide>
          ))}
        </Swiper>
      );
    } else {
      return (
        <div className="gap-3 flex flex-col">
          {props.map((event, index) => (
            <div className="border-2 border-[#7A98C1] max-lg:border-transparent rounded max-lg:p-0 p-4">
              <EventCards items={event} key={event.id || index} />
            </div>
          ))}
        </div>
      );
    }
  };

  return <article className="mt-12">{renderEvents()}</article>;
};

export default ScientificEvents;
