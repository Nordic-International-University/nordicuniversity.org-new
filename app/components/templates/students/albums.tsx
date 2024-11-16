import React, { useState } from "react";
import { albumsType } from "@/types/templates/albums.types";
import { Button, Image } from "antd";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { changeAlbum } from "@/app/utils/slices/component.function";

const Albums = ({
  props,
  selectedTypeData,
}: {
  props: albumsType[];
  selectedTypeData: any;
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const dispatch: Dispatch = useDispatch();

  return (
    <article className="mt-7">
      <div className="flex items-center gap-3 mb-5">
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

      <div className="overflow-x-auto pb-4">
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fill, 200px)", // Fixed width for each item
            gridTemplateRows: "repeat(2, 300px)", // Fixed 2 rows with 300px height each
            gridAutoFlow: "column", // Forces items to flow horizontally into columns
            width: "max-content", // Ensures the grid expands horizontally to fit content
          }}
        >
          {selectedTypeData &&
            selectedTypeData.map((item: any, index: number) => (
              <div
                key={index}
                className={`${index % 3 === 0 ? "col-span-2 row-span-2" : "col-span-2 row-span-1"} bg-gray-200 p-4`}
              >
                <Image
                  width="100%"
                  height="100%"
                  src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${item.photo.file_path}`}
                  alt={item.id.toString()}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            ))}
        </div>
      </div>
    </article>
  );
};

export default Albums;
