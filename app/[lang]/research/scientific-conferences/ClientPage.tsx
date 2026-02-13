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
import { ScientificEvent } from "@/types/research/scince_events";
import { nordicLife } from "@/types/templates/nordiklieve.types";

const ClientPage = ({
  initialData,
}: {
  initialData: nordicLife<ScientificEvent>;
}) => {
  const t = useTranslations("research");
  const language = useTranslations("partners.connections");
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
        3,
        time,
      );
      if (result.data.length === 0 && time === "future") {
        setTime("past");
        setCurrentPage(1);
      } else {
        setData(result.data);
        setTotalPages(result.totalPages || 1);
      }
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
      {/* Time filter tabs */}
      <div className="flex items-center gap-3 mt-8">
        <button
          className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
            time === "future"
              ? "bg-text_secondary text-white"
              : "bg-gray-100 text-text_secondary hover:bg-gray-200"
          }`}
          onClick={() => {
            setTime("future");
            setCurrentPage(1);
          }}
        >
          {language("future")}
        </button>
        <button
          className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
            time === "past"
              ? "bg-text_secondary text-white"
              : "bg-gray-100 text-text_secondary hover:bg-gray-200"
          }`}
          onClick={() => {
            setTime("past");
            setCurrentPage(1);
          }}
        >
          {language("past")}
        </button>
      </div>

      <Scientific_events
        url="/research/scientific-conferences/"
        props={data}
      />

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