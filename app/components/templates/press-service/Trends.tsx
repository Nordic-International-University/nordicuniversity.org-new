import React from "react";
import { Video } from "@/app/[lang]/press-service/nordic-trend/getAllReleases";

const Trends = ({ props }: { props: Video[] }) => {
  return (
    <div>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(200px,auto)]">
          {props.length > 0 ? (
            props.map((video, index) => (
              <div
                key={video.id}
                className={`bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden
                ${index === 0 ? "row-span-2" : ""}
                ${index === 1 || index === 2 ? "col-span-1" : ""}
                ${index > 2 ? "col-span-1" : ""}`}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`${video.video_id}${index === 0 ? "?autoplay=1&modestbranding=1" : ""}`}
                    title={`Video ${index + 1}`}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              Video mavjud emas
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trends;
