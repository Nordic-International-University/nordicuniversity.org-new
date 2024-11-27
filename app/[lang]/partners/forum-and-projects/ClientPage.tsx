"use client";

import React, { useEffect, useState } from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";
import { meetingType, timeFilter } from "@/types/api/apiTypes";
import ScholarshipsAndInternships from "@/app/components/templates/partners/scholarships-and-internships";
import { Button } from "antd";
import { getAllMeeting } from "@/app/[lang]/partners/connections/getAllMeeting";
import getCurrentLangClient from "@/app/helpers/getCurrentLang";
import CustomPagination from "@/app/components/UI/custom.pagination";

const ClientPage = ({ initialData }: any) => {
  const t = useTranslations("partners");
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialData.totalPages || 1);
  const [time, setTime] = useState(timeFilter.past);

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
          className={`max-md:px-7 max-sm:text-sm max-md:py-5 font-semibold ${
            time === timeFilter.future
              ? "bg-text_secondary text-white"
              : "bg-text_tertiary text-text_secondary"
          } py-5 px-8 rounded text-md`}
          onClick={() => {
            setTime(timeFilter.future);
            setCurrentPage(1);
          }}
        >
          {t("connections.future")}
        </Button>
        <Button
          className={`max-sm:px-7 max-sm:py-5 max-sm:text-sm font-semibold rounded py-5 px-8 text-md ${
            time === timeFilter.past
              ? "bg-text_secondary text-white"
              : "bg-text_tertiary text-text_secondary"
          }`}
          onClick={() => {
            setTime(timeFilter.past);
            setCurrentPage(1);
          }}
        >
          {t("connections.past")}
        </Button>
      </div>
      <ScholarshipsAndInternships
        path="/partners/forum-and-projects/"
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
