import React from "react";
import {
  SectionType,
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
  console.log(staffData);

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
    <article className={`mt-12 ${montserrat_font.className}`}>
      <div className="container">
        <div className="flex justify-between gap-4">
          <ul className="flex flex-col w-1/4 gap-2">
            {allStructuresByType.map((item, index) => (
              <Link key={index} href={`/university/structure/${item.slug}`}>
                <li className="bg-[#DBF2FF] text-[#364E6B] rounded-md font-normal text-md py-1 pl-2">
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
          <div>
            {staffData && (
              <>
                <div>
                  <h1 className="text-tertiary max-sm:text-center max-sm:text-lg text-2xl font-semibold pb-3">
                    {staffData.name}
                  </h1>
                  <BroadCamp items={[breadcrumbItems]} />
                </div>
                <div className="flex mt-4 items-start justify-between gap-6">
                  <div>
                    <h2 className="text-secondary text-lg leading-6 font-normal">
                      {t("structure.task")}
                    </h2>
                    <p
                      className="ql-editor mt-3 text-[#46658BCC]"
                      dangerouslySetInnerHTML={{ __html: staffData.mission }}
                    ></p>
                  </div>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${staffData.image.file_path}`}
                    width={367}
                    height={200}
                    className="w-auto h-[300px]"
                    alt={staffData.name}
                  />
                </div>
              </>
            )}
            <div className="mt-24">
              <h2 className="text-tertiary max-sm:text-center max-sm:text-lg text-2xl font-semibold pb-4">
                {t("structure.employees")}
              </h2>
              <div className="flex flex-col gap-6">
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