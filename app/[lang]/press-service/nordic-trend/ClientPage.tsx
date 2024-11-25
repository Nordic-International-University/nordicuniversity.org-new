"use client";

import React, { useEffect, useState } from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";
import { nordicLife } from "@/types/templates/nordiklieve.types";
import getCurrentLangClient from "@/app/helpers/getCurrentLang";
import CustomPagination from "@/app/components/UI/custom.pagination";
import { getAllReleases } from "@/app/[lang]/press-service/nordic-trend/getAllReleases";
import { pressReleasesType } from "@/types/press-service/press-releases.types";
import Releases from "@/app/components/templates/press-service/releases";
import Trends from "@/app/components/templates/press-service/Trends";

const ClientPage = ({ props }: { props: nordicLife<pressReleasesType> }) => {
  const [data, setData] = useState(props);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(data.totalPages || 1);
  const t = useTranslations("press-service");
  const subItemDocument = useSelector(
    (state: RootState) => state.sideBar.press_service.pressServiceSidebarItems,
  );

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllReleases({
        page: `${currentPage}`,
        limit: "9",
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
      name: t("Press_releases.sectionTitle"),
    },
  ];

  return (
    <LeftSidebarAndComponent
      translationKey="press-service"
      broadCampItems={brodCmbItems}
      sidebarItems={subItemDocument}
      sidebarTitle={t("Press_releases.sectionTitle")}
    >
      <Trends props={props.data} />
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </LeftSidebarAndComponent>
  );
};

export default ClientPage;
