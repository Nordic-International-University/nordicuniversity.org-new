"use client";

import React, { useEffect, useState } from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";
import Patents from "@/app/components/templates/university/patents";
import { Pagination } from "antd";
import { getPatents } from "./api";
import {
  nordicLife,
  nordicLiveJournalProps,
} from "@/types/templates/nordiklieve.types";

const ClientPage = ({
  props,
}: {
  props: nordicLife<nordicLiveJournalProps>;
}) => {
  const t = useTranslations("research");
  const subItemDocument = useSelector(
    (state: RootState) => state.sideBar.university.researchSidebarItems,
  );

  const brodCmbItems = [
    {
      url: "",
      name: t("title"),
    },
    {
      url: "/research/certificates",
      name: t("subItems.6"),
    },
  ];

  // State
  const [data, setData] = useState(props?.data || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(props?.totalCount || 0);

  const fetchData = async (page: number) => {
    try {
      const response = await getPatents("uz", page, 6);
      setData(response.data);
      setTotalItems(response.totalCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return (
    <LeftSidebarAndComponent
      broadCampItems={brodCmbItems}
      sidebarItems={subItemDocument}
      translationKey="research"
      sidebarTitle={t("subItems.6")}
    >
      <Patents buttonText="PDF" props={data} />

      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          total={totalItems}
          pageSize={6}
          onChange={(page) => setCurrentPage(page)}
          showQuickJumper
        />
      </div>
    </LeftSidebarAndComponent>
  );
};

export default ClientPage;
