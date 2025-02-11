"use client";

import React, { useState, useEffect } from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";
import TutionFeesComponent from "@/app/components/templates/admission/tution_fees_component";
import { EnumEduDegree } from "@/types/api/apiTypes";
import getCurrentLangClient from "@/app/helpers/getCurrentLang";

const getAllDegrees = async ({
  lang,
  direction,
}: {
  lang: string;
  direction: EnumEduDegree;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/education/directions?eduDegree=${direction}&language=${lang}`,
    {
      cache: "no-store",
    },
  );
  return await response.json();
};

const ClientPage = () => {
  const t = useTranslations("education");
  const amission = useTranslations("admission");
  const subItemDocument = useSelector(
    (state: RootState) => state.sideBar.education.educationSidebarItems,
  );

  const [degree, setDegree] = useState(EnumEduDegree.BACHELOR);
  const [data, setData] = useState([]);
  const [reFetched, setReFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const lang = getCurrentLangClient();
      const result = await getAllDegrees({ direction: degree, lang });
      setData(result);
    };
    fetchData();
  }, [degree, reFetched]);

  const brodCmbItems = [
    {
      url: "/education/level",
      name: t("educationLevels.breadcrumb"),
    },
    {
      url: "/education/contract-prices",
      name: amission("degree_price.sectionTitle"),
    },
  ];

  return (
    <LeftSidebarAndComponent
      translationKey="education"
      broadCampItems={brodCmbItems}
      children={
        <TutionFeesComponent
          refetched={setReFetched}
          setState={setDegree}
          props={data}
        />
      }
      sidebarItems={subItemDocument}
      sidebarTitle={amission("degree_price.sectionTitle")}
    ></LeftSidebarAndComponent>
  );
};

export default ClientPage;
