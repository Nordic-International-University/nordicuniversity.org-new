import { useTranslations } from "next-intl";
import tv from "@/public/images/student-image/tv.png";
import Image from "next/image";

const WorkAndTravel = () => {
  const t = useTranslations("student.Work_and_travel").raw;
  return (
    <article className="mt-10">
      <div className="flex max-md:flex-col items-start gap-9 justify-between">
        <div>
          <p
            className="text-[#46658B] font-medium text-[17px]"
            dangerouslySetInnerHTML={{ __html: t("description") }}
          ></p>
          <p className="mt-6 max-md:hidden block font-semibold italic text-[#46658B] text-[17px]">
            {t("body")}
          </p>
        </div>
        <Image
          width={600}
          height={600}
          className="max-md:block mx-auto"
          src={tv}
          alt="tv"
        />
        <p className="mt-6 max-sm:mt-0 hidden max-md:block font-semibold italic text-[#46658B] text-[17px]">
          {t("body")}
        </p>
      </div>
    </article>
  );
};

export default WorkAndTravel;
