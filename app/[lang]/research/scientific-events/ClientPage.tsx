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
import { buttonsType, ScientificEvent } from "@/types/research/scince_events";
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
        "EVENTS",
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
      url: "/university/documents",
      name: t("scinceEvent.breadcrumb.scientific_events"),
    },
  ];

  const buttons: buttonsType[] = [
    {
      label: language("future"),
      className: time === "future" ? "bg-[#46658B] text-white" : "bg-[#DBF2FF]",
      onClick: () => {
        setTime("future");
        setCurrentPage(1);
      },
    },
    {
      label: language("past"),
      className: time === "past" ? "bg-[#46658B] text-white" : "bg-[#DBF2FF]",
      onClick: () => {
        setTime("past");
        setCurrentPage(1);
      },
    },
  ];

  return (
    <LeftSidebarAndComponent
      translationKey="research"
      broadCampItems={brodCmbItems}
      sidebarItems={subItemDocument}
      sidebarTitle={t("scinceEvent.breadcrumb.scientific_events")}
    >
      <div className="flex items-center gap-4 justify-center mt-10">
        {buttons.map((button, index) => (
          <button
            key={index}
            className={`${button.className} rounded py-3 max-sm:px-5 px-9 text-md max-sm:text-sm font-semibold`}
            onClick={button.onClick}
          >
            {button.label}
          </button>
        ))}
      </div>
      <Scientific_events url="/research/scientific-events/" props={data} />
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
