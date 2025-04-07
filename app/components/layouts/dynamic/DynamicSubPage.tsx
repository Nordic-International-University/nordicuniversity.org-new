"use client";

import React, { ComponentType, FC, useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";
import getCurrentLangClient from "@/app/helpers/getCurrentLang";
import { Pagination } from "antd";

const PAGE_SIZE = 6;

const DynamicSubPage: FC<{
  transKey: string;
  reduxSelector: string;
  pageSelector: string;
  broadCampTransKey: string;
}> = ({ transKey, reduxSelector, pageSelector, broadCampTransKey }) => {
  const { slug: subPage_slug } = useParams();
  const t = useTranslations(transKey);
  const path = usePathname();

  const [subPageData, setSubPageData] = useState<any>(null);
  const [TemplateComponent, setTemplateComponent] = useState<ComponentType<{
    data: any;
  }> | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

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
    { url: `${path.split("/")[2]}/level`, name: t(broadCampTransKey) },
    {
      url: `${subPage_slug}`,
      name: subPageData?.subPage_title || "Loading...",
    },
  ];

  const totalItems = subPageData?.data?.length || 0;
  const paginatedData = subPageData?.data?.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const onChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // sahifani tepaga qaytarish
  };

  return (
    <LeftSidebarAndComponent
      translationKey={transKey}
      broadCampItems={broadCampItems}
      sidebarItems={subItemDocument}
      sidebarTitle={subPageData?.subPage_title}
    >
      {TemplateComponent && subPageData ? (
        <>
          <TemplateComponent data={paginatedData} />

          {totalItems > PAGE_SIZE && (
            <div className="mt-6 flex justify-center">
              <Pagination
                current={currentPage}
                total={totalItems}
                pageSize={PAGE_SIZE}
                onChange={onChange}
                showSizeChanger={false}
              />
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-muted">Loading content...</p>
      )}
    </LeftSidebarAndComponent>
  );
};

export default DynamicSubPage;
