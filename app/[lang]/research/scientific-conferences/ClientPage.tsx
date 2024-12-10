"use client";

import React, { useEffect, useState } from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";
import Scientific_events from "@/app/components/templates/research/scientific-events";
import { getAllEvents } from "@/app/[lang]/research/scientific-events/getAllEvents";
import getCurrentLangClient from "@/app/helpers/getCurrentLang";
import CustomPagination from "@/app/components/UI/custom.pagination";
import { buttonsType } from "@/types/research/scince_events";
import TimeFilterButtons from "@/app/components/UI/changeFeature";
import { timeFilter } from "@/types/api/apiTypes";

const ClientPage = ({ initialData }: any) => {
  const t = useTranslations("research");
  const language = useTranslations("patents.connections");
  const [data, setData] = useState(initialData.data);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialData.totalPages || 1);
  const [time, setTime] = useState("future");

  const subItemDocument = useSelector(
    (state: RootState) => state.sideBar.university.researchSidebarItems,
  );
  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllEvents(
        getCurrentLangClient(),
        "CONFERENCES",
        currentPage,
        100,
        time,
      );
      setData(result.data);
      setTotalPages(result.totalPages || 1);
    };

    fetchData();
  }, [currentPage, time]);

  const brodCmbItems = [
    {
      url: "",
      name: t("title"),
    },
    {
      url: "/research/scientific-conferences",
      name: t("scienceConferences.breadcrumb.scientific_conferences"),
    },
  ];

  return (
    <LeftSidebarAndComponent
      translationKey="research"
      broadCampItems={brodCmbItems}
      sidebarItems={subItemDocument}
      sidebarTitle={t("scienceConferences.breadcrumb.scientific_conferences")}
    >
      <TimeFilterButtons
        time={time}
        timeFilter={timeFilter}
        t={language}
        setTime={setTime}
        setCurrentPage={setCurrentPage}
      />
      <Scientific_events url="/research/scientific-conferences/" props={data} />
      {totalPages > 3 && (
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </LeftSidebarAndComponent>
  );
};

export default ClientPage;
