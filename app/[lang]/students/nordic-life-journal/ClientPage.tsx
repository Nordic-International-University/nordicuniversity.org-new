"use client";

import React, { useEffect, useState } from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";
import {
  nordicLife,
  nordicLiveJournalProps,
} from "@/types/templates/nordiklieve.types";
import NordicLifeJournal from "@/app/components/templates/students/nordic-life-journal";
import getCurrentLangClient from "@/app/helpers/getCurrentLang";
import { getLiveJournals } from "@/app/[lang]/students/nordic-life-journal/getAllJournal";
import CustomPagination from "@/app/components/UI/custom.pagination";

const ClientPage = ({
  props,
}: {
  props: nordicLife<nordicLiveJournalProps>;
}) => {
  const [data, setData] = useState(props);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(data.totalPages || 1);
  const t = useTranslations("student");
  const subItemDocument = useSelector(
    (state: RootState) => state.sideBar.students.studentsSidebarItems,
  );

  useEffect(() => {
    const fetchData = async () => {
      const result = await getLiveJournals({
        page: `${currentPage}`,
        limit: "6",
        lang: getCurrentLangClient(),
      });
      setData(result);
      setTotalPages(result.totalPages);
    };

    fetchData();
  }, [currentPage]);

  const brodCmbItems = [
    {
      url: "",
      name: t("title"),
    },
    {
      url: "/university/documents",
      name: t("nordik_life.sectionTitle"),
    },
  ];

  return (
    <LeftSidebarAndComponent
      translationKey="student"
      broadCampItems={brodCmbItems}
      sidebarItems={subItemDocument}
      sidebarTitle={t("nordik_life.sectionTitle")}
    >
      <NordicLifeJournal props={data.data} />
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </LeftSidebarAndComponent>
  );
};

export default ClientPage;
