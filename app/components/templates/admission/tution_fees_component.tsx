import { useTranslations } from "next-intl";
import { Button } from "antd";
import { useState } from "react";
import { EnumEduDegree } from "@/types/api/apiTypes";
import Image from "next/image";

const TutionFeesComponent = ({
  props,
  setState,
  refetched,
}: {
  props: any[];
  refetched: any;
  setState: any;
}) => {
  const t = useTranslations("admission.degree_price");

  console.log(props);
  const [selectedDegree, setSelectedDegree] = useState<string>("FULL_TIME");
  const [selectedEduType, setSelectedEduType] = useState<string>("BACHELOR");

  console.log(selectedEduType);

  return (
    <article className="mt-16">
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
              onClick={() => {
                setState(item);
                setSelectedEduType(item);
                if (item === "DOCTORATE") {
                  setSelectedDegree("DOCTORATE");
                  console.log(";asdasdasdsad");
                } else {
                  setSelectedDegree("FULL_TIME");
                }
              }}
            >
              {t(`degreeDirection.${item}`)}
            </Button>
          ))}
        </div>

        <div className="w-full">
          <div className="flex justify-center gap-5 mb-8">
            {Object.keys(props).map((degreeKey) => (
              <Button
                className={`${selectedDegree === degreeKey ? "bg-text_secondary text-white" : "bg-text_tertiary text-text_secondary"} px-12 uppercase border-none rounded-sm font-semibold`}
                size="large"
                key={degreeKey}
                onClick={() => {
                  setSelectedDegree(degreeKey);
                  refetched(false);
                }}
              >
                {t(`degrees.${degreeKey}`)}
              </Button>
            ))}
          </div>
          <div className="flex-1 flex flex-wrap md:flex-col gap-4">
            {(props as any)[selectedDegree]?.map(
              (program: any, index: number) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row p-4 border border-gray-200 rounded mb-4 gap-5 w-full md:w-auto"
                >
                  <Image
                    width={300}
                    height={300}
                    className="w-full h-[200px] md:w-[250px] md:h-[250px] object-cover"
                    src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${program.image.file_path}`}
                    alt=""
                  />
                  <div className="w-full">
                    <h3 className="text-[#364E6B] text-lg md:text-[18px] mb-3 md:mb-5 font-semibold">
                      {program.name}
                    </h3>
                    <p className="text-sm md:text-base pb-2 md:pb-3 text-[#364E6B] font-normal">
                      <strong>Kontrakt:</strong>{" "}
                      <span className="underline">
                        {program.price.toLocaleString()} so'm
                      </span>
                    </p>
                    <p className="text-sm md:text-base pb-2 md:pb-3 text-[#364E6B] font-normal">
                      <strong>Davomiyligi:</strong>
                      <span className="underline"> {program.duration} yil</span>
                    </p>
                    <p className="text-sm md:text-base pb-2 md:pb-3 text-[#364E6B] font-normal">
                      <strong>Ta'lim tili:</strong>
                      <span className="underline">{program.field_lang}</span>
                    </p>
                    <Button
                      className="bg-[#DBF2FF] text-secondary px-4 py-2 md:px-5 font-semibold rounded"
                      type="primary"
                    >
                      O'quv reja
                    </Button>
                    <div className="flex text-[#46658B] mt-6 md:mt-10 items-center gap-3 w-full">
                      <div className="flex-1 h-[1px] bg-[#46658B]"></div>
                      <span className="text-xs md:text-base">
                        {program.field_code}
                      </span>
                      <div className="flex-1 h-[1px] bg-[#46658B]"></div>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default TutionFeesComponent;
