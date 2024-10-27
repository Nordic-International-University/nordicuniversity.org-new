import React from "react";
import { EventsTypeProps } from "@/types/templates/events.types";

const Events = ({
  props,
  sectionTitle,
  sectionDescription,
}: EventsTypeProps) => {
  return (
    <section className="container">
      <h2 className="text-center text-tertiary font-semibold text-2xl pt-12 pb-7">
        {sectionTitle}
      </h2>
      <p className="text-text_secondary text-center text-opacity-80 text-lg font-medium">
        {sectionDescription}
      </p>
      <div className="grid mt-9 grid-cols-2 max-lg:grid-cols-1 justify-between place-items-center gap-10">
        {props.map((item, index) => (
          <div className="flex items-center max-w-[530px] gap-6" key={index}>
            <div
              className="bg-text_secondary
             rounded-full w-16 h-16 flex items-center p-10 justify-center"
            >
              <h2 className="uppercase w-[50px] font-semibold text-center text-text_tertiary">
                {item.date}
              </h2>
            </div>
            <div>
              <h2 className="font-semibold text-tertiary">{item.title}</h2>
              <p
                className="text-text_secondary
              "
              >
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Events;
