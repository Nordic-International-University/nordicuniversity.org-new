import { ScientificEvent } from "@/types/research/scince_events";
import React from "react";
import NoDataComponent from "@/app/components/UI/no-data";
import EventCards from "@/app/components/UI/eventCards";

const ScientificEvents = ({
  props,
  url,
}: {
  props: ScientificEvent[];
  url: string;
}) => {
  if (props.length === 0) {
    return <NoDataComponent />;
  }

  return (
    <article className="mt-8">
      <div className="grid grid-cols-1 gap-5">
        {props.map((event, index) => (
          <div
            key={event.id || index}
            className="border border-gray-200 rounded-xl overflow-hidden bg-white
              hover:border-text_secondary/20 hover:shadow-sm transition-all duration-200"
          >
            <EventCards
              path="/research/scientific-conferences/"
              items={event}
            />
          </div>
        ))}
      </div>
    </article>
  );
};

export default ScientificEvents;
