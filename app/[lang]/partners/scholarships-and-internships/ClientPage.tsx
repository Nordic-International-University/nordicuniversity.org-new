"use client";

import React, { useEffect, useState } from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";
import { meetingType, timeFilter } from "@/types/api/apiTypes";
import ScholarshipsAndInternships from "@/app/components/templates/partners/scholarships-and-internships";
import { ArrowLeftIcon, ArrowRightIcon } from "@nextui-org/shared-icons";
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
        type: meetingType.SCHOLARSHIPS_AND_INTERNSHIPS,
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
      name: t("scholarships_and_internships.sectionTitle"),
    },
  ];

  return (
    <LeftSidebarAndComponent
      translationKey="partners"
      broadCampItems={brodCmbItems}
      sidebarItems={subItemDocument}
      sidebarTitle={t("scholarships_and_internships.sectionTitle")}
    >
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
