"use client";

import React from "react";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";
import Scientific_events from "@/app/components/templates/research/scientific-events";
import {
  buttonsType,
  researchEventProps,
  ResearchEvents,
} from "@/types/research/scince_events";

const ClientPage = ({ data }: { data: any[] }) => {
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
      url: "/university/documents",
      name: t("scinceEvent.breadcrumb.scientific_events"),
    },
  ];

  const fakeProps: ResearchEvents[] = [
    {
      title:
        "Professor - o’qituvchilar va tadqiqotchilarni onlayn ilmiy seminar - treningga taklif etamiz",
      date: "Dushanba - Juma | 09:00 - 19:00",
      full_name: "Spiker - ODILBEK KATTAYEV",
      description:
        "Xalqaro Nordik Universitetida Bakalavr (kunduzgi, sirtqi va maxsus sirtqi), Magistratura fakulteti, Doktorantura, 6 ta kafedra va 8 ta department mavjud.",
      image_url: "https://picsum.photos/300",
      social_links: [
        {
          url: "http://localhost:8080",
          social_name: "instagram",
          alt: "instagram link",
        },
        {
          url: "http://localhost:8080",
          social_name: "facebook",
          alt: "instagram link",
        },
        {
          url: "http://localhost:8080",
          social_name: "telegram",
          alt: "instagram link",
        },
        {
          url: "http://localhost:8080",
          social_name: "twitter",
          alt: "instagram link",
        },
      ],
    },
    {
      title:
        "Professor - o’qituvchilar va tadqiqotchilarni onlayn ilmiy seminar - treningga taklif etamiz",
      date: "Dushanba - Juma | 09:00 - 19:00",
      full_name: "Spiker - ODILBEK KATTAYEV",
      description:
        "Xalqaro Nordik Universitetida Bakalavr (kunduzgi, sirtqi va maxsus sirtqi), Magistratura fakulteti, Doktorantura, 6 ta kafedra va 8 ta department mavjud.",
      image_url: "https://picsum.photos/300",
      social_links: [
        {
          url: "http://localhost:8080",
          social_name: "instagram",
          alt: "instagram link",
        },
        {
          url: "http://localhost:8080",
          social_name: "facebook",
          alt: "instagram link",
        },
        {
          url: "http://localhost:8080",
          social_name: "telegram",
          alt: "instagram link",
        },
        {
          url: "http://localhost:8080",
          social_name: "twitter",
          alt: "instagram link",
        },
      ],
    },
  ];

  const buttons: buttonsType[] = [
    {
      label: "Kelgusi tadbirlar",
      className: "bg-[#46658B] text-white",
    },
    {
      label: "O’tgan tadbirlar",
      className: "bg-[#DBF2FF]",
    },
  ];

  return (
    <LeftSidebarAndComponent
      translationKey="research"
      broadCampItems={brodCmbItems}
      children={<Scientific_events buttons={buttons} props={fakeProps} />}
      sidebarItems={subItemDocument}
      sidebarTitle={t("scinceEvent.breadcrumb.scientific_events")}
    ></LeftSidebarAndComponent>
  );
};

export default ClientPage;
