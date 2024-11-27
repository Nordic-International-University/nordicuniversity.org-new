import { useTranslations } from "next-intl";
import image from "@/public/images/admisssion-images/admission_process.png";
import Image from "next/image";
import { Button } from "antd";
import Link from "next/link";

const AdmissionProcess = () => {
  const t = useTranslations("admission").raw;

  return (
    <article className="mt-12">
      <div className="flex items-start max-md:flex-col-reverse gap-4 justify-between">
        <div>
          <p
            className="text-secondary text-[18px]"
            dangerouslySetInnerHTML={{
              __html: t("admission_process.description"),
            }}
          ></p>
          <p className="text-secondary mt-4 text-[18px]">
            {t("admission_process.body")}
          </p>
          <Link
            href={"https://admission.nordicuniversity.org/"}
            passHref
            target={"_blank"}
          >
            <Button className="bg-text_secondary max-md:mt-6 px-5 rounded text-white mt-14">
              {t("admission_process.button")}
            </Button>
          </Link>
        </div>
        <Image
          className="h-64 w-auto max-md:w-full max-md:h-auto"
          src={image}
          alt="admission_image"
        />
      </div>
    </article>
  );
};

export default AdmissionProcess;
