"use client";
import LeftSidebarAndComponent from "@/app/layouts/leftSidebarAndComponent";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";
import { nordicLife } from "@/types/templates/nordiklieve.types";
import { albumsType } from "@/types/templates/albums.types";
import Albums from "@/app/components/templates/students/albums";
import { useEffect, useState } from "react";
import { getAllAlbumsByType } from "@/app/[lang]/students/albums/getAllAlbums";
import getCurrentLangClient from "@/app/helpers/getCurrentLang";

const ClientPage = ({ props }: { props: nordicLife<albumsType> }) => {
  const t = useTranslations("student");
  const subItemDocument = useSelector(
    (state: RootState) => state.sideBar.students.studentsSidebarItems,
  );
  const [data, setData] = useState<any>([]);
  const albumType = useSelector(
    (state: RootState) => state.component.album.albumVisible,
  );

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllAlbumsByType({
        lang: getCurrentLangClient(),
        type: albumType || props.data[0].slug,
      });
      setData(result);
    };
    fetchData();
  }, [albumType]);

  const brodCmbItems = [
    {
      url: "",
      name: t("title"),
    },
    {
      url: "/university/documents",
      name: t("albums.sectionTitle"),
    },
  ];

  return (
    <LeftSidebarAndComponent
      translationKey="student"
      broadCampItems={brodCmbItems}
      sidebarItems={subItemDocument}
      sidebarTitle={t("albums.sectionTitle")}
    >
      <Albums props={props.data} selectedTypeData={data} />
    </LeftSidebarAndComponent>
  );
};

export default ClientPage;
