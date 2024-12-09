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
  const [time, setTime] = useState(timeFilter.past);

  const subItemDocument = useSelector(
    (state: RootState) => state.sideBar.partners.educationSidebarItems,
  );

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllMeeting({
        time: time,
        type: meetingType.CONNECTIONS,
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
      url: "/partners/connections",
      name: t("title"),
    },
    {
      url: "/partners/connections",
      name: t("connections.sectionTitle"),
    },
  ];

  return (
    <LeftSidebarAndComponent
      translationKey="partners"
      broadCampItems={brodCmbItems}
      sidebarItems={subItemDocument}
      sidebarTitle={t("connections.sectionTitle")}
    >
      <ScholarshipsAndInternships path="/partners/connections/" props={data} />
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </LeftSidebarAndComponent>
  );
};

export default ClientPage;
