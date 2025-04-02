"use client";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";
import AudioBooks from "@/app/components/templates/research/audio.books";

const ClientPage = ({ initialData }: any) => {
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
      url: "/research/scientific-conferences",
      name: t("audio.text"),
    },
  ];

  return (
    <LeftSidebarAndComponent
      translationKey="research"
      broadCampItems={brodCmbItems}
      sidebarItems={subItemDocument}
      sidebarTitle={t("audio.text")}
    >
      <AudioBooks data={initialData} />
    </LeftSidebarAndComponent>
  );
};

export default ClientPage;
