import React from "react";
import faqImage from "@/public/images/admisssion-images/faq.jpg";
// @ts-ignore
import { Faq } from "@/types/admission/faq.types";
import Image from "next/image";
import { QuestionOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";

const Faq = ({ data }: { data: Faq[] }) => {
  const t = useTranslations("admission.faq");

  return (
    <article className="mt-6 max-md:mt-12">
      <div className="flex items-start max-md:flex-col justify-between">
        <p
          className="text-[18px] w-full
         text-tertiary font-medium max-md:text-sm "
        >
          {t("text")}
        </p>
        <Image
          className="w-1/3 h-[200px] object-cover object-bottom max-md:hidden block"
          src={faqImage}
          alt="faq"
        />
      </div>
      <div>
        <div className="flex flex-col mt-8 gap-3">
          {data.map((item, index) => (
            <div className="flex items-baseline gap-7">
              <div className="bg-text_secondary max-md:hidden block min-w-16 min-h-16 flex items-center justify-center rounded-full">
                <QuestionOutlined className="text-white text-xl" />
              </div>
              <div>
                <h2 className="text-text_secondary max-md:text-[18px] font-medium text-[22px]">
                  {index + 1}. {item.question}
                </h2>
                <p className="text-[18px] text-tertiary font-medium max-md:text-sm mt-5">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

export default Faq;
