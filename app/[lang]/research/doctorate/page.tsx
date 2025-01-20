import React from "react";
import ClientPage from "@/app/[lang]/research/doctorate/ClientPage";
import {
  getAllDoctorate,
  getAllDoctorateCount,
} from "@/app/[lang]/research/doctorate/doctorate.api";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";

const Page = async () => {
  const lang = await getCurrentLangServer();
  const allDoctorateField = await getAllDoctorate(lang);
  const allDoctorateCount = await getAllDoctorateCount(lang);

  return (
    <ClientPage
      allDoctorateCount={allDoctorateCount}
      allDDoctorateField={allDoctorateField}
    />
  );
};

export default Page;
