import { getAllFaqsParameterTypes } from "@/types/api/apiTypes";

export const getALlPartnersAlbums = async ({
  lang,
  page,
  limit,
}: getAllFaqsParameterTypes) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/cooperation/photo-types?language=${lang}&page=${page}&limit=${limit}`,
  );
  return await response.json();
};
