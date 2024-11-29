export interface Video {
  id: string;
  video_id: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface VideoResponse {
  data: Video[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

import { getAllFaqsParameterTypes } from "@/types/api/apiTypes";

export const getALlTrends = async ({
  lang,
  page,
  limit,
}: getAllFaqsParameterTypes): Promise<VideoResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/press/trends?language=${lang}&page=${page}&limit=${limit}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: VideoResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching releases:", error);
    return { data: [], totalCount: 0, totalPages: 0, currentPage: 0 };
  }
};
