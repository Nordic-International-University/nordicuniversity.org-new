import { useTranslations } from "next-intl";
import image from "@/public/images/admisssion-images/admission_process.png";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi";

const AdmissionProcess = () => {
  const t = useTranslations("admission").raw;

  return (
    <article className="mt-8">
      <div className="flex items-start max-md:flex-col-reverse gap-8">
        {/* Content */}
        <div className="flex-1">
          <div
            className="text-gray-600 text-base leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: t("admission_process.description"),
            }}
          />
          <p className="text-gray-600 text-base leading-relaxed mt-4">
            {t("admission_process.body")}
          </p>

          <Link
            href="https://qabul.nordicuniversity.org/"
            target="_blank"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-text_secondary text-white
              text-sm font-medium rounded-lg hover:bg-text_secondary/90 transition-colors"
          >
            {t("admission_process.button")}
            <HiOutlineArrowRight className="text-base" />
          </Link>
        </div>

        {/* Image */}
        <div className="w-[280px] max-md:w-full flex-shrink-0">
          <Image
            className="w-full h-auto rounded-xl"
            src={image}
            alt="admission_image"
          />
        </div>
      </div>
    </article>
  );
};

export default AdmissionProcess;
