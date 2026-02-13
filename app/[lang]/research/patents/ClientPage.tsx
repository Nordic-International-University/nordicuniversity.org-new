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
import Patents from "@/app/components/templates/university/patents";
import CustomPagination from "@/app/components/UI/custom.pagination";
import { getPatents } from "@/app/[lang]/research/patents/api";
import getCurrentLangClient from "@/app/helpers/getCurrentLang";

const ClientPage = ({
  props,
}: {
  props: nordicLife<nordicLiveJournalProps>;
}) => {
  const t = useTranslations("research");
  const button = useTranslations("buttons");

  const [data, setData] = useState(props?.data || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    Math.ceil((props?.totalCount || 0) / 6),
  );

  const subItemDocument = useSelector(
    (state: RootState) => state.sideBar.university.researchSidebarItems,
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPatents(getCurrentLangClient(), currentPage, 6);
      setData(response.data || []);
      setTotalPages(Math.ceil((response.totalCount || 0) / 6));
    };
    fetchData();
  }, [currentPage]);

  const brodCmbItems = [
    {
      url: "",
      name: t("title"),
    },
    {
      url: "/research/patents",
      name: t("subItems.5"),
    },
  ];

  return (
    <LeftSidebarAndComponent
      broadCampItems={brodCmbItems}
      sidebarItems={subItemDocument}
      translationKey="research"
      sidebarTitle={t("subItems.5")}
    >
      <Patents buttonText={button("read")} props={data} />

      {totalPages > 1 && (
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