"use client";

import { ItemImage } from "@/types/students/students.types";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

const ExaminationProcedures = ({ data }: { data: Array<ItemImage> }) => {
  const initialImagePath =
    data.length > 1 ? data[1].photo.file_path : data[0]?.photo.file_path;
  const [selectedImage, setSelectedImage] = useState<string>(
    initialImagePath || "",
  );
  const t = useTranslations("student").raw;

  return (
    <article className="mt-6">
      <div
        className="text-sm leading-relaxed mb-6"
        style={{ color: "rgba(11,64,117,0.7)" }}
        dangerouslySetInnerHTML={{
          __html: t("exam.exam_process_organization"),
        }}
      />

      <div className="flex max-md:flex-col gap-6">
        {/* Image gallery */}
        <div className="w-[320px] max-md:w-full flex-shrink-0">
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid rgba(11,64,117,0.08)" }}
          >
            {selectedImage ? (
              <Image
                className="w-full h-[260px] object-cover transition-opacity duration-300"
                width={320}
                height={260}
                src={process.env.NEXT_PUBLIC_URL_BACKEND + selectedImage}
                alt={data[1]?.photo?.file_name || "Image"}
              />
            ) : (
              <div
                className="h-[260px] w-full flex justify-center items-center"
                style={{ backgroundColor: "rgba(11,64,117,0.03)" }}
              >
                <p
                  className="text-sm"
                  style={{ color: "rgba(11,64,117,0.3)" }}
                >
                  No image available
                </p>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
            {data.slice(0, data.length - 1).map((item: ItemImage, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(item.photo.file_path)}
                className={`flex-shrink-0 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                  selectedImage === item.photo.file_path
                    ? "ring-2 ring-offset-1"
                    : "opacity-60 hover:opacity-100"
                }`}
                style={{
                  // @ts-ignore — Tailwind ring-color via inline
                  "--tw-ring-color": "#0b4075",
                }}
              >
                <Image
                  width={50}
                  height={50}
                  src={
                    process.env.NEXT_PUBLIC_URL_BACKEND + item.photo.file_path
                  }
                  alt={item.photo.file_name}
                  className="w-[50px] h-[50px] object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Text content */}
        <div className="flex-1 space-y-4">
          {[
            "exam.exam_room_equipment",
            "exam.student_computer_rooms",
            "exam.fair_exam_process",
            "exam.hemis_platform",
            "exam.university_commitment",
          ].map((key) => (
            <div
              key={key}
              className="text-sm leading-relaxed"
              style={{ color: "rgba(11,64,117,0.7)" }}
              dangerouslySetInnerHTML={{ __html: t(key) }}
            />
          ))}
        </div>
      </div>

      <div
        className="text-sm leading-relaxed mt-4"
        style={{ color: "rgba(11,64,117,0.7)" }}
        dangerouslySetInnerHTML={{
          __html: t("exam.future_success_focus"),
        }}
      />
    </article>
  );
};

export default ExaminationProcedures;
