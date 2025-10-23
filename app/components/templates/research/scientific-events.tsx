import { ScientificEvent } from "@/types/research/scince_events";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import React, { useState } from "react";
import { Navigation } from "swiper/modules";
import NoDataComponent from "@/app/components/UI/no-data";
import EventCards from "@/app/components/UI/eventCards";

const ScientificEvents = ({
  props,
  url,
}: {
  props: ScientificEvent[];
  url: string;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderEvents = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
        {props.map((event, index) => (
          <div
            key={event.id || index}
            className="border-2 border-[#7A98C1] rounded p-4"
          >
            <EventCards
              path="/research/scientific-conferences/"
              items={event}
            />
          </div>
        ))}
      </div>
    );
  };

  return <article className="mt-12">{renderEvents()}</article>;
};

export default ScientificEvents;
