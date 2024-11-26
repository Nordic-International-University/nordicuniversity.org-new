import React, { Dispatch, useState } from "react";
import { albumsType } from "@/types/templates/albums.types";
import { Button } from "antd";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { useDispatch } from "react-redux";
import { changeAlbum } from "@/app/utils/slices/component.function";

const chunkArray = (array: any[], size: number) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const Albums = ({
  props,
  selectedTypeData,
}: {
  props: albumsType[];
  selectedTypeData: any;
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const dispatch: Dispatch<any> = useDispatch();
  const imageURl = process.env.NEXT_PUBLIC_URL_BACKEND;
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  const images = selectedTypeData.map((item: any) => ({
    src: imageURl + item?.photo?.file_path || "default-image.jpg",
    caption: item?.photo?.description || `Rasm tavsifi yo'q`,
  }));

  const chunkedImages = chunkArray(images, 9);

  const closeLightbox = () => setLightboxIndex(null);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <article className="mt-7">
      <div className="flex items-center justify-center gap-3 mb-5">
        {props.map((item, index) => (
          <Button
            key={index}
            className={`rounded px-10 text-md py-4 ${
              activeIndex === index
                ? "bg-text_secondary text-white"
                : "bg-[#DBF2FF]"
            }`}
            onClick={() => {
              setActiveIndex(index);
              dispatch(changeAlbum(item.slug));
            }}
          >
            {item.name}
          </Button>
        ))}
      </div>

      {/* Chunklangan rasmlarni ko'rsatish */}
      {chunkedImages.map((chunk, chunkIndex) => (
        <div key={chunkIndex} className="wrapper text-center">
          {chunk.map((image: any, index: number) => (
            <div
              key={index}
              onClick={() => {
                setLightboxIndex(chunkIndex * 9 + index);
              }}
              className="cursor-pointer"
            >
              <img
                src={image.src}
                alt={`Image ${index}`}
                className={`w-full h-full object-cover transition duration-500 ${
                  loadedImages[chunkIndex * 9 + index] ? "blur-0" : "blur-lg"
                }`}
                onLoad={() => handleImageLoad(chunkIndex * 9 + index)}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) =>
                  (e.currentTarget.src = "default-image.jpg")
                }
              />
            </div>
          ))}
        </div>
      ))}

      {lightboxIndex !== null && images[lightboxIndex] && (
        <Lightbox
          mainSrc={images[lightboxIndex].src}
          nextSrc={images[(lightboxIndex + 1) % images.length]?.src}
          prevSrc={
            images[(lightboxIndex - 1 + images.length) % images.length]?.src
          }
          onCloseRequest={closeLightbox}
          onMovePrevRequest={() =>
            setLightboxIndex(
              (lightboxIndex - 1 + images.length) % images.length,
            )
          }
          onMoveNextRequest={() =>
            setLightboxIndex((lightboxIndex + 1) % images.length)
          }
          imageCaption={images[lightboxIndex]?.caption}
        />
      )}
    </article>
  );
};

export default Albums;
