import { ItemImage } from "@/types/students/students.types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useTranslations } from "next-intl";

const ExaminationProcedures = ({ data }: { data: Array<ItemImage> }) => {
  // Default to the first image or fallback to a placeholder if data is empty
  const initialImagePath =
    data.length > 1 ? data[1].photo.file_path : data[0]?.photo.file_path;
  const [selectedImage, setSelectedImage] = useState<string>(
    initialImagePath || "",
  ); // fallback to empty string if no valid image
  const t = useTranslations("student").raw;
  const mainImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mainImageRef.current) {
      gsap.fromTo(
        mainImageRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
      );
    }
  }, [selectedImage]);

  const handleThumbnailClick = (imagePath: string) => {
    if (!imagePath) return; // Skip if no valid image path
    gsap.to(mainImageRef.current, {
      y: -50,
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      onComplete: () => {
        setSelectedImage(imagePath);

        gsap.fromTo(
          mainImageRef.current,
          { y: 50, opacity: 0, scale: 0.8 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
        );
      },
    });
  };

  return (
    <article className="mt-6">
      <p
        className="text-text_secondary font-medium mb-3 max-w-[676px]"
        dangerouslySetInnerHTML={{
          __html: t("exam.exam_process_organization"),
        }}
      ></p>
      <div className="flex max-md:flex-col gap-5">
        <div className="min-w-[300px] max-md:w-full">
          <div ref={mainImageRef} className="overflow-hidden">
            {selectedImage ? (
              <Image
                className="h-[260px] object-cover w-full"
                width={300}
                height={200}
                src={process.env.NEXT_PUBLIC_URL_BACKEND + selectedImage}
                alt={data[1]?.photo?.file_name || "No image"} // Fallback alt text
              />
            ) : (
              <div className="h-[260px] w-full bg-gray-300 flex justify-center items-center">
                <p>No image available</p>
              </div>
            )}
          </div>
          <div className="w-full mt-4 overflow-auto flex items-center gap-4 scroll-container">
            {data.slice(0, data.length - 1).map((item: ItemImage, index) => (
              <Image
                onClick={() => handleThumbnailClick(item.photo.file_path)}
                key={index}
                width={50}
                height={50}
                src={process.env.NEXT_PUBLIC_URL_BACKEND + item.photo.file_path}
                alt={item.photo.file_name}
                className="cursor-pointer"
              />
            ))}
          </div>
        </div>
        <div>
          <p
            dangerouslySetInnerHTML={{ __html: t("exam.exam_room_equipment") }}
            className="text-text_secondary font-medium"
          ></p>
          <p
            className="pt-3 text-text_secondary font-medium"
            dangerouslySetInnerHTML={{
              __html: t("exam.student_computer_rooms"),
            }}
          ></p>
          <p
            className="pt-3 text-text_secondary font-medium"
            dangerouslySetInnerHTML={{
              __html: t("exam.fair_exam_process"),
            }}
          ></p>
          <p
            className="pt-3 text-text_secondary font-medium"
            dangerouslySetInnerHTML={{
              __html: t("exam.hemis_platform"),
            }}
          ></p>
          <p
            className="pt-3 text-text_secondary font-medium"
            dangerouslySetInnerHTML={{
              __html: t("exam.university_commitment"),
            }}
          ></p>
        </div>
      </div>
      <p
        className="pt-3 text-text_secondary font-medium"
        dangerouslySetInnerHTML={{
          __html: t("exam.future_success_focus"),
        }}
      ></p>
    </article>
  );
};

export default ExaminationProcedures;
