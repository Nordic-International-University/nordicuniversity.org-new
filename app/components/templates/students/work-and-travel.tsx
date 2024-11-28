import { useTranslations } from "next-intl";
import tv from "@/public/images/student-image/tv.png";
import Image from "next/image";

const WorkAndTravel = () => {
  const t = useTranslations("student.Work_and_travel").raw;

  const videoUrl =
    "https://www.youtube.com/embed/zvjfcI73Tw0?autoplay=1&loop=1&playlist=zvjfcI73Tw0";

  return (
    <article className="mt-10">
      <div className="flex max-md:flex-col items-start gap-9 justify-between relative">
        <div>
          <p
            className="text-[#46658B] text-justify font-medium text-[17px]"
            dangerouslySetInnerHTML={{ __html: t("description") }}
          ></p>
          <p className="mt-6 max-md:hidden text-justify block font-semibold italic text-[#46658B] text-[17px]">
            {t("body")}
          </p>
        </div>

        {/* Image container with relative positioning */}
        <div className="relative w-full max-w-[600px] mx-auto">
          {/* TV Image */}
          <Image
            width={600}
            height={600}
            className="max-md:block mx-auto"
            src={tv}
            alt="tv"
          />

          {/* YouTube Video iframe with absolute positioning */}
          <iframe
            src={videoUrl}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="absolute top-[11%] left-[8%] w-[85%] h-[47.5%]" // Adjust the size and position here
            title="YouTube Video"
          ></iframe>
        </div>

        <p className="mt-6 max-sm:mt-0 hidden text-justify max-md:block font-semibold italic text-[#46658B] text-[17px]">
          {t("body")}
        </p>
      </div>
    </article>
  );
};

export default WorkAndTravel;
