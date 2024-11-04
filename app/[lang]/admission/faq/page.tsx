import React from "react";
import ClientPage from "@/app/[lang]/admission/faq/ClientPage";
import { getAllFaqsParameterTypes } from "@/types/api/apiTypes";
import { getCurrentLangServer } from "@/app/helpers/getLangForServer";

const getAllFaqs = async ({ page, limit, lang }: getAllFaqsParameterTypes) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/core/faq/user?language=${lang}&page=${page}&limit=${limit}`,
    {
      cache: "no-store",
    },
  );
  const json = response.json();
  return json;
};

const Page = async () => {
  const faqs = await getAllFaqs({
    limit: "1000",
    page: "1",
    lang: getCurrentLangServer(),
  });

  console.log(faqs);
  return <ClientPage data={faqs} />;
};

export default Page;
