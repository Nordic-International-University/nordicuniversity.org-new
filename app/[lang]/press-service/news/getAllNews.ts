import { getAllFaqsParameterTypes } from "@/types/api/apiTypes";

export const getAllNews = async ({
  lang,
  page,
  limit,
  clientIpAddress = "",
}: getAllFaqsParameterTypes) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/press/news?language=${lang}&page=${page}&limit=${limit}`,
    {
      headers: {
        "x-api-key": clientIpAddress,
      },
    },
  );
  return await response.json();
};
