"use client";

import React, { useEffect, useState } from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";
import { timeFilter } from "@/types/api/apiTypes";
import AcademicProcessList from "@/app/components/templates/education/academic-process-list";
import getCurrentLangClient from "@/app/helpers/getCurrentLang";
import CustomPagination from "@/app/components/UI/custom.pagination";
import { getAllAcademicProcesses } from "@/app/[lang]/education/academic-process/getAllAcademicProcces";

const ClientPage = ({ initialData }: any) => {
  const t = useTranslations("education");
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialData.totalPages || 1);
  const [time, setTime] = useState(timeFilter.past);

  const subItemDocument = useSelector(
    (state: RootState) => state.sideBar.education.educationSidebarItems,
  );

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllAcademicProcesses(
        getCurrentLangClient(),
        currentPage,
        2,
      );
      setData(result);
      setTotalPages(result.totalPages);
    };

    fetchData();
  }, [currentPage, time]);

  const brodCmbItems = [
    {
      url: "/education/level",
      name: t("educationLevels.breadcrumb"),
    },
    {
      url: "/education/academic-process",
      name: t("subItems.4"),
    },
  ];

  return (
    <LeftSidebarAndComponent
      translationKey="education"
      broadCampItems={brodCmbItems}
      sidebarItems={subItemDocument}
      sidebarTitle={t("subItems.4")}
    >
      <AcademicProcessList
        path="/education/academic-process/"
        props={data}
      />
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </LeftSidebarAndComponent>
  );
};

export default ClientPage;
