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
      <div className="flex items-start gap-5">
        <div className="flex flex-col mt-[73px] w-1/4 gap-5">
          {Object.keys(EnumEduDegree).map((item, index) => (
            <Button
              key={index}
              className={`${item === selectedEduType ? "bg-text_secondary text-white" : "bg-text_tertiary text-text_secondary"} px-12 uppercase border-none rounded-sm font-semibold`}
              type="primary"
              onClick={() => {
                setState(item);
                setSelectedEduType(item);

                // Check if "DOCTORATE" is in props when "DOCTORATE" is selected
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
          <div className="w-full">
            {(props as any)[selectedDegree]?.map(
              (program: any, index: number) => (
                <div className="flex items-center p-4 border border-gray-200 rounded mb-4 gap-5">
                  <Image
                    width={300}
                    height={300}
                    src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${program.image.file_path}`}
                    alt=""
                  />
                  <div key={index}>
                    <h3>{program.name}</h3>
                    <p>Kontrakt: {program.price.toLocaleString()} so'm</p>
                    <p>Davomiyligi: {program.duration} yil</p>
                    <p>Ta'lim tili: {program.field_lang}</p>
                    <p>{program.id}</p>
                    <Button type="link">O'quv reja</Button>
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
