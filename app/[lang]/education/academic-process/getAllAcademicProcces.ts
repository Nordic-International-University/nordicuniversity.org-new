import { Event } from "@/types/templates/international-meeating";

const getAllAcademicProcesses = async (
  lang: string,
  page: number,
  limit: number,
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/education/academic-process?language=${lang}&page=${page}&limit=${limit}`,
    );
    return response.json();
  } catch (err) {
    console.error(err);
  }
};

const getAcademicProcessBySLug = async (
  lang: string,
  slug: string,
  clientIpAddress = "",
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/education/academic-process/${slug}?language=${lang}`,
      {
        headers: {
          "x-api-key": clientIpAddress,
        },
      },
    );
    return response.json();
  } catch (err) {
    console.error(err);
  }
};

export { getAllAcademicProcesses, getAcademicProcessBySLug };
