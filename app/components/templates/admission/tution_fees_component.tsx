"use client";

import { useTranslations } from "next-intl";
import { Button, Dropdown, Menu } from "antd";
import { useState, useEffect } from "react";
import { EnumEduDegree } from "@/types/api/apiTypes";
import Image from "next/image";
import { DownOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

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

  useEffect(() => {
    const degreeFromQuery = searchParams.get("degree")?.toUpperCase(); // Katta harfga o‘tkazish
    const typeFromQuery = searchParams.get("type")?.toUpperCase(); // Katta harfga o‘tkazish

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
    const normalizedDegreeKey = degreeKey.toUpperCase(); // Katta harfga aylantirish
    setSelectedDegree(normalizedDegreeKey);
    refetched(false);

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

    console.log("Updating URL to:", newUrl);
    router.replace(newUrl);
  };

  const menu = (
    <Menu onClick={(item: any) => handleDegreeChange(item.key)}>
      {Object.keys(props).map((degreeKey) => (
        <Menu.Item key={degreeKey}>{t(`degrees.${degreeKey}`)}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <article className="mt-16 max-sm:mt-0">
      <div className="flex gap-5 max-sm:flex-col ">
        <div className="flex flex-col mt-[73px] w-full md:w-1/4 gap-3 md:gap-5">
          {Object.keys(EnumEduDegree).map((item, index) => (
            <Button
              key={index}
              className={`${
                item === selectedEduType
                  ? "bg-text_secondary text-white"
                  : "bg-text_tertiary text-text_secondary"
              } w-full md:px-12 px-6 py-2 uppercase border-none rounded-sm font-semibold text-sm md:text-base`}
              type="primary"
              onClick={() => handleEduTypeChange(item)}
            >
              {t(`degreeDirection.${item}`)}{" "}
            </Button>
          ))}
        </div>

        <div className="w-full">
          <div>
            <div className="flex justify-center gap-5 mb-8 max-sm:hidden">
              {Object.keys(props).map((degreeKey) => (
                <Button
                  className={`${
                    selectedDegree === degreeKey
                      ? "bg-text_secondary text-white"
                      : "bg-text_tertiary text-text_secondary"
                  } px-12 uppercase border-none rounded-sm font-semibold`}
                  size="large"
                  key={degreeKey}
                  onClick={() => handleDegreeChange(degreeKey)}
                >
                  {t(`degrees.${degreeKey}`)}
                </Button>
              ))}
            </div>
            <div className="sm:hidden w-full flex mb-5 justify-center">
              <Dropdown
                overlay={menu}
                className="w-full bg-tertiary text-white"
                trigger={["click"]}
              >
                <Button>
                  {selectedDegree
                    ? t(`degrees.${selectedDegree}`)
                    : t("select_degree")}{" "}
                  <DownOutlined />
                </Button>
              </Dropdown>
            </div>
          </div>

          <div className="flex-1 flex flex-wrap md:flex-col gap-4">
            {props[selectedDegree]?.map((program: any, index: number) => (
              <div
                key={index}
                className="flex flex-col md:flex-row p-4 border border-gray-200 rounded mb-4 gap-5 w-full md:w-auto"
              >
                <Image
                  width={300}
                  height={300}
                  className="w-full h-[200px] md:w-[250px] md:h-[250px] object-cover"
                  src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${program.image.file_path}`}
                  alt={program.name}
                />
                <div className="w-full">
                  <h3 className="text-[#364E6B] text-lg md:text-[18px] mb-3 md:mb-5 font-semibold">
                    {program.name}
                  </h3>
                  <p className="text-sm md:text-base pb-2 md:pb-3 text-[#364E6B] font-normal ">
                    <strong>{t("program_info.contract")}:</strong>{" "}
                    <span className="underline ml-2 ">
                      {program.price.toLocaleString()}{" "}
                      {t("program_info.currency")}
                    </span>
                  </p>
                  <p className="text-sm md:text-base pb-2 md:pb-3 text-[#364E6B] font-normal">
                    <strong>{t("program_info.duration")}:</strong>
                    <span className="underline ml-2">
                      {" "}
                      {program.duration} {t("program_info.year")}
                    </span>
                  </p>
                  <p className="text-sm md:text-base pb-2 md:pb-3 text-[#364E6B] font-normal">
                    <strong>{t("program_info.language")}:</strong>
                    <span className="underline ml-2">{program.field_lang}</span>
                  </p>
                  <div className="flex justify-center lg:block">
                    <Button
                      target="_blank"
                      href={`${process.env.NEXT_PUBLIC_URL_BACKEND}${program.curriculum.file_path}`}
                      className="bg-text_secondary text-white px-4 py-2 md:px-5 font-semibold rounded"
                      type="primary"
                    >
                      {t("program_info.program_plan")}
                    </Button>
                  </div>

                  <div className="flex text-[#46658B] mt-6 md:mt-10 items-center gap-3 w-full">
                    <div className="flex-1 h-[1px] bg-[#46658B]"></div>
                    <span className="text-xs md:text-base">
                      {program.field_code}
                    </span>
                    <div className="flex-1 h-[1px] bg-[#46658B]"></div>
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

//sadsad

export default TutionFeesComponent;
