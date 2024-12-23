import React from "react";
import {
  singleStructurePageParams,
  structureBySLug,
} from "@/types/templates/structure.types";
import BroadCamp from "@/app/components/UI/broadCump";
import { getTranslations } from "next-intl/server";
import {
  getAllStructureByType,
  getAllStructuresBySlug,
} from "@/app/[lang]/university/structure/apiCalls";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";
import "react-quill/dist/quill.snow.css";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import StaffUserCardReverse from "@/app/components/UI/staffUserCardReverse";
import Link from "next/link";

const montserrat_font = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "600", "800"],
});

const Page = async ({ params: { slug } }: singleStructurePageParams) => {
  const t = await getTranslations("university");
  const staffData: structureBySLug | any = await getAllStructuresBySlug(
    await getCurrentLangServer(),
    slug,
  );

  const allStructuresByType = await getAllStructureByType(
    await getCurrentLangServer(),
    staffData.type,
  );

  const breadcrumbItems = [
    {
      url: "/university/advantages",
      name: t("document.university"),
    },
    {
      url: "/university/structure",
      name: t("structure.sectionName"),
    },
    {
      url: `/university/structure/${slug}`,
      name: staffData.name,
    },
  ];

  return (
    <article className={`mt-12 max-lg:16 ${montserrat_font.className}`}>
      <div className="container">
        <div className="flex justify-between gap-7">
          <ul className="flex flex-col w-[350px] max-lg:hidden gap-2">
            {allStructuresByType.map((item, index) => (
              <Link key={index} href={`/university/structure/${item.slug}`}>
                <li className="bg-[#DBF2FF] text-[#364E6B] rounded-md font-normal text-md py-1 pl-2">
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
          <div className="w-[80%]">
            {staffData && (
              <>
                <div>
                  <h1 className="text-tertiary max-sm:text-center max-lg:hidden max-sm:text-lg text-2xl font-semibold pb-3">
                    {staffData.name}
                  </h1>
                  <BroadCamp items={[breadcrumbItems]} />
                </div>
                <div className="relative mt-3">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${staffData.image.file_path}`}
                    width={367}
                    height={200}
                    className="float-right ml-6 mb-4 rounded-lg"
                    alt={staffData.name}
                  />
                  <p
                    className="ql-editor inline text-justify"
                    dangerouslySetInnerHTML={{ __html: staffData.mission }}
                  ></p>
                </div>
                {/*<div className="flex mt-4 justify-between max-lg:flex-col-reverse items-start gap-6">*/}
                {/*  <div className="max-lg:w-full justify-between w-[60%]">*/}
                {/*    <h2 className="text-secondary max-sm:hidden block text-lg leading-6 font-semibold">*/}
                {/*      {t("structure.task")}*/}
                {/*    </h2>*/}
                {/*    <p*/}
                {/*      className="ql-editor text-justify text-md tracking-wide mt-3 text-[#46658BCC]"*/}
                {/*      dangerouslySetInnerHTML={{ __html: staffData.mission }}*/}
                {/*    ></p>*/}
                {/*  </div>*/}
                {/*  <div className="relative max-lg:w-full">*/}
                {/*    <Image*/}
                {/*      src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${staffData.image.file_path}`}*/}
                {/*      width={367}*/}
                {/*      height={200}*/}
                {/*      className="w-[400px] rounded-xl h-[250px] max-lg:w-full mt-10 object-cover"*/}
                {/*      alt={staffData.name}*/}
                {/*    />*/}
                {/*    <h2 className="text-secondary max-sm:block hidden absolute -bottom-5 left-[50%] bg-[#DBF2FF] px-24 rounded py-3 translate-x-[-50%] translate-[-50%] text-lg leading-6 font-normal">*/}
                {/*      {t("structure.task")}*/}
                {/*    </h2>*/}
                {/*  </div>*/}
                {/*</div>*/}
              </>
            )}
            <div className="mt-24 max-sm:mt-10">
              <h2 className="text-tertiary max-sm:text-center max-sm:text-lg text-2xl font-semibold pb-4">
                {t("structure.employees")}
              </h2>
              <div className="flex w-full flex-col gap-6">
                {staffData.staffs &&
                  staffData.staffs.map((item: any, index: number) => (
                    <StaffUserCardReverse
                      key={index}
                      staff={item}
                      imagePosition={index % 2 ? "left" : "right"}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Page;
