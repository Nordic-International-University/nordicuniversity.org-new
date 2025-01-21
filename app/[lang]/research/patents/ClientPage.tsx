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
import { Pagination } from "antd";
import { getPatents } from "@/app/[lang]/research/patents/api";

const ClientPage = ({
  props,
}: {
  props: nordicLife<nordicLiveJournalProps>;
}) => {
  const t = useTranslations("research");
  const button = useTranslations("buttons");

  // State
  const [data, setData] = useState(props?.data || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(props?.totalCount || 0);
  const [loading, setLoading] = useState(false);

  // Fetch Data Function
  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const response = await getPatents("uz", page, 6);
      setData(response.data || []);
      setTotalItems(response.totalCount || 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const subItemDocument = useSelector(
    (state: RootState) => state.sideBar.university.researchSidebarItems,
  );

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

  // Fetch data when the page changes
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return (
    <LeftSidebarAndComponent
      broadCampItems={brodCmbItems}
      sidebarItems={subItemDocument}
      translationKey="research"
      sidebarTitle={t("subItems.5")}
    >
      {/* Render Patents */}
      <Patents buttonText={button("read")} props={data} />

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          total={totalItems}
          pageSize={6}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
          showQuickJumper
        />
      </div>
    </LeftSidebarAndComponent>
  );
};

export default ClientPage;
