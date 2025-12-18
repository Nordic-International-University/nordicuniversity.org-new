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
        const apiUrl = `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/core/subpages/data/${subPage_slug}?language=${getCurrentLangClient()}&page=1&limit=100`;

        console.log('DynamicSubPage fetching from:', apiUrl);

        const response = await fetch(apiUrl);

        // Check content type and response status
        const contentType = response.headers.get("content-type");
        console.log('DynamicSubPage Response status:', response.status);
        console.log('DynamicSubPage Response content-type:', contentType);

        if (!response.ok) {
          console.error(`DynamicSubPage API error - Status: ${response.status}`);
          setSubPageData({ error: true, message: `Server xatosi: ${response.status}` });
          return;
        }

        if (!contentType || !contentType.includes("application/json")) {
          console.error('DynamicSubPage received non-JSON response');
          setSubPageData({ error: true, message: "Server noto'g'ri format qaytardi" });
          return;
        }

        const data = await response.json();
        console.log('DynamicSubPage data received:', data);
        console.log('Data structure check:', {
          hasData: !!data,
          hasDataProperty: !!data?.data,
          dataType: typeof data?.data,
          isArray: Array.isArray(data?.data),
          dataLength: data?.data?.length,
          templateType: data?.template_type
        });

        if (data && data.data) {
          setSubPageData(data);
          import(`@/app/[lang]/(templates)/${data.template_type}`)
            .then((mod) => setTemplateComponent(() => mod.default))
            .catch((err) => {
              console.error("Template load error:", err);
              setSubPageData({ error: true, message: "Template yuklashda xatolik" });
            });
        } else {
          console.error('Data validation failed:', {
            data,
            reason: !data ? 'No data' : !data.data ? 'No data.data' : 'data.data empty or not array'
          });
          setSubPageData({ error: true, message: "Ma'lumot topilmadi" });
        }
      } catch (error) {
        console.error("DynamicSubPage fetch error:", error);
        setSubPageData({ error: true, message: "Ma'lumot yuklashda xatolik yuz berdi" });
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

  const totalItems = Array.isArray(subPageData?.data) ? subPageData.data.length : 0;
  const paginatedData = Array.isArray(subPageData?.data)
    ? subPageData.data.slice(
      (currentPage - 1) * PAGE_SIZE,
      currentPage * PAGE_SIZE,
    )
    : [];

  const onChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  console.log(subPageData, 'sub')

  return (
    <LeftSidebarAndComponent
      translationKey={transKey}
      broadCampItems={broadCampItems}
      sidebarItems={subItemDocument}
      sidebarTitle={subPageData?.subPage_title}
    >
      {subPageData?.error ? (
        <div className="text-center py-8">
          <p className="text-red-500 font-semibold mb-2">Xatolik yuz berdi</p>
          <p className="text-gray-600">{subPageData.message}</p>
          <p className="text-sm text-gray-500 mt-2">Backend server ishlamayotgan bo'lishi mumkin</p>
        </div>
      ) : TemplateComponent && subPageData ? (
        <>
          {/* AboutTemplate uses full data object, others use paginated array */}
          {subPageData.template_type === 'aboutTemplate' ? (
            <TemplateComponent data={subPageData} />
          ) : (
            <TemplateComponent data={paginatedData} />
          )}

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
