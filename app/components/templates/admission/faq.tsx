"use client";

import React, { useState } from "react";
import faqImage from "@/public/images/admisssion-images/faq.jpg";
// @ts-ignore
import { Faq } from "@/types/admission/faq.types";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { FiPlus, FiMinus } from "react-icons/fi";

const Faq = ({ data }: { data: Faq[] }) => {
  const t = useTranslations("admission.faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <article className="mt-6 max-md:mt-10">
      {/* Header Section */}
      <div className="flex items-start gap-8 max-md:flex-col">
        <div className="flex-1">
          <p className="text-[17px] text-tertiary leading-relaxed max-md:text-sm">
            {t("text")}
          </p>
        </div>
        <Image
          className="w-1/3 h-[200px] rounded-xl object-cover object-bottom max-md:hidden block shadow-md"
          src={faqImage}
          alt="FAQ"
        />
      </div>

      {/* FAQ Accordion */}
      <div className="mt-10 space-y-3">
        {data.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={item.id || index}
              className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                isOpen
                  ? "border-text_secondary/20 bg-blue-50/30 shadow-sm"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              {/* Question */}
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center gap-4 px-6 py-5 text-left transition-colors"
              >
                <span
                  className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    isOpen
                      ? "bg-text_secondary text-white"
                      : "bg-gray-100 text-text_secondary"
                  }`}
                >
                  {index + 1}
                </span>
                <h3
                  className={`flex-1 font-semibold text-[17px] max-md:text-[15px] transition-colors duration-200 ${
                    isOpen ? "text-text_secondary" : "text-gray-800"
                  }`}
                >
                  {item.question}
                </h3>
                <span
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isOpen
                      ? "bg-text_secondary text-white rotate-0"
                      : "bg-gray-100 text-gray-500 rotate-0"
                  }`}
                >
                  {isOpen ? <FiMinus size={16} /> : <FiPlus size={16} />}
                </span>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 pl-[74px] max-md:pl-6">
                  <div className="w-12 h-[2px] bg-text_secondary/20 mb-4 rounded-full" />
                  <p className="text-[16px] text-tertiary leading-relaxed max-md:text-sm">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Help Text */}
      <div className="mt-10 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
        <div className="flex items-center gap-4 max-md:flex-col max-md:text-center">
          <div className="w-12 h-12 rounded-full bg-text_secondary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-text_secondary text-xl font-bold">?</span>
          </div>
          <div>
            <h4 className="text-text_secondary font-semibold text-[16px]">
              {t("still_have_questions") || "Savolingiz bormi?"}
            </h4>
            <p className="text-tertiary text-sm mt-1">
              {t("contact_us") || "Biz bilan bog'laning, sizga yordam beramiz."}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Faq;
