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
import getCurrentLangClient from "@/app/helpers/getCurrentLang";
import CustomPagination from "@/app/components/UI/custom.pagination";
import { getAllCodesAndManuals } from "@/app/[lang]/students/codes-and-manuals/getAllJournal";
import CodesAndManuals from "@/app/components/templates/students/codes-and-manuals";
import { CodesAndManualsProps } from "@/types/templates/codes-and-manuals.types";

const ClientPage = ({ props }: { props: CodesAndManualsProps[] | any }) => {
  const [data, setData] = useState(props);
  const [currentPage, setCurrentPage] = useState(1);
  const t = useTranslations("student");
  const subItemDocument = useSelector(
    (state: RootState) => state.sideBar.students.studentsSidebarItems,
  );

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllCodesAndManuals({
        page: `${currentPage}`,
        limit: "6",
        lang: getCurrentLangClient(),
      });
      setData(result);
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
      name: t("CodesAndManuals.sectionTitle"),
    },
  ];

  return (
    <LeftSidebarAndComponent
      translationKey="student"
      broadCampItems={brodCmbItems}
      sidebarItems={subItemDocument}
      sidebarTitle={t("CodesAndManuals.sectionTitle")}
    >
      <CodesAndManuals props={data} />
      {/*<CustomPagination*/}
      {/*  currentPage={currentPage}*/}
      {/*  totalPages={totalPages}*/}
      {/*  onPageChange={setCurrentPage}*/}
      {/*/>*/}
    </LeftSidebarAndComponent>
  );
};

export default ClientPage;
