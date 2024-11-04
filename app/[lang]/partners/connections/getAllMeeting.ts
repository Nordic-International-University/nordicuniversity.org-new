import { getAllMeetingType } from "@/types/api/apiTypes";

export const getAllMeeting = async ({
  limit,
  page,
  type,
  time,
  lang,
}: getAllMeetingType) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/cooperation/meeting?type=${type}&language=${lang}&page=${page}&limit=${limit}&timeFilter=${time}`,
    {
      cache: "no-store",
    },
  );
  const json = await response.json();
  return json;
};
