"use client";

import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";
import { EnumEduDegree } from "@/types/api/apiTypes";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { HiOutlineDownload, HiChevronDown } from "react-icons/hi";

interface TutionFeesComponentProps {
  props: any;
  setState: any;
  refetched: any;
}

const TutionFeesComponent: React.FC<TutionFeesComponentProps> = ({
  props,
  setState,
  refetched,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const t = useTranslations("admission.degree_price");

  const [selectedDegree, setSelectedDegree] = useState<string>("FULL_TIME");
  const [selectedEduType, setSelectedEduType] = useState<string>("BACHELOR");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const degreeFromQuery = searchParams.get("degree")?.toUpperCase();
    const typeFromQuery = searchParams.get("type")?.toUpperCase();

    if (typeFromQuery && Object.keys(EnumEduDegree).includes(typeFromQuery)) {
      setSelectedEduType(typeFromQuery);
      setState(typeFromQuery);
      if (typeFromQuery === "MASTER" || typeFromQuery === "BACHELOR") {
        setSelectedDegree("FULL_TIME");
      }
      if (typeFromQuery === "DOCTORATE") {
        setSelectedDegree("DOCTORATE");
      } else if (
        degreeFromQuery &&
        Object.keys(props).includes(degreeFromQuery)
      ) {
        setSelectedDegree(degreeFromQuery);
      }
    }
  }, [searchParams, props, setState]);

  const handleDegreeChange = (degreeKey: string) => {
    const normalizedDegreeKey = degreeKey.toUpperCase();
    setSelectedDegree(normalizedDegreeKey);
    refetched(false);
    setDropdownOpen(false);

    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("degree", normalizedDegreeKey);
    const newUrl = `${pathname}?${currentParams.toString()}`;
    router.replace(newUrl);
  };

  const handleEduTypeChange = (eduType: string) => {
    setSelectedEduType(eduType);
    setState(eduType);

    const newDegree = eduType === "DOCTORATE" ? "DOCTORATE" : selectedDegree;
    setSelectedDegree(newDegree);

    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("type", eduType);
    currentParams.set("degree", newDegree);
    const newUrl = `${pathname}?${currentParams.toString()}`;
    router.replace(newUrl);
  };

  return (
    <article className="mt-12 max-sm:mt-0">
      <div className="flex gap-5 max-sm:flex-col">
        {/* Left sidebar — edu type buttons */}
        <div className="flex flex-col mt-[73px] w-full md:w-1/4 gap-3 md:gap-4">
          {Object.keys(EnumEduDegree).map((item, index) => (
            <button
              key={index}
              className={`${
                item === selectedEduType
                  ? "bg-text_secondary text-white"
                  : "bg-gray-100 text-text_secondary hover:bg-gray-200"
              } w-full md:px-12 px-6 py-2.5 uppercase rounded-lg font-semibold text-sm md:text-base transition-colors duration-200`}
              onClick={() => handleEduTypeChange(item)}
            >
              {t(`degreeDirection.${item}`)}
            </button>
          ))}
        </div>

        <div className="w-full">
          {/* Degree buttons — desktop */}
          <div className="flex justify-center gap-4 mb-8 max-sm:hidden">
            {Object.keys(props).map((degreeKey) => (
              <button
                className={`${
                  selectedDegree === degreeKey
                    ? "bg-text_secondary text-white"
                    : "bg-gray-100 text-text_secondary hover:bg-gray-200"
                } px-10 py-2.5 uppercase rounded-lg font-semibold text-base transition-colors duration-200`}
                key={degreeKey}
                onClick={() => handleDegreeChange(degreeKey)}
              >
                {t(`degrees.${degreeKey}`)}
              </button>
            ))}
          </div>

          {/* Degree dropdown — mobile */}
          <div className="sm:hidden w-full mb-5 relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full bg-gray-100 text-text_secondary px-4 py-2.5 rounded-lg font-medium text-sm
                flex items-center justify-between"
            >
              {selectedDegree
                ? t(`degrees.${selectedDegree}`)
                : t("select_degree")}
              <HiChevronDown className={`text-lg transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {dropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                {Object.keys(props).map((degreeKey) => (
                  <button
                    key={degreeKey}
                    onClick={() => handleDegreeChange(degreeKey)}
                    className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors
                      ${selectedDegree === degreeKey
                        ? "bg-text_secondary/10 text-text_secondary"
                        : "text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    {t(`degrees.${degreeKey}`)}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Program cards */}
          <div className="flex-1 flex flex-wrap md:flex-col gap-4">
            {props[selectedDegree]?.map((program: any, index: number) => (
              <div
                key={index}
                className="flex flex-col md:flex-row border border-gray-200 rounded-xl overflow-hidden
                  hover:border-text_secondary/20 hover:shadow-sm transition-all duration-200 w-full md:w-auto"
              >
                <div className="w-full h-[200px] md:w-[250px] md:h-auto relative flex-shrink-0">
                  <Image
                    fill
                    className="object-cover"
                    src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${program.image.file_path}`}
                    alt={program.name}
                  />
                </div>
                <div className="w-full p-5">
                  <h3 className="text-text_secondary text-lg md:text-[18px] mb-4 font-semibold leading-snug">
                    {program.name}
                  </h3>
                  <p className="text-sm md:text-base pb-2.5 text-gray-700">
                    <strong>{t("program_info.contract")}:</strong>
                    <span className="ml-2 text-text_secondary font-semibold">
                      {program.price.toLocaleString()}{" "}
                      {t("program_info.currency")}
                    </span>
                  </p>
                  <p className="text-sm md:text-base pb-2.5 text-gray-700">
                    <strong>{t("program_info.duration")}:</strong>
                    <span className="ml-2">
                      {program.duration} {t("program_info.year")}
                    </span>
                  </p>
                  <p className="text-sm md:text-base pb-2.5 text-gray-700">
                    <strong>{t("program_info.language")}:</strong>
                    <span className="ml-2">{program.field_lang}</span>
                  </p>

                  {program.curriculum?.file_path && (
                    <Link
                      target="_blank"
                      href={`${process.env.NEXT_PUBLIC_URL_BACKEND}${program.curriculum.file_path}`}
                      className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 bg-text_secondary text-white
                        text-sm font-semibold rounded-lg hover:bg-text_secondary/90 transition-colors"
                    >
                      <HiOutlineDownload className="text-base" />
                      {t("program_info.program_plan")}
                    </Link>
                  )}

                  <div className="flex text-gray-400 mt-6 items-center gap-3 w-full">
                    <div className="flex-1 h-[1px] bg-gray-200"></div>
                    <span className="text-xs md:text-sm font-medium">
                      {program.field_code}
                    </span>
                    <div className="flex-1 h-[1px] bg-gray-200"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default TutionFeesComponent;
