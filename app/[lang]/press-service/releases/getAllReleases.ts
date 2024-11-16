import { getAllFaqsParameterTypes } from "@/types/api/apiTypes";

export const getAllReleases = async ({
  lang,
  page,
  limit,
}: getAllFaqsParameterTypes) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/press/releases?language=${lang}&page=${page}&limit=${limit}`,
  );
  return await response.json();
};
