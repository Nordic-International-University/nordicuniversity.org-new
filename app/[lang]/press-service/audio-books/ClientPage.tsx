"use client";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";
import AudioBooks from "@/app/components/templates/research/audio.books";

const ClientPage = ({ initialData }: any) => {
  const t = useTranslations("press-service");
  const subItemDocument = useSelector(
    (state: RootState) => state.sideBar.press_service.pressServiceSidebarItems,
  );

  const brodCmbItems = [
    {
      url: "",
      name: t("title"),
    },
    {
      url: "",
      name: t("subItems.5"),
    },
  ];

  return (
    <LeftSidebarAndComponent
      translationKey="press-service"
      broadCampItems={brodCmbItems}
      sidebarItems={subItemDocument}
      sidebarTitle={t("subItems.5")}
    >
      <AudioBooks data={initialData} />
    </LeftSidebarAndComponent>
  );
};

export default ClientPage;
