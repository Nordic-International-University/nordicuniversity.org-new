import { getAllFaqsParameterTypes } from "@/types/api/apiTypes";

export const getAllCodesAndManuals = async ({
  lang,
  page,
  limit,
}: getAllFaqsParameterTypes) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/students/normative-docs?page=${page}&limit=${limit}`,
  );
  return await response.json();
};
