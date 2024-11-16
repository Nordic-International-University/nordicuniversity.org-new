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
import CustomPagination from "@/app/components/UI/custom.pagination";

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
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </LeftSidebarAndComponent>
  );
};

export default ClientPage;
