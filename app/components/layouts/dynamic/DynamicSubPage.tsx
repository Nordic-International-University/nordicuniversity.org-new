"use client";

import React, { ComponentType, FC, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";
import getCurrentLangClient from "@/app/helpers/getCurrentLang";

const DynamicSubPage: FC<{
  transKey: string;
  reduxSelector: string;
  pageSelector: string;
  broadCampTransKey: string;
}> = ({ transKey, reduxSelector, pageSelector, broadCampTransKey }) => {
  const { slug: subPage_slug } = useParams();
  const t = useTranslations(transKey);
  const [subPageData, setSubPageData] = useState<any>(null);
  const [TemplateComponent, setTemplateComponent] = useState<ComponentType<{
    data: any;
  }> | null>(null);
  const subItemDocument = useSelector(
    (state: RootState) => state.sideBar[pageSelector][`${reduxSelector}`],
  );

  useEffect(() => {
    const fetchSubPageData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/core/subpages/data/${subPage_slug}?language=${getCurrentLangClient()}&page=1&limit=100`,
        );
        const data = await response.json();
        if (data && data.data.length > 0) {
          setSubPageData(data);
          import(`@/app/[lang]/(templates)/${data.template_type}`)
            .then((mod) => setTemplateComponent(() => mod.default))
            .catch((err) => console.error("Template load error:", err));
        }
      } catch (error) {
        console.error("Failed to fetch subpage data:", error);
      }
    };

    if (subPage_slug) {
      fetchSubPageData();
    }
  }, [subPage_slug]);

  const broadCampItems = [
    { url: "", name: t(broadCampTransKey) },
    {
      url: `/subpages/${subPage_slug}`,
      name: subPageData?.subPage_title || "Loading...",
    },
  ];

  console.log(subPageData);
  // @ts-ignore
  return (
    <LeftSidebarAndComponent
      translationKey={transKey}
      broadCampItems={broadCampItems}
      sidebarItems={subItemDocument}
      sidebarTitle={subPageData?.subPage_title}
    >
      {TemplateComponent ? (
        <div>{<TemplateComponent data={subPageData.data} />}</div>
      ) : (
        +(<p>Loading content...</p>)
      )}
    </LeftSidebarAndComponent>
  );
};

export default DynamicSubPage;
