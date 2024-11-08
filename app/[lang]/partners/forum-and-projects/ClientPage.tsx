"use client";

import React, { useEffect, useState } from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";
import { meetingType, timeFilter } from "@/types/api/apiTypes";
import ScholarshipsAndInternships from "@/app/components/templates/partners/scholarships-and-internships";
import { ArrowLeftIcon, ArrowRightIcon } from "@nextui-org/shared-icons";
import { Button } from "antd";
import { getAllMeeting } from "@/app/[lang]/partners/connections/getAllMeeting";
import getCurrentLangClient from "@/app/helpers/getCurrentLang";

const ClientPage = ({ initialData }: any) => {
  const t = useTranslations("partners");
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialData.totalPages || 1);
  const [time, setTime] = useState(timeFilter.future);

  const subItemDocument = useSelector(
    (state: RootState) => state.sideBar.partners.educationSidebarItems,
  );

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllMeeting({
        time: time,
        type: meetingType.FORUM_AND_PROJECTS,
        page: currentPage,
        limit: 2,
        lang: getCurrentLangClient(),
      });
      setData(result);
      setTotalPages(result.totalPages);
    };

    fetchData();
  }, [currentPage, time]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const brodCmbItems = [
    {
      url: "",
      name: t("title"),
    },
    {
      url: "/university/documents",
      name: t("forums.sectionTitle"),
    },
  ];

  return (
    <LeftSidebarAndComponent
      translationKey="partners"
      broadCampItems={brodCmbItems}
      sidebarItems={subItemDocument}
      sidebarTitle={t("forums.sectionTitle")}
    >
      <div className="flex items-center gap-4 justify-center mt-10">
        <Button
          className="bg-text_secondary max-md:px-7 max-sm:text-sm max-md:py-5 font-semibold text-white py-6 px-12 rounded text-xl"
          onClick={() => setTime(timeFilter.future)}
        >
          {t("connections.future")}
        </Button>
        <Button
          className="bg-text_tertiary max-sm:px-7 max-sm:py-5 max-sm:text-sm font-semibold text-text_secondary rounded py-6 px-12 text-xl"
          onClick={() => setTime(timeFilter.past)}
        >
          {t("connections.past")}
        </Button>
      </div>
      <ScholarshipsAndInternships props={data} />
      <div className="flex justify-center mt-4 items-center gap-2 text-tertiary">
        <ArrowLeftIcon
          onClick={handlePreviousPage}
          className={`text-2xl ${currentPage === 1 ? "text-gray-400" : ""}`}
        />
        <span className="flex items-center gap-3">
          {Array.from({ length: totalPages }, (_, i) => (
            <div
              key={i}
              onClick={() => handlePageClick(i + 1)}
              className={`py-1 px-3 cursor-pointer rounded ${
                currentPage === i + 1
                  ? "bg-text_secondary text-white"
                  : "bg-text_tertiary text-text_secondary"
              }`}
            >
              {i + 1}
            </div>
          ))}
        </span>
        <ArrowRightIcon
          onClick={handleNextPage}
          className={`text-2xl ${
            currentPage === totalPages ? "text-gray-400" : ""
          }`}
        />
      </div>
    </LeftSidebarAndComponent>
  );
};

export default ClientPage;
