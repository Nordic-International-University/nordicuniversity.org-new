export const getPatents = async (lang: string, page: number, limit: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/university/patents?page=${page}&limit=${limit}&language=${lang}`,
    {
      cache: "no-cache",
    },
  );
  return await response.json();
};
