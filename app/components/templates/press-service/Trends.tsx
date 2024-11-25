import React from "react";
import { pressReleasesType } from "@/types/press-service/press-releases.types";

const Trends = ({ props }: { props: pressReleasesType[] }) => {
  return (
    <div>
      Nordic Trend
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(200px,auto)]">
          {props.length > 0 ? (
            props.map((video, index) => (
              <div
                key={video.id}
                className={`bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden
                ${index === 0 ? "row-span-2" : ""}
                ${index === 1 ? "col-span-1" : ""}
                ${index === 2 ? "col-span-1" : ""}
                ${index === 3 ? "col-span-1" : ""}`}
              >
                {/* Replace this with your actual video player component */}
                <div className="w-full h-full flex items-center justify-center">
                  Video {index + 1}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              No videos found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trends;
