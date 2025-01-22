"use client";

import React, { useEffect, useState } from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";
import {
  ISymposiumResponse,
  ISymposiumTypeForUser,
} from "@/types/research/scince_events";
import getCurrentLangClient from "@/app/helpers/getCurrentLang";
import {
  getAllCouncilBySLug,
  getAllCouncilType,
} from "@/app/[lang]/research/scientific-council/doctorate.api";
import ScientificCouncil from "@/app/components/templates/research/scientific-council";

const ClientPage = () => {
  const [symposiumType, setSymposiumType] = useState<ISymposiumTypeForUser[]>(
    [],
  );
  const [slug, setSlug] = useState<string>("");
  const [symposiumData, setSymposiumData] = useState<ISymposiumResponse | null>(
    null,
  );
  const t = useTranslations("research");
  const lang = getCurrentLangClient();
  const subItemDocument = useSelector(
    (state: RootState) => state.sideBar.university.researchSidebarItems,
  );

  const brodCmbItems = [
    {
      url: "",
      name: t("title"),
    },
    {
      url: "/university/documents",
      name: t("subItems.7"),
    },
  ];

  // Fetch symposium types
  const getSymposiumType = async () => {
    try {
      const type: ISymposiumTypeForUser[] = await getAllCouncilType(lang);
      setSymposiumType(type);
      if (type.length > 0) {
        setSlug(type[0].slug); // Set first type's slug as default
      }
    } catch (error) {
      console.error("Failed to fetch symposium types:", error);
    }
  };

  // Fetch symposium data by slug
  const getSymposiumData = async () => {
    if (!slug) return;
    try {
      const data: ISymposiumResponse = await getAllCouncilBySLug(lang, slug);
      setSymposiumData(data);
    } catch (error) {
      console.error("Failed to fetch symposium data:", error);
    }
  };

  useEffect(() => {
    getSymposiumType();
  }, []);

  useEffect(() => {
    getSymposiumData();
  }, [slug]);

  return (
    <LeftSidebarAndComponent
      translationKey="research"
      broadCampItems={brodCmbItems}
      sidebarItems={subItemDocument}
      sidebarTitle={t("subItems.7")}
    >
      <ScientificCouncil
        setSlug={setSlug}
        slug={slug}
        buttons={symposiumType}
        data={symposiumData?.symposiums || []}
      />
    </LeftSidebarAndComponent>
  );
};

export default ClientPage;
