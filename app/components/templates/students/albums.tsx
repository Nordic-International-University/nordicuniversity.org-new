import React, { Dispatch, useState } from "react";
import { albumsType } from "@/types/templates/albums.types";
import { Button } from "antd";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { useDispatch } from "react-redux";
import { changeAlbum } from "@/app/utils/slices/component.function";

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

  const images = selectedTypeData.slice(-9).map((item: any) => ({
    src: imageURl + item?.photo?.file_path || "default-image.jpg",
    caption: item?.photo?.description || `Rasm tavsifi yo'q`,
  }));

  const closeLightbox = () => setLightboxIndex(null);

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
      <div className="wrapper text-center">
        {images.map((image: any, index: number) => (
          <div
            key={index}
            onClick={() => {
              setLightboxIndex(index);
            }}
            className="cursor-pointer"
          >
            <img
              src={image.src}
              alt={`Image ${index}`}
              onError={(e: React.SyntheticEvent<HTMLImageElement>) =>
                (e.currentTarget.src = "default-image.jpg")
              }
            />
          </div>
        ))}
      </div>
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
