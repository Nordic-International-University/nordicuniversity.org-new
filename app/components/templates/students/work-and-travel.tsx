"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import tv from "@/public/images/student-image/tv.png";

const WorkAndTravel = () => {
  const t = useTranslations("student.Work_and_travel").raw;

  const videoUrl =
    "https://www.youtube.com/embed/zvjfcI73Tw0?autoplay=1&loop=1&playlist=zvjfcI73Tw0";

  return (
    <article className="mt-8">
      <div className="flex max-md:flex-col items-start gap-8">
        <div className="flex-1">
          <div
            className="text-sm leading-relaxed"
            style={{ color: "rgba(11,64,117,0.7)" }}
            dangerouslySetInnerHTML={{ __html: t("description") }}
          />
          <p
            className="mt-6 max-md:hidden text-sm leading-relaxed font-semibold italic"
            style={{ color: "rgba(11,64,117,0.6)" }}
          >
            {t("body")}
          </p>
        </div>

        {/* TV with embedded video */}
        <div className="relative w-full max-w-[500px] flex-shrink-0 mx-auto">
          <Image
            width={500}
            height={500}
            className="w-full"
            src={tv}
            alt="tv"
          />
          <iframe
            src={videoUrl}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="absolute top-[11%] left-[8%] w-[85%] h-[47.5%]"
            title="YouTube Video"
          />
        </div>

        <p
          className="mt-4 hidden max-md:block text-sm leading-relaxed font-semibold italic"
          style={{ color: "rgba(11,64,117,0.6)" }}
        >
          {t("body")}
        </p>
      </div>
    </article>
  );
};

export default WorkAndTravel;
