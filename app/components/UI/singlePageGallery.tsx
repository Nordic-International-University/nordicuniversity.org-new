"use client";

import { Image } from "antd";
import { ImageData } from "@/types/templates/single.image.galleery.types";

const ImageGrid = ({ images }: any) => {
  return (
    <div className="grid grid-cols-1 mt-5 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((img: ImageData, index: number) => (
        <div className="w-full" key={img.image_id || index}>
          <Image
            className="w-full h-[300px] object-cover"
            src={process.env.NEXT_PUBLIC_URL_BACKEND + img.image.file_path}
            alt={img.image.file_name}
            preview={{
              src: process.env.NEXT_PUBLIC_URL_BACKEND + img.image.file_path,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
