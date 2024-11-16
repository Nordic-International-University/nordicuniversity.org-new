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
import { getAllPodcast } from "@/app/[lang]/press-service/podcast/getAllPodcast";
import CustomPagination from "@/app/components/UI/custom.pagination";
import Podcast from "@/app/components/templates/press-service/podcast";

const ClientPage = ({
  props,
}: {
  props: nordicLife<nordicLiveJournalProps>;
}) => {
  const [data, setData] = useState(props);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(data.totalPages || 1);
  const t = useTranslations("press-service");
  const subItemDocument = useSelector(
    (state: RootState) => state.sideBar.press_service.pressServiceSidebarItems,
  );

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllPodcast({
        page: `${currentPage}`,
        limit: "4",
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
      name: t("news.sectionTitle"),
    },
  ];

  return (
    <LeftSidebarAndComponent
      translationKey="press-service"
      broadCampItems={brodCmbItems}
      sidebarItems={subItemDocument}
      sidebarTitle={t("news.sectionTitle")}
    >
      <Podcast props={data.data} />
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </LeftSidebarAndComponent>
  );
};

export default ClientPage;
